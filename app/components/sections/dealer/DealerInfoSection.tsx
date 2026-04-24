"use client";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { getDealers, getDealerRegions, type Dealer as WPDealer, extractCoordinatesFromMapsUrl } from '@/lib/graphqlService';

// Google Maps type declarations
declare global {
  interface Window {
    google?: typeof google;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GoogleMap = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GoogleMarker = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GoogleInfoWindow = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GoogleGeocoder = any;

interface Dealer {
  name: string;
  address: string;
  phone: string;
  email?: string;
  coordinates?: { lat: number; lng: number }; // From Google Maps URL
}

interface DealerRegion {
  region: string;
  dealers: Dealer[];
}

export function DealerInfoSection() {
  const GOOGLE_MAPS_API_KEY = "AIzaSyAjbHyFs7o64UZtx5xVhryDsHxPHONhNC4";
  const [activeTab, setActiveTab] = useState('NCR');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [dealerData, setDealerData] = useState<DealerRegion[]>([]);
  const [regions, setRegions] = useState<string[]>(['NCR', 'Luzon', 'Visayas', 'Mindanao']);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<GoogleMap>(null);
  const markerRef = useRef<GoogleMarker>(null);
  const infoWindowRef = useRef<GoogleInfoWindow>(null);
  const geocoderRef = useRef<GoogleGeocoder>(null);
  
  // Fetch dealers and regions from WordPress
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [dealers, dealerRegions] = await Promise.all([
          getDealers(),
          getDealerRegions()
        ]);
        
        // Transform WordPress data to our format
        const transformedData: DealerRegion[] = [];
        
        // Group dealers by region
        dealers.forEach((dealer: WPDealer) => {
          dealer.dealerRegions.nodes.forEach((region: any) => {
            const regionName = (region.taxonomyName || region.name || '').toUpperCase();
            if (!regionName) return; // Skip if no region name
            let regionData = transformedData.find(r => r.region === regionName);
            
            if (!regionData) {
              regionData = { region: regionName, dealers: [] };
              transformedData.push(regionData);
            }
            
            // Format phone numbers
            const phoneNumbers = dealer.details.contactNumbers
              .map(cn => cn.mobileNumber)
              .filter(num => num)
              .join(' / ');
            
            // Extract coordinates from Google Maps URL in content
            const coordinates = extractCoordinatesFromMapsUrl(dealer.content);
            
            regionData.dealers.push({
              name: dealer.title,
              address: dealer.details.address || '',
              phone: phoneNumbers,
              email: dealer.details.emailAddress || undefined,
              coordinates: coordinates || undefined
            });
          });
        });
        
        setDealerData(transformedData);
        
        // Update regions list from WordPress
        if (dealerRegions.length > 0) {
          setRegions(dealerRegions);
          setActiveTab(dealerRegions[0]);
        }
      } catch (error) {
        console.error('Error fetching dealer data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Initialize Google Maps
  useEffect(() => {
    // Inject CSS to hide InfoWindow close button globally
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        .gm-style-iw button[aria-label="Close"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Load Google Maps script
    const loadGoogleMaps = () => {
      // Check if already loaded
      if ((window as unknown as { google?: GoogleMap }).google) {
        console.log('Google Maps already loaded, initializing...');
        setTimeout(() => initMap(), 100);
        return;
      }
      
      // Check if script is already being loaded (but not finished yet)
      const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (existingScript) {
        console.log('Google Maps script is loading, waiting...');
        existingScript.addEventListener('load', () => {
          setTimeout(() => initMap(), 100);
        });
        return;
      }
      
      // Load the script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geocoding`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps script loaded');
        initMap();
      };
      document.head.appendChild(script);
    };
    
    loadGoogleMaps();
    
    function initMap() {
      console.log('initMap called, mapRef exists:', !!mapRef.current, 'google exists:', !!(window as unknown as { google?: GoogleMap }).google);
      
      if (!mapRef.current) {
        console.log('mapRef not ready, retrying in 100ms...');
        setTimeout(initMap, 100);
        return;
      }
      
      if ((window as unknown as { google?: GoogleMap }).google) {
        const google = (window as unknown as { google: GoogleMap }).google;
        
        console.log('Creating map instance...');
        const map = new google.maps.Map(mapRef.current, {
          zoom: 17,
          center: { lat: 14.5995, lng: 120.9842 },
          mapTypeId: 'hybrid',
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
        });
        
        googleMapRef.current = map;
        geocoderRef.current = new google.maps.Geocoder();
        infoWindowRef.current = new google.maps.InfoWindow();
        setMapLoaded(true);
        
        console.log('Map initialized, mapLoaded set to true');
        
        // Pin the first dealer if already selected
        if (selectedDealer) {
          console.log('Pinning first dealer:', selectedDealer.name);
          pinDealerOnMap(selectedDealer);
        }
      }
    }
  }, []);
  
  // Function to pin dealer on map
  const pinDealerOnMap = (dealer: Dealer) => {
    console.log('pinDealerOnMap called for:', dealer.name);
    
    if (!googleMapRef.current || !infoWindowRef.current || !(window as any).google) {
      console.log('Map not ready:', {
        googleMapRef: !!googleMapRef.current,
        infoWindowRef: !!infoWindowRef.current,
        google: !!(window as any).google
      });
      return;
    }
    
    const google = (window as any).google;
    const map = googleMapRef.current;
    const infoWindow = infoWindowRef.current;
    const geocoder = geocoderRef.current;
    
    geocoder.geocode({ address: dealer.name }, (results: any, status: any) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        
        const marker = new google.maps.Marker({
          map: map,
          position: location,
          title: dealer.name,
          animation: google.maps.Animation.DROP,
        });
        
        markerRef.current = marker;
        map.setCenter(location);
        
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        
        const contentString = `
          <div style="font-family: Roboto, Arial, sans-serif; padding: 0; margin: 0; max-width: 300px;">
            <div style="font-size: 16px; font-weight: 500; color: #202124; padding: 12px 16px 4px 16px; margin: 0;">
              ${dealer.name}
            </div>
            <div style="font-size: 14px; color: #70757a; padding: 0 16px 12px 16px; margin: 0; line-height: 1.4;">
              ${dealer.address}
            </div>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.name + ', ' + dealer.address)}" 
              target="_blank" 
              rel="noopener noreferrer"
              style="display: block; font-size: 14px; color: #1a73e8; text-decoration: none; padding: 0 16px 12px 16px; font-weight: 500; border: none !important; outline: none !important; box-shadow: none !important;"
              onmouseover="this.style.textDecoration='underline'" 
              onmouseout="this.style.textDecoration='none'"
            >
              View on Google Maps
            </a>
          </div>
        `;
        
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      }
    });
  };
  
  // Update map when dealer is selected
  useEffect(() => {
    if (selectedDealer && mapLoaded) {
      pinDealerOnMap(selectedDealer);
    }
  }, [selectedDealer, mapLoaded]);
  
  useEffect(() => {
    // Set the first dealer as selected when the active tab or search term changes
    if (isLoading) return; // Don't set dealer while loading
    
    const activeRegionData = dealerData.find(region => region.region === activeTab);
    const filteredDealers = activeRegionData?.dealers.filter(dealer => 
      dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      dealer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.phone.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    
    if (filteredDealers.length > 0) {
      // Always select the first dealer when tab/search changes
      setSelectedDealer(filteredDealers[0]);
    } else {
      setSelectedDealer(null);
    }
  }, [activeTab, searchTerm, dealerData, isLoading]);
  
  // Filter dealers based on search term within the active region
  const activeRegionData = dealerData.find(region => region.region === activeTab);
  const filteredDealers = activeRegionData?.dealers.filter(dealer => 
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dealer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <Section bgColor="bg-[#F5F6FA] lg:py-[100px] md:py-[40px] py-[30px]">
      <Row>
        <div className="text-center mb-[30px]">
                <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal tracking-[-2.4px] leading-[40px] lg:leading-[72.6px] text-[#333333] lg:mb-[30px] mb-[20px]">
                  Find a Trusted SMWPI Dealer
                </h2>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
                  Access premium marine plywood from authorized dealers nationwide. Built on decades of craftsmanship and innovation, our products deliver reliability you can depend on.
                </p>
            </div>
      </Row>
      <Row className="!max-w-[1280px]">
        {/* Tabs and Search */}
        <div className="flex flex-col min-[1240px]:flex-row">
          {/* LEFT — Tabs */}
          <div className="order-2 min-[1240px]:order-1 hidden md:flex flex-wrap flex-1 max-[1240px]:mt-6">
            {regions.map((region, index) => (
              <button
                key={region}
                onClick={() => setActiveTab(region)}
                className={`
                  font-body text-white text-[16px] lg:text-[20px] md:text-[18px] md:leading-[20px] font-bold lg:leading-[24px] tracking-[-0.15px]
                  py-[17px]
                  px-[40px] max-[980px]:px-[25px] cursor-pointer
                  whitespace-nowrap
                  transition-colors
                  ${index !== regions.length - 1 ? '' : ''}
                  ${activeTab === region ? 'bg-[#0839D0]' : 'bg-[#04217B] hover:bg-[#0839D0]'}
                  ${region === 'NCR' ? '' : ''}
                  ${region === 'Mindanao' ? '' : ''}
                `}
              >
                {region.toUpperCase()}
              </button>
            ))}
          </div>

          {/* RIGHT — Search */}
          <div className="order-1 min-[1240px]:order-2 shrink-0 w-full min-[1240px]:w-auto">
            <div className="flex w-full min-[1240px]:w-auto justify-end  gap-[10px]">
              <input
                type="text"
                placeholder="SEARCH DEALERS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full min-[580px]:w-[261px]
                  h-[45px]
                  px-4
                  border-t border-b border-l border-black/10
                  bg-white
                  font-body text-[14px]
                  focus:outline-none focus:ring-2 focus:ring-[#0839D0]
                "
              />
              <button
                className="
                  h-[45px]
                  px-4
                  bg-[#D7232C]
                  text-white
                  tracking-[-0.15px]
                  leading-[24px]
                  rounded-[100px]
                  font-body text-[14px] font-medium
                  flex items-center justify-center
                  hover:bg-[#A91F1A]
                  cursor-pointer
                  transition-colors
                "
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        <div className="md:hidden mt-4 mb-[32px]">
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-3 pr-10 border-2  rounded-lg bg-white text-[#333] font-body text-[14px] font-medium appearance-none cursor-pointer"
            >
              {regions.map((region) => (
                <option key={region} value={region} className="py-2">
                  {region.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-[#000]" />
            </div>
          </div>
        </div>

        {/* Dealer List and Map */}
        <div className="flex flex-col lg:flex-row gap-0 w-full">
          {/* Left side - Dealer listings */}
          <div className="lg:w-[433px]">
            {isLoading ? (
              <div className="max-h-[702px] bg-[#04217B] flex items-center justify-center">
                <div className="text-white font-body text-[18px]">Loading dealers...</div>
              </div>
            ) : (
            <div className="max-h-[702px] overflow-y-auto border-gray-200 overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#04217B] [&::-webkit-scrollbar-thumb]:bg-gray-400/50 [&::-webkit-scrollbar-thumb:hover]:bg-gray-400/80">
              {filteredDealers.length > 0 ? (
                filteredDealers.map((dealer, index) => (
                <div 
                  key={`${dealer.name}-${index}`} 
                  className={`p-[30px] cursor-pointer transition-colors
                    ${index > 0 ? 'border-t border-black' : ''}
                    ${selectedDealer && selectedDealer.name === dealer.name 
                      ? 'bg-[#0839D0]' 
                      : 'bg-[#04217B] hover:bg-[#0839D0] cursor-pointer'
                    }`}
                  onClick={() => setSelectedDealer(dealer)}
                >
                    {/* Dealer name */}
                    <h3 className="text-white font-body text-[16px] leading-[20px] md:text-[18px] lg:text-[20px] lg:leading-[24px] font-bold tracking-[-0.2px] mb-[10px]">
                      {dealer.name}
                    </h3>

                    <div className="mt-2 space-y-2">
                      {/* Location */}
                      <div className="flex items-center gap-2 mb-[10px] text-white font-body text-[14px] md:text-[16px] font-normal leading-[19px] tracking-[-0.15px]">
                        <img
                          src="/images/location-icon-white.svg"
                          alt="Location"
                          className="w-6 h-6 flex-shrink-0"
                        />
                        <span>{dealer.address}</span>
                      </div>

                      {/* Contact */}
                      {dealer.phone && (
                        <div className="flex items-center gap-2">
                          <img
                            src="/images/telephone-icon-white.svg"
                            alt="Contact"
                            className="w-6 h-6 flex-shrink-0"
                          />

                          {dealer.phone.includes(' to ') ? (
                            <a 
                              href={`tel:${dealer.phone.split(' to ')[0].trim().replace(/\s+/g, '').replace(/[()]/g, '')}`}
                              className="text-white font-body text-[14px] md:text-[16px] font-normal leading-[19px] tracking-[-0.15px] hover:underline"
                              onClick={(e) => { e.stopPropagation(); setSelectedDealer(dealer); }}
                            >
                              {dealer.phone}
                            </a>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {dealer.phone.split('/').map((number, idx) => (
                                <span key={idx} className="flex items-center">
                                  <a 
                                    href={`tel:${number.trim().replace(/\s+/g, '').replace(/[()]/g, '')}`}
                                    className="text-white font-body text-[14px] md:text-[16px] font-normal leading-[19px] tracking-[-0.15px] hover:underline"
                                    onClick={(e) => { e.stopPropagation(); setSelectedDealer(dealer); }}
                                  >
                                    {number.trim()}
                                  </a>
                                  {idx < dealer.phone.split('/').length - 1 && (
                                    <span className="text-white mx-1">/</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Email */}
                      {dealer.email && (
                        <div className="flex items-center gap-2">
                          <img
                            src="/images/email-icon-white.svg"
                            alt="Email"
                            className="w-6 h-6 flex-shrink-0"
                          />
                          <a 
                            href={`mailto:${dealer.email}`}
                            className="text-white font-body text-[14px] md:text-[16px] font-normal leading-[19px] tracking-[-0.15px] hover:underline"
                            onClick={(e) => { e.stopPropagation(); setSelectedDealer(dealer); }}
                          >
                            {dealer.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full p-8">
                  <p className="text-center text-gray-500">
                    No dealers found matching your search in {activeTab}
                  </p>
                </div>
              )}
            </div>
            )}
          </div>

          {/* Right side - Google Maps */}
            <div className="h-[500px] md:h-[600px] lg:h-[702px] lg:max-w-[847px] w-full bg-gray-100 border border-gray-300 relative overflow-hidden">
              {selectedDealer ? (
                <div 
                  ref={mapRef} 
                  className="w-full h-full"
                  style={{ minHeight: '500px' }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 text-gray-500">
                  <div className="text-center">
                    <div className="flex items-center justify-center bg-white border-2 border-gray-300 w-16 h-16 mx-auto mb-4">
                      <img
                        src="/images/location-icon.svg"
                        alt="Location"
                        className="w-8 h-8"
                      />
                    </div>
                    <p className="text-sm">Select a dealer to view location</p>
                  </div>
                </div>
              )}
            </div>
        </div>
      </Row>
    </Section>
  );
}
