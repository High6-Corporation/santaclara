"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import Image from "next/image";

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
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNo: '',
    companyName: '',
    dropdown: '',
    textField: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          contactNo: '',
          companyName: '',
          dropdown: '',
          textField: '',
        });
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
        <div className="text-left lg:max-w-[562px] w-full mb-[30px] flex flex-col lg:gap-[30px] gap-[20px]">
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
                <p className="md:text-lg text-base font-semibold leading-[24px] tracking-[-0.72px] text-[#333333] uppercase">Manila</p>
                <p className="md:text-base text-sm leading-[24px] tracking-[-0.72px] text-[#333333]">Address: 1824 Tytana Plaza, Plaza Lorenzo Ruiz, Binondo, Manila, Philippines</p>
                <p className="md:text-base text-sm leading-[24px] tracking-[-0.72px] text-[#333333]">Contact Number:(+63 2) 242-5998</p>
            </div>
            <div>
                <p className="md:text-lg text-base font-semibold leading-[24px] tracking-[-0.72px] text-[#333333] uppercase">Davao</p>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">Address:  Daliao, Toril, Davao City, Davao del Sur, Philippines</p>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">Contact Number:(+63 82) 291-0898</p>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">(+63 82) 291-0899</p>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">(+63 82) 291-0900</p>
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
                        className="text-base leading-[28px] tracking-[-0.64px] text-[#333333] hover:text-[#e31c26] transition-colors duration-200 break-all"
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
        <div className="lg:max-w-[630px] w-full">
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
                <label htmlFor="fullName" className="block text-base font-medium text-[#333333] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all"
                  placeholder="Juan Dela Cruz"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-medium text-[#333333] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all"
                  placeholder="juan@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactNo" className="block text-base font-medium text-[#333333] mb-2">
                  Contact No.
                </label>
                <input
                  type="tel"
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all"
                  placeholder="+63 912 345 6789"
                />
              </div>
              <div>
                <label htmlFor="companyName" className="block text-base font-medium text-[#333333] mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dropdown" className="block text-base font-medium text-[#333333] mb-2">
                Select Option
              </label>
              <select
                id="dropdown"
                name="dropdown"
                value={formData.dropdown}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all"
              >
                <option value="">Select an option</option>
                <option value="product-inquiry">Product Inquiry</option>
                <option value="customer-support">Customer Support</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="textField" className="block text-base font-medium text-[#333333] mb-2">
                Message
              </label>
              <textarea
                id="textField"
                name="textField"
                rows={6}
                value={formData.textField}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#e31c26] text-white font-semibold text-base rounded-full hover:bg-[#a91f1a] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </Row>
    </Section>
  );
}
