"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { getDynamicFormFields, DynamicFormField } from "@/lib/contactFormService";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { useCleanTalkBotDetector } from "@/lib/cleantalk/cleantalkscript";

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
  const [formFields, setFormFields] = useState<DynamicFormField[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation(0.2);
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation(0.1);
  const { scriptFailed: ctScriptFailed } = useCleanTalkBotDetector();

  // Fetch form fields from Gravity Forms
  useEffect(() => {
    async function loadFormFields() {
      try {
        const fields = await getDynamicFormFields();
        setFormFields(fields);
        
        // Initialize form data with empty values
        const initialData: Record<string, string> = {};
        fields.forEach(field => {
          initialData[field.name] = '';
        });
        setFormData(initialData);
      } catch (error) {
        console.error('Error loading form fields:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadFormFields();
  }, []);

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
      [e.target.name]: sanitized,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // Collect CleanTalk bot detector token from hidden input
      const ctToken = (document.querySelector('input[name="ct_bot_detector_event_token"]') as HTMLInputElement)?.value || '';

      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, ct_bot_detector_event_token: ctToken }),
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

  // Render form field based on type
  const renderField = (field: DynamicFormField) => {
    const baseClassName = "w-full px-4 py-3 bg-white border border-gray-300 rounded-none focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all text-[#333333] md:text-[18px] text-[16px] md:leading-[22px] leading-[20px] md:tracking-[-0.54px] tracking-[-0.48px] font-normal placeholder:text-[#999999]";

    switch (field.type) {
      case 'select':
        return (
          <div key={field.id} className="relative">
            <label htmlFor={field.name} className="sr-only">{field.label}</label>
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.isRequired}
              className={`${baseClassName} cursor-pointer pr-[42px] appearance-none`}
            >
              <option value="" disabled>{field.placeholder || `Select ${field.label}`}</option>
              {field.choices?.map((choice) => (
                <option key={choice.value} value={choice.value} className="cursor-pointer">
                  {choice.label}
                </option>
              ))}
            </select>
            <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
              <img 
                src="/images/dropdown-icon.svg" 
                alt="Dropdown arrow" 
                className="w-[20px] h-[20px]"
              />
            </div>
          </div>
        );
      
      case 'textarea':
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className="sr-only">{field.label}</label>
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              rows={6}
              className={`${baseClassName} resize-none`}
              placeholder={field.placeholder || field.label}
            />
          </div>
        );
      
      case 'phone':
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className="sr-only">{field.label}</label>
            <input
              type="tel"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handlePhoneChange}
              required={field.isRequired}
              className={baseClassName}
              placeholder={field.placeholder || field.label}
              pattern="[0-9+\s]*"
            />
          </div>
        );
      
      case 'email':
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className="sr-only">{field.label}</label>
            <input
              type="email"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.isRequired}
              className={baseClassName}
              placeholder={field.placeholder || field.label}
            />
          </div>
        );
      
      default: // text, number, etc.
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className="sr-only">{field.label}</label>
            <input
              type={field.type === 'number' ? 'number' : 'text'}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.isRequired}
              className={baseClassName}
              placeholder={field.placeholder || field.label}
            />
          </div>
        );
    }
  };
  return (
    <Section bgColor="bg-white lg:py-[100px] md:py-[60px] py-[40px]">
      <Row className="!max-w-[1222px] flex gap-[30px] max-lg:flex-col">
        {/* Contact Details */}
        <div 
          ref={leftRef}
          className="text-left lg:max-w-[562px] w-full flex flex-col lg:gap-[30px] gap-[20px]"
          style={{
            opacity: leftVisible ? 1 : 0,
            transform: leftVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
            <div>
                <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal tracking-[-2.4px] leading-[40px] lg:leading-[72.6px] text-[#333333] lg:mb-[30px] mb-[20px]">
                  Get in Touch!
                </h2>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
                  Whether you have a product inquiry, need customer support, or want to explore partnership opportunities, our team is ready to assist you.
                </p>
            </div>
            {/* Location and Contacts */}
            <div className="flex flex-col gap-[15px]">
            <div>
                <p className="md:text-lg text-base font-semibold leading-[24px] tracking-[-0.72px] text-[#1E1E1E] uppercase mb-[10px]">Manila</p>
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
                <p className="md:text-lg text-base font-semibold leading-[24px] tracking-[-0.72px] text-[#1E1E1E] uppercase mb-[10px]">Davao</p>
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
                        href="mailto:inquiry@santaclaraplywood.com" 
                        className="text-base leading-[28px] underline tracking-[-0.64px] text-[#333333] hover:text-[#e31c26] transition-colors duration-200 break-all"
                    >
                        inquiry@santaclaraplywood.com
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
        <div 
          ref={rightRef}
          className="lg:max-w-[630px] w-full bg-[#04217B] lg:h-[737px] md:px-[30px] px-[20px] md:py-[50px] py-[30px]"
          style={{
            opacity: rightVisible ? 1 : 0,
            transform: rightVisible ? "translateY(0)" : "translateY(50px)",
            transition: "opacity 0.8s ease-out 0.4s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
          }}
        >
          {isLoading ? (
            <div className="text-white text-center py-10">Loading form...</div>
          ) : (
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

              {/* Honeypot field */}
              <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* CleanTalk bot detector hidden input */}
              <input type="hidden" name="ct_bot_detector_event_token" id="ct_bot_detector_event_token" />

              {/* Dynamic Form Fields */}
              <div className="space-y-6">
                {formFields.map((field) => {
                  // Render in rows of 2 for smaller fields
                  const shouldBeHalfWidth = field.type !== 'textarea' && field.type !== 'select';
                  
                  return (
                    <div key={field.id}>
                      {renderField(field)}
                    </div>
                  );
                })}
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
          )}
        </div>
      </Row>
    </Section>
  );
}
