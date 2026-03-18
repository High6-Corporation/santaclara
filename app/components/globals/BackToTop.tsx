"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[40px] right-[40px] z-50 w-[50px] h-[50px] bg-[#04217B] text-white shadow-lg border-1 border-white flex items-center justify-center hover:bg-[#E31C26] hover:border-white transition-all duration-300 ease-out cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[20px] pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
