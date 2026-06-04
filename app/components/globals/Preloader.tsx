'use client';

import { useState, useEffect } from 'react';

interface PreloaderSettings {
  enabled: number;
  type: 'spinner' | 'progress';
  background_color: string;
  logo_url: string;
  exit_animation: string;
}

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://santaclaraplywood.beta02.site';
const CACHE_KEY = 'santaclara-preloader-settings';

export function Preloader({ children }: { children: React.ReactNode }) {
  // IMPORTANT: Initial state must be deterministic on both server and client to
  // avoid hydration mismatch. We hydrate the cached settings from localStorage
  // in a useEffect below — this runs only on the client, after hydration.
  const [settings, setSettings] = useState<PreloaderSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Read cached settings from localStorage on mount (post-hydration) so
  // returning visitors see the configured preloader almost immediately.
  useEffect(() => {
    try {
      const cached = window.localStorage.getItem(CACHE_KEY);
      if (cached) {
        setSettings(JSON.parse(cached) as PreloaderSettings);
      }
    } catch {
      // Ignore parse / access errors
    }
  }, []);

  useEffect(() => {
    // Fetch preloader settings from WordPress
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/headless-wp-preloader/v1/preloader-settings`, {
          cache: 'no-store' // Always fetch fresh during testing
        });
        const data = await response.json();
        setSettings(data);
        try {
          window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch {
          // Ignore quota errors
        }
      } catch (error) {
        console.error('[Preloader] Failed to fetch preloader settings:', error);
        // Default settings if API fails
        setSettings({
          enabled: 1,
          type: 'spinner',
          background_color: '#ffffff',
          logo_url: '',
          exit_animation: 'fade-out'
        });
      }
    };

    fetchSettings();
  }, []);

  // Preload the logo image as soon as the URL is known so it's already cached
  // by the time the configured spinner renders.
  useEffect(() => {
    if (settings?.logo_url) {
      const img = new Image();
      img.src = settings.logo_url;
    }
  }, [settings?.logo_url]);

  // Track when the page is fully loaded (window.load event)
  useEffect(() => {
    const handleLoad = () => setPageLoaded(true);

    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Drive the progress bar:
  //  - While the page is still loading: creep up slowly, but cap at 90% so the
  //    bar never "completes" before the page is actually ready.
  //  - Once the page is loaded: rapidly accelerate the bar to 100%.
  useEffect(() => {
    if (settings?.type !== 'progress') return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (pageLoaded) {
          // Accelerate to 100% once the page is ready
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(100, prev + Math.max(5, (100 - prev) * 0.25));
        }
        // Creep up but never exceed 90% until page actually loads
        if (prev >= 90) return 90;
        return Math.min(90, prev + Math.random() * 8);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [settings?.type, pageLoaded]);

  // Trigger exit animation when ready:
  //  - For 'progress' type: wait until pageLoaded AND progress === 100
  //  - For 'spinner' type:  wait until pageLoaded only
  useEffect(() => {
    if (!settings) return;

    if (!settings.enabled) {
      setIsLoading(false);
      return;
    }

    if (!pageLoaded) return;

    const isProgressType = settings.type === 'progress';
    const progressReady = !isProgressType || progress >= 100;
    if (!progressReady) return;

    // Hold the final state briefly (so users see the 100% bar) then exit
    const holdMs = isProgressType ? 300 : 500;
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
      const completeTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(completeTimeout);
    }, holdMs);

    return () => clearTimeout(exitTimeout);
  }, [settings, pageLoaded, progress]);

  // If preloader is disabled or loading is complete, render children
  if (!isLoading) {
    return <>{children}</>;
  }

  // If settings haven't loaded yet (true first visit only), show a clean
  // background overlay with NO spinner — avoids the visual "double spinner"
  // jump where the fallback briefly shows before the configured one.
  if (!settings) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white" />
    );
  }

  // If preloader is disabled, render children
  if (!settings.enabled) {
    return <>{children}</>;
  }

  const exitAnimationClass = getExitAnimationClass(settings.exit_animation, isExiting);

  return (
    <>
      {/* Preloader Overlay */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-1000 ${exitAnimationClass}`}
        style={{ backgroundColor: settings.background_color }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          {/* Logo (if available) */}
          {settings.logo_url && (
            <div className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={settings.logo_url}
                alt="Loading..."
                className="max-w-[200px] h-auto"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
              />
            </div>
          )}

          {/* Spinner or Progress Bar */}
          {settings.type === 'spinner' ? (
            <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-[#CF2923] rounded-full" />
          ) : (
            <div className="w-64 max-w-[80vw]">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#CF2923] transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-center mt-3 text-sm text-gray-600">
                {Math.round(Math.min(progress, 100))}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Page Content rendered underneath the preloader. The preloader's opaque
          background covers it while loading; once the exit animation begins,
          the page is revealed naturally as the overlay fades / slides away. */}
      <div>{children}</div>
    </>
  );
}

/**
 * Get exit animation CSS class
 */
function getExitAnimationClass(animation: string, isExiting: boolean): string {
  if (!isExiting) return 'opacity-100';

  switch (animation) {
    case 'fade-out':
      return 'opacity-0';
    
    case 'slide-up':
      return 'translate-y-[-100%]';
    
    case 'slide-down':
      return 'translate-y-[100%]';
    
    case 'scale-down':
      return 'scale-0 opacity-0';
    
    case 'curtain-horizontal':
      return 'curtain-horizontal-exit';
    
    case 'curtain-vertical':
      return 'curtain-vertical-exit';
    
    case 'diagonal-wipe':
      return 'diagonal-wipe-exit';
    
    case 'circle-reveal':
      return 'circle-reveal-exit';
    
    case 'dissolve':
      return 'dissolve-exit';
    
    default:
      return 'opacity-0';
  }
}
