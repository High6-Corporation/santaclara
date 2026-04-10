"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getDynamicFormFields, DynamicFormField } from "@/lib/contactFormService";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productCategory: string;
  formId: string;
}

export function InquiryModal({ isOpen, onClose, productName, productCategory, formId }: InquiryModalProps) {
  const router = useRouter();
  const [formFields, setFormFields] = useState<DynamicFormField[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch form fields from Gravity Forms
  useEffect(() => {
    if (isOpen) {
      async function loadFormFields() {
        try {
          const fields = await getDynamicFormFields(formId);
          setFormFields(fields);
          console.log('Form fields from WordPress:', fields);
          
          // Initialize form data with empty values and pre-fill product info
          const initialData: Record<string, string> = {};
          fields.forEach(field => {
            // Auto-populate field ID 10 with product category
            if (field.id === 10) {
              initialData[field.name] = productCategory;
            }
            // Auto-populate field ID 11 with product name/thickness
            else if (field.id === 11) {
              initialData[field.name] = productName;
            }
            // Initialize other fields with empty values
            else {
              initialData[field.name] = '';
            }
          });
          console.log('Initial form data:', initialData);
          setFormData(initialData);
        } catch (error) {
          console.error('Error loading form fields:', error);
        } finally {
          setIsLoading(false);
        }
      }
      
      loadFormFields();
    }
  }, [isOpen, formId, productName]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, form_id: formId }),
      });

      const result = await response.json();

      if (response.ok) {
        // Immediately redirect to thank you page
        onClose();
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
    const baseClassName = "w-full px-4 py-3 bg-white border border-gray-300 rounded-none focus:ring-2 focus:ring-[#04217B] focus:border-transparent outline-none transition-all text-[#333333] placeholder:text-[#999999]";

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
              rows={4}
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
        // Check if this is a readonly field (field ID 10 or 11)
        const isReadonly = field.id === 10 || field.id === 11;
        
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
              readOnly={isReadonly}
              className={`${baseClassName} ${
                isReadonly 
                  ? 'bg-gray-100 cursor-not-allowed text-gray-600' 
                  : ''
              }`}
              placeholder={field.placeholder || field.label}
            />
          </div>
        );
    }
  };

  if (!isOpen) return null;

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4" style={{ position: 'fixed' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#04217B] w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#031a64] [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-white/50" style={{ zIndex: 100000 }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[100001] text-white hover:text-[#e31c26] transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 text-center">
          <h2 className="text-[60px] font-normal leading-normal tracking-[-2.4px] text-white">
            Inquiry Form
          </h2>
          <p className="text-white text-[18px] leading-[28px] tracking-[-0.18px] mt-4 max-w-[500px] mx-auto">
            Tell us what you need—type, thickness, volume, and delivery location—and we&apos;ll get back to you with a competitive quote and product recommendations.
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-white text-center py-10">Loading form...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300">
                  Thank you! Your inquiry has been sent successfully.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                  {errorMessage}
                </div>
              )}

              {/* Dynamic Form Fields */}
              <div className="space-y-6">
                {formFields.map((field) => {
                  return (
                    <div key={field.id}>
                      {renderField(field)}
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[21px] rounded-[100px] shrink-0 cursor-pointer transition-all duration-300 ease-in-out font-body font-semibold text-[16px] tracking-[-0.64px] whitespace-nowrap bg-[#e31c26] text-white hover:bg-[#a91f1a] ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  <div
                    className={`relative shrink-0 size-[24px] transition-transform duration-300 ease-in-out ${
                      isSubmitting ? 'rotate-0' : 'hover:rotate-[-45deg]'
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
      </div>
    </div>,
    document.body
  );
}
