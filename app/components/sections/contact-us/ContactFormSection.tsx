"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";

function SocialMediaIcons() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <div className="flex gap-[26px] items-center">
      <a 
        href="https://www.facebook.com/SantaClaraPlywood/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative size-[24px]"
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
        onMouseEnter={() => setHoveredIcon('tiktok')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Image
          src={hoveredIcon === 'tiktok' ? '/images/tiktok-hover.svg' : '/images/tiktok.svg'}
          alt="TikTok"
          fill
          className="object-contain"
        />
      </a>
    </div>
  );
}

export function ContactFormSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNo: '',
    companyName: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers, spaces, and + sign
    const sanitized = value.replace(/[^0-9+\s]/g, '');
    setFormData(prev => ({
      ...prev,
      contactNo: sanitized,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to thank you page
        router.push('/thank-you');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Section bgColor="bg-white lg:py-[100px] md:py-[60px] py-[40px]">
      <Row className="!max-w-[1222px] flex gap-[30px] max-lg:flex-col">
        {/* Contact Details */}
        <div className="text-left lg:max-w-[562px] w-full flex flex-col lg:gap-[30px] gap-[20px]">
            <div>
                <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal leading-[40px] lg:leading-[72.6px] tracking-[2.4px] text-[#333333] lg:mb-[30px] mb-[20px]">
                  Get in Touch
                </h2>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
                  Whether you have a product inquiry, need customer support, or want to explore partnership opportunities, our team is ready to assist you.
                </p>
            </div>
            {/* Location and Contacts */}
            <div className="flex flex-col gap-[15px]">
            <div>
                <p className="md:text-lg text-base font-semibold leading-[24px] tracking-[-0.72px] text-[#333333] uppercase mb-[10px]">Manila</p>
                <p className="md:text-base text-sm leading-[24px] tracking-[-0.72px] text-[#333333]">
                  Address: <a 
                    href="https://www.google.com/maps/place/Tytana+Plaza,+Insular+St,+Binondo,+Manila,+1000+Metro+Manila/@14.6009353,120.9715235,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ca1025c484d1:0xb7f4f660f2aa9f8d!8m2!3d14.6009301!4d120.9740984!16s%2Fg%2F11xzgnf6jq?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#e31c26] transition-colors duration-200"
                  >
                    1824 Tytana Plaza, Plaza Lorenzo Ruiz, Binondo, Manila, Philippines
                  </a>
                </p>
                <p className="md:text-base text-sm leading-[24px] tracking-[-0.72px] text-[#333333]">
                  Contact Number: <a 
                    href="tel:+6322425998"
                    className="hover:text-[#e31c26] transition-colors duration-200"
                  >
                    (+63 2) 242-5998
                  </a>
                </p>
            </div>
            <div>
                <p className="md:text-lg text-base font-semibold leading-[24px] tracking-[-0.72px] text-[#333333] uppercase mb-[10px]">Davao</p>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
                  Address: <a 
                    href="https://www.google.com/maps/place/Daliao,+Toril,+Davao+City,+Davao+del+Sur/@7.0138252,125.4974107,15z/data=!3m1!4b1!4m6!3m5!1s0x32f90c427ea824fd:0x749d6d2f5963642c!8m2!3d7.0158047!4d125.5083136!16s%2Fg%2F1ptxlnbn9?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#e31c26] transition-colors duration-200"
                  >
                    Daliao, Toril, Davao City, Davao del Sur, Philippines
                  </a>
                </p>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
                  Contact Number: <a 
                    href="tel:+63822910898"
                    className="hover:text-[#e31c26] transition-colors duration-200"
                  >
                    (+63 82) 291-0898
                  </a>
                </p>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
                  <a 
                    href="tel:+63822910899"
                    className="hover:text-[#e31c26] transition-colors duration-200"
                  >
                    (+63 82) 291-0899
                  </a>
                </p>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
                  <a 
                    href="tel:+63822910900"
                    className="hover:text-[#e31c26] transition-colors duration-200"
                  >
                    (+63 82) 291-0900
                  </a>
                </p>
            </div>
            <div>
                <div className="flex gap-[12px] items-center mt-[8px]">
                    <img 
                        src="/images/EmailIcon.svg" 
                        alt="Email icon" 
                        className="w-[24px] h-[24px]"
                    />
                    <a 
                        href="mailto:smwpipurchasing@gmail.com" 
                        className="text-base leading-[28px] underline tracking-[-0.64px] text-[#333333] hover:text-[#e31c26] transition-colors duration-200 break-all"
                    >
                        smwpipurchasing@gmail.com
                    </a>
                </div>
            </div>
            </div>
            <div>
                <p className="md:text-lg text-base font-semibold leading-[24px] tracking-[-0.72px] text-[#333333] mb-[10px] uppercase">Follow us on:</p>
                <SocialMediaIcons />
            </div>
        </div>

        {/* Contact Form */}
        <div className="lg:max-w-[630px] w-full bg-[#04217B] md:px-[30px] px-[20px] md:py-[50px] py-[30px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="sr-only">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-none focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all text-[#333333] placeholder:text-[#999999]"
                  placeholder="Full Name*"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-none focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all text-[#333333] placeholder:text-[#999999]"
                  placeholder="Email Address*"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactNo" className="sr-only">
                  Contact No.
                </label>
                <input
                  type="tel"
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handlePhoneChange}
                  onKeyPress={(e) => {
                    // Prevent letters from being typed
                    const char = String.fromCharCode(e.which);
                    if (!/[0-9+\s]/.test(char)) {
                      e.preventDefault();
                    }
                  }}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-none focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all text-[#333333] placeholder:text-[#999999]"
                  placeholder="Contact No.*"
                  pattern="[0-9+\s]*"
                />
              </div>
              <div>
                <label htmlFor="companyName" className="sr-only">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-none focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all text-[#333333] placeholder:text-[#999999]"
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="subject" className="sr-only">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full cursor-pointer px-4 py-3 pr-[42px] bg-white border border-gray-300 rounded-none focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all appearance-none text-[#333333]"
              >
                <option value="" disabled>Reason / Subject*</option>
                <option value="First Choice" className="cursor-pointer">First Choice</option>
                <option value="Second Choice" className="cursor-pointer hover:bg-[#E31C26]">Second Choice</option>
                <option value="Third Choice" className="cursor-pointer hover:bg-[#E31C26]">Third Choice</option>
              </select>
              <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
                <img 
                  src="/images/dropdown-icon.svg" 
                  alt="Dropdown arrow" 
                  className="w-[20px] h-[20px]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-none focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all resize-none text-[#333333] placeholder:text-[#999999]"
                placeholder="Message"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className={`content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[21px] rounded-[100px] shrink-0 cursor-pointer transition-all duration-300 ease-in-out font-body font-semibold text-[16px] tracking-[-0.64px] whitespace-nowrap bg-[#e31c26] text-white hover:bg-[#a91f1a] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                <div
                  className={`relative shrink-0 size-[24px] transition-transform duration-300 ease-in-out ${
                    isButtonHovered ? 'rotate-[-45deg]' : 'rotate-0'
                  }`}
                >
                  <img
                    src="/images/arrow-icon.svg"
                    alt="Arrow"
                    className="absolute inset-0 size-full"
                  />
                </div>
              </button>
            </div>
          </form>
        </div>
      </Row>
    </Section>
  );
}
