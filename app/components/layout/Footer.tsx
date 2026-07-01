"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function FooterNavTitle() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center md:items-start justify-center relative shrink-0 whitespace-nowrap" data-name="FooterNavTitle">
      <Link 
        href="/" 
        className={`relative shrink-0 transition-colors duration-200 ${isActive('/') ? 'text-[#e31c26]' : 'hover:text-[#e31c26]'}`}
      >
        Home
      </Link>
      <Link 
        href="/about-us" 
        className={`relative shrink-0 transition-colors duration-200 ${isActive('/about-us') ? 'text-[#e31c26]' : 'hover:text-[#e31c26]'}`}
      >
        About Us
      </Link>
      <Link 
        href="/products" 
        className={`relative shrink-0 transition-colors duration-200 ${isActive('/products') ? 'text-[#e31c26]' : 'hover:text-[#e31c26]'}`}
      >
        Products
      </Link>
    </div>
  );
}

function FooterNavTitle1() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center md:items-start relative shrink-0" data-name="FooterNavTitle">
            <Link 
        href="/dealer" 
        className={`relative shrink-0 transition-colors duration-200 ${isActive('/dealer') ? 'text-[#e31c26]' : 'hover:text-[#e31c26]'}`}
      >
        Dealer
      </Link>
      <Link 
        href="/press" 
        className={`relative shrink-0 w-full text-center md:text-left transition-colors duration-200 ${isActive('/press') ? 'text-[#e31c26]' : 'hover:text-[#e31c26]'}`}
      >
        Press
      </Link>
      <Link 
        href="/contact-us" 
        className={`relative shrink-0 w-full text-center md:text-left transition-colors duration-200 ${isActive('/contact-us') ? 'text-[#e31c26]' : 'hover:text-[#e31c26]'}`}
      >
        Contact Us
      </Link>
    </div>
  );
}

function FooterNavGroup() {
  return (
    <div className="content-stretch flex flex-col md:flex-row font-body font-medium gap-[5px] md:gap-[100px] lg:gap-[160px] items-center md:items-start leading-[40px] md:leading-[56px] not-italic relative shrink-0 text-[#333] text-[16px] md:text-[18px] tracking-[-0.72px]" data-name="FooterNavGroup">
      <FooterNavTitle />
      <FooterNavTitle1 />
    </div>
  );
}

function PhoneIcon() {
 return (
    <img 
   src="/images/PhoneIcon.svg" 
  alt="Phone icon" 
  className="w-[32px] h-[32px]"
    data-name="PhoneIcon"
   />
 );
}

function ContactInfo() {
  return (
    <div className="content-stretch flex flex-col items-center md:items-start relative shrink-0 w-full" data-name="Contact Info">
      <a href="tel:09209007007" className="font-body font-normal leading-[normal] not-italic relative shrink-0 text-[#333] text-[16px] md:text-[18px] tracking-[-0.72px] w-full text-center md:text-left hover:text-[#e31c26] transition-colors duration-200">
        0920 900 7007
      </a>
    </div>
  );
}

function FooterPhoneNumber() {
  return (
    <div className="content-stretch flex flex-col md:flex-row gap-[12px] md:gap-[20px] items-center relative shrink-0 w-full" data-name="FooterPhoneNumber">
      <PhoneIcon />
      <ContactInfo />
    </div>
  );
}

function EmailIcon() {
 return (
    <img 
   src="/images/EmailIcon.svg" 
  alt="Email icon" 
  className="w-[32px] h-[32px]"
    data-name="EmailIcon"
   />
 );
}

function ContactInfo1() {
  return (
    <div className="content-stretch flex flex-col items-center md:items-start relative shrink-0 w-full" data-name="Contact Info">
      <a href="mailto:inquiry@santaclaraplywood.com" className="font-body font-normal leading-[normal] not-italic relative shrink-0 text-[#333] text-[16px] md:text-[18px] tracking-[-0.72px] w-full text-center md:text-left hover:text-[#e31c26] transition-colors duration-200 break-all">
        inquiry@santaclaraplywood.com
      </a>
    </div>
  );
}

function FooterEmailAddress() {
  return (
    <div className="content-stretch flex flex-col md:flex-row gap-[12px] md:gap-[20px] items-center relative shrink-0 w-full" data-name="FooterEmailAddress">
      <EmailIcon />
      <ContactInfo1 />
    </div>
  );
}

function ContactInfosContainer() {
  return (
    <div className="flex flex-col gap-[22px] items-center md:items-start w-full">
      <FooterPhoneNumber />
      <FooterEmailAddress />
    </div>
  );
}

function SocialMediaIcons() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <div className="flex gap-[26px] items-center">
      <a 
        href="https://www.facebook.com/SantaClaraPlywood/" 
        target="_blank" 
       rel="noopener noreferrer" 
       className="relative size-[24px]"
        data-name="Facebook"
        onMouseEnter={() => setHoveredIcon('facebook')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Image
         src={hoveredIcon === 'facebook' ? '/images/Facebook-hover.svg' : '/images/Facebook.svg'}
         alt="Facebook"
         fill
         className="object-contain"
        />
      </a>
      <a 
        href="https://www.instagram.com/santaclaramarineplywood/" 
        target="_blank" 
       rel="noopener noreferrer" 
       className="relative size-[24px]"
        data-name="Instagram"
        onMouseEnter={() => setHoveredIcon('instagram')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Image
         src={hoveredIcon === 'instagram' ? '/images/Instagram-hover.svg' : '/images/Instagram.svg'}
         alt="Instagram"
         fill
         className="object-contain"
        />
      </a>
      <a 
        href="https://www.tiktok.com/@santaclaraplywood" 
        target="_blank" 
       rel="noopener noreferrer" 
       className="relative size-[24px]"
        data-name="Twitter(X)"
        onMouseEnter={() => setHoveredIcon('twitter')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Image
         src={hoveredIcon === 'twitter' ? '/images/tiktok-hover.svg' : '/images/tiktok.svg'}
         alt="Twitter"
         fill
         className="object-contain"
        />
      </a>
    </div>
  );
}

function SocialMediaLinksText() {
  return (
    <div className="flex flex-col md:flex-row gap-[12px] md:gap-[24px] items-center w-full">
      <p className="font-body font-normal text-[16px] md:text-[18px] text-[#333] whitespace-nowrap">Follow us on:</p>
      <SocialMediaIcons />
    </div>
  );
}

function FooterContactAndSocials() {
  return (
    <div className="flex flex-col gap-[30px] items-center w-full">
      <ContactInfosContainer />
      <SocialMediaLinksText />
    </div>
  );
}

function Frame43() {
  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-between w-full gap-[40px] md:gap-[60px] xl:gap-[20px]">
      <Link href="/" className="hover:opacity-80 transition-opacity duration-200 shrink-0" data-name="FooterLogo">
        <img 
          src="/images/footer-logo.jpg" 
          alt="Santa Clara Logo" 
          className="h-[120px] md:h-[157px] w-auto object-cover"
        />
      </Link>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-[60px] md:gap-[120px] lg:gap-[180px] w-full md:w-auto">
        <FooterNavGroup />
        <FooterContactAndSocials />
      </div>
    </div>
  );
}

function FooterContainer() {
  return (
    <div className="flex flex-col gap-[40px] md:gap-[50px] items-center w-full">
      <Frame43 />
      <div className="flex flex-col items-center gap-[12px]">
        <div className="flex flex-wrap justify-center gap-x-[20px] gap-y-[4px] font-body font-normal text-[12px] text-[#333]">
          <Link href="/privacy-policy" className="hover:text-[#e31c26] transition-colors duration-200">Privacy Policy</Link>
          <span className="text-gray-300">|</span>
          <Link href="/cookie-policy" className="hover:text-[#e31c26] transition-colors duration-200">Cookie Policy</Link>
        </div>
        <p className="font-body font-normal text-[11px] text-black text-center px-[20px]">© 2026 SANTA CLARA MARINE PLYWOOD . All Rights Reserved</p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full bg-white py-[60px] md:py-[100px]">
      {/* Row Container - Constrained to 1440px and centered */}
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <FooterContainer />
      </div>
    </footer>
  );
}
