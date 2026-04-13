"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const productCategories = [
  { name: "Santa Clara Marine Plywood", slug: "santa-clara-marine-plywood" },
  { name: "Santa Clara Ordinary Plywood", slug: "santa-clara-ordinary-plywood" },
  { name: "Santa Clara Plyboard", slug: "santa-clara-plyboard" },
  { name: "SM Ply", slug: "sm-ply" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  
  const isActive = (path: string) => pathname === path;
  const isProductActive = () => pathname.startsWith('/products');

  useEffect(() => {
   const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
   return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Determine text color based on scroll or menu state
  const getTextColorClass = () => {
    if (isMobileMenuOpen) return 'text-black';
    if (isScrolled) return 'text-black';
    return 'text-white';
  };

  return (
    <>
      <header className={`fixed h-[100px] left-0 top-0 w-full z-[40] transition-all duration-300 overflow-visible ${isScrolled ? 'bg-white backdrop-blur-[12.5px] shadow-md' : 'bg-[rgba(182,182,182,0.1)] backdrop-blur-[12.5px] shadow-none'}`}>
        {/* Row Container- Constrained to 1440px and centered */}
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-[5%] xl:px-[60px]">
          {/* Logo with gradient glow */}
          <div className="relative">
            {/* White radial gradient glow - fades out when scrolled */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[504px] h-[365px] pointer-events-none transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)'
              }}
            />
            <Link href="/" className="relative h-[60px] w-[140px] md:h-[70px] md:w-[160px] xl:h-[89px] xl:w-[200px] cursor-pointer z-50 block">
              <Image 
                src="/images/santa-clara-logo.png" 
              alt="Santa Clara Logo" 
               fill
               className="object-contain pointer-events-none"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Navigation - Hidden on tablet/mobile */}
          <nav className="hidden xl:flex h-full items-center justify-center">
            <div className="flex gap-[64px] items-center" data-name="HeaderNav">
              {/* Home */}
              <Link href="/" className={`content-stretch flex flex-col items-center justify-center px-[12px] py-[10px] relative shrink-0 w-[73px] group cursor-pointer ${isActive('/') ? 'text-[#ff1c14]' : isScrolled ? 'text-black hover:text-[#ff1c14]' : 'text-white hover:text-[#ff1c14]'} transition-colors duration-200`}>
                <p className="font-body font-medium leading-[normal] not-italic relative shrink-0 text-[18px] tracking-[-0.72px] w-full pointer-events-none">Home</p>
                {/* Underline - shown on hover and active */}
                <div className={`absolute bg-[#ff1c14] h-[3px] left-0 -bottom-[29px] w-full transition-opacity duration-200 pointer-events-none ${isActive('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </Link>
              
              {/* About Us */}
              <Link href="/about-us" className={`content-stretch flex flex-col items-start px-[12px] py-[10px] relative shrink-0 w-[95px] group cursor-pointer ${isActive('/about-us') ? 'text-[#ff1c14]' : isScrolled ? 'text-black hover:text-[#ff1c14]' : 'text-white hover:text-[#ff1c14]'} transition-colors duration-200`}>
                <p className="font-body font-medium leading-[normal] not-italic relative shrink-0 text-[18px] tracking-[-0.72px] whitespace-nowrap pointer-events-none">About Us</p>
                {/* Underline - shown on hover and active */}
                <div className={`absolute bg-[#ff1c14] h-[3px] left-0 -bottom-[29px] w-full transition-opacity duration-200 pointer-events-none ${isActive('/about-us') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </Link>
              
              {/* Products with Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                <Link href="/products" className={`content-stretch flex flex-row items-center gap-2 px-[12px] py-[10px] relative shrink-0 cursor-pointer ${isProductActive() ? 'text-[#ff1c14]' : isScrolled ? 'text-black hover:text-[#ff1c14]' : 'text-white hover:text-[#ff1c14]'} transition-colors duration-200`}>
                  <p className="font-body font-medium leading-[normal] not-italic relative shrink-0 text-[18px] tracking-[-0.72px] whitespace-nowrap pointer-events-none">Products</p>
                  <Image 
                    src="/images/dropdown-icon.svg" 
                    alt="" 
                    width={20} 
                    height={20} 
                    className={`transition-transform duration-200 pointer-events-none ${isProductsDropdownOpen ? 'rotate-180' : ''}`}
                  />
                  {/* Underline - shown on hover and active */}
                  <div className={`absolute bg-[#ff1c14] h-[3px] left-0 -bottom-[29px] w-full transition-opacity duration-200 pointer-events-none ${isProductActive() ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </Link>
                
                {/* Desktop Dropdown */}
                <div className={`absolute top-full left-0 pt-2 transition-all duration-200 ${isProductsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                  <div className="bg-white rounded-lg shadow-lg py-2 min-w-[280px] border border-gray-100">
                    {productCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/products/${category.slug}`}
                        className={`block px-4 py-3 text-[16px] font-body font-medium transition-colors duration-200 ${pathname === `/products/${category.slug}` ? 'text-[#ff1c14] bg-red-50' : 'text-[#1e1e1e] hover:text-[#ff1c14] hover:bg-gray-50'}`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Press */}
              <Link href="/press" className={`content-stretch flex items-center justify-center px-[12px] py-[10px] relative shrink-0 group cursor-pointer ${isActive('/press') ? 'text-[#ff1c14]' : isScrolled ? 'text-black hover:text-[#ff1c14]' : 'text-white hover:text-[#ff1c14]'} transition-colors duration-200`}>
                <p className="font-body font-medium leading-[normal] not-italic relative shrink-0 text-[18px] tracking-[-0.72px] whitespace-nowrap pointer-events-none">Press</p>
                {/* Underline - shown on hover and active */}
                <div className={`absolute bg-[#ff1c14] h-[3px] left-0 -bottom-[29px] right-0 transition-opacity duration-200 pointer-events-none ${isActive('/press') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </Link>
              
              {/* Contact Us - CTA Button (no underline effect) */}
              <Link href="/contact-us" className="backdrop-blur-[20px] bg-[#E31C26] content-stretch flex items-center justify-center px-[24px] relative rounded-[100px] shrink-0 cursor-pointer hover:bg-[#A91F1A] transition-colors duration-200">
                <p className="font-body font-medium leading-[56px] not-italic relative shrink-0 text-[18px] text-white tracking-[-0.72px] whitespace-nowrap pointer-events-none">Contact Us</p>
              </Link>
            </div>
          </nav>

          {/* Mobile Hamburger Button - Visible on tablet/mobile */}
          <button 
            className="xl:hidden z-[100] p-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`block h-[3px] w-full rounded transition-all duration-300 ${isMobileMenuOpen ? 'bg-black rotate-45 translate-y-[11px]' : isScrolled ? 'bg-black' : 'bg-white'}`} />
              <span className={`block h-[3px] w-full rounded transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 bg-black' : isScrolled ? 'bg-black' : 'bg-white'}`} />
              <span className={`block h-[3px] w-full rounded transition-all duration-300 ${isMobileMenuOpen ? 'bg-black -rotate-45 -translate-y-[11px]' : isScrolled ? 'bg-black' : 'bg-white'}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile/Tablet Sidebar Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[90] xl:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Mobile/Tablet Sidebar Menu */}
      <aside 
        className={`fixed top-0 right-0 h-full w-[300px] max-w-[85vw] !bg-white z-[95] xl:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close button */}
        <button 
          className="absolute top-6 right-6 p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#1e1e1e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className="mt-20 px-8 flex flex-col gap-6 overflow-y-auto max-h-[calc(100%-80px)]">
          {/* Home */}
          <Link 
            href="/" 
            className={`py-3 border-b border-gray-200 ${isActive('/') ? 'text-[#ff1c14]' : 'text-[#1e1e1e] hover:text-[#ff1c14]'} transition-colors duration-200`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <p className="font-body font-medium text-[20px]">Home</p>
          </Link>
          
          {/* About Us */}
          <Link 
            href="/about-us" 
            className={`py-3 border-b border-gray-200 ${isActive('/about-us') ? 'text-[#ff1c14]' : 'text-[#1e1e1e] hover:text-[#ff1c14]'} transition-colors duration-200`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <p className="font-body font-medium text-[20px]">About Us</p>
          </Link>
          
          {/* Products with Mobile Dropdown */}
          <div className="border-b border-gray-200">
            <button
              className={`w-full py-3 flex items-center justify-between ${isProductActive() ? 'text-[#ff1c14]' : 'text-[#1e1e1e] hover:text-[#ff1c14]'} transition-colors duration-200`}
              onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
            >
              <p className="font-body font-medium text-[20px]">Products</p>
              <svg 
                className={`w-5 h-5 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Mobile Dropdown Items */}
            <div className={`overflow-hidden transition-all duration-200 ${isMobileProductsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-4 pb-2 flex flex-col gap-1">
                <Link 
                  href="/products" 
                  className={`py-2 text-[16px] ${isActive('/products') ? 'text-[#ff1c14]' : 'text-[#666] hover:text-[#ff1c14]'} transition-colors duration-200`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Products
                </Link>
                {productCategories.map((category) => (
                  <Link 
                    key={category.slug}
                    href={`/products/${category.slug}`}
                    className={`py-2 text-[16px] ${pathname === `/products/${category.slug}` ? 'text-[#ff1c14]' : 'text-[#666] hover:text-[#ff1c14]'} transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Press */}
          <Link 
            href="/press" 
            className={`py-3 border-b border-gray-200 ${isActive('/press') ? 'text-[#ff1c14]' : 'text-[#1e1e1e] hover:text-[#ff1c14]'} transition-colors duration-200`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <p className="font-body font-medium text-[20px]">Press</p>
          </Link>
          
          {/* Contact Us - CTA Button */}
          <Link 
            href="/contact-us" 
            className="mt-4 backdrop-blur-[20px] bg-[#E31C26] py-4 px-8 rounded-[100px] text-center cursor-pointer hover:bg-[#A91F1A] transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <p className="font-body font-medium text-[18px] text-white">Contact Us</p>
          </Link>
        </nav>
      </aside>
    </>
  );
}
