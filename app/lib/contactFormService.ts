'use server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

function validateField(value: string, maxLength: number): boolean {
  return value.length > 0 && value.length <= maxLength;
}

function validatePhoneNumber(phone: string): boolean {
  // Check if phone contains only valid characters (digits, spaces, +, and dashes)
  const phoneRegex = /^[\d+\s-]+$/;
  return phoneRegex.test(phone);
}

// ============ TYPE DEFINITIONS ============

export type GravityFieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'select'
  | 'textarea'
  | 'website'
  | 'number'
  | 'date'
  | 'checkbox'
  | 'radio'
  | 'hidden'
  | 'fileupload'
  | 'time'
  | 'password'
  | 'html'
  | 'section';

export interface GravityFormChoice {
  text: string;
  value: string;
  isSelected?: boolean;
}

export interface GravityFormField {
  id: number;
  type: string;
  label: string;
  adminLabel?: string;
  isRequired: boolean;
  placeholder?: string;
  choices?: GravityFormChoice[];
  maxLength?: number;
  description?: string;
  inputName?: string;
}

// Transformed field for frontend rendering
export interface DynamicFormField {
  id: number;
  type: GravityFieldType;
  label: string;
  name: string;
  isRequired: boolean;
  placeholder: string;
  choices?: { value: string; label: string }[];
  maxLength?: number;
  description?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  data?: unknown;
}

// ============ FETCH FORM DEFINITION ============

// Fetch form definition from Gravity Forms
export async function getContactFormDefinition(formId?: string): Promise<Record<string, unknown> | null> {
  try {
    const siteUrl = process.env.WP_SITE_URL;
    const targetFormId = formId || process.env.WP_GRAVITY_FORM_CONTACT_ID;
    const apiKey = process.env.WP_GRAVITY_API_KEY;
    const apiSecret = process.env.WP_GRAVITY_API_SECRET;

    if (!siteUrl || !targetFormId || !apiKey || !apiSecret) {
      console.error('Missing Gravity Forms configuration');
      return null;
    }

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const response = await fetch(
      `${siteUrl}/wp-json/gf/v2/forms/${targetFormId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gravity Forms API Error fetching form:', errorText);
      return null;
    }

    const formDefinition = await response.json();
    return formDefinition;
  } catch (err) {
    console.error('Error fetching form definition:', err);
    return null;
  }
}

// Map Gravity Forms field types to our types
function mapFieldType(gfType: string): GravityFieldType {
  const typeMap: Record<string, GravityFieldType> = {
    'text': 'text',
    'email': 'email',
    'phone': 'phone',
    'select': 'select',
    'textarea': 'textarea',
    'website': 'website',
    'number': 'number',
    'date': 'date',
    'checkbox': 'checkbox',
    'radio': 'radio',
    'hidden': 'hidden',
    'fileupload': 'fileupload',
    'time': 'time',
    'password': 'password',
    'html': 'html',
    'section': 'section'
  };
  return typeMap[gfType] || 'text';
}

// Transform Gravity Forms field to frontend field format
function transformField(field: Record<string, unknown>): DynamicFormField {
  // Handle choices - could be array, object, or undefined
  let choices: { value: string; label: string }[] | undefined;

  if (field.choices && Array.isArray(field.choices)) {
    choices = (field.choices as Array<Record<string, string>>).map((choice) => ({
      value: (choice.value || choice.text) as string,
      label: choice.text as string
    }));
  }

  return {
    id: field.id as number,
    type: mapFieldType(field.type as string),
    label: (field.label || field.adminLabel || `Field ${field.id}`) as string,
    name: `input_${field.id}`,
    isRequired: (field.isRequired as boolean) || false,
    placeholder: (field.placeholder || field.label || '') as string,
    choices,
    maxLength: field.maxLength as number | undefined,
    description: field.description as string | undefined
  };
}

// Fetch and transform form fields for dynamic rendering
export async function getDynamicFormFields(formId?: string): Promise<DynamicFormField[]> {
  try {
    const formDefinition = await getContactFormDefinition(formId);

    if (!formDefinition || !formDefinition.fields || !Array.isArray(formDefinition.fields)) {
      return [];
    }

    // Filter out honeypot, hidden, and page fields, then transform
    return (formDefinition.fields as Array<Record<string, unknown>>)
      .filter((field) => {
        const fieldType = field.type as string;
        // Keep fields that are visible form inputs
        return !['honeypot', 'hidden', 'page', 'html', 'section'].includes(fieldType);
      })
      .map(transformField);
  } catch (error) {
    console.error('Error fetching form fields:', error);
    return [];
  }
}

// ============ FORM SUBMISSION ============

// Dynamic form submission with field validation
export async function submitDynamicFormAction(
  formData: FormData,
  fields: DynamicFormField[],
  formId?: string
): Promise<FormSubmissionResult> {
  try {
    const honeypot = formData.get('website')?.toString().trim() || '';
    if (honeypot) {
      return { success: true, message: 'Form submitted successfully' };
    }

    // Build submission data and validate dynamically
    const missingFields: string[] = [];

    for (const field of fields) {
      // Skip file uploads
      if (field.type === 'fileupload') {
        continue;
      }

      const value = formData.get(field.name)?.toString().trim() || '';

      // Special handling for "Other Subject" field (input_5)
      // Only validate if it's shown (when Subject = "Others")
      const isOtherSubjectField = field.name === 'input_5';
      const subjectValue = formData.get('input_4')?.toString().trim() || '';
      const isOtherSelected = subjectValue === 'Others';

      // If this is the Other Subject field and "Others" is NOT selected, skip validation
      if (isOtherSubjectField && !isOtherSelected) {
        continue;
      }

      if (field.isRequired && !value) {
        missingFields.push(field.label);
      }

      // Validate email fields
      if (field.type === 'email' && value && !isValidEmail(value)) {
        return { success: false, message: `Invalid email format for ${field.label}` };
      }

      // Validate phone fields
      if (field.type === 'phone' && value && !validatePhoneNumber(value)) {
        return { success: false, message: `Phone number can only contain numbers, spaces, +, and dashes (-)` };
      }

      // Validate max length
      if (field.maxLength && value.length > field.maxLength) {
        return { success: false, message: `${field.label} exceeds maximum length` };
      }
    }

    if (missingFields.length > 0) {
      return { success: false, message: `Please fill in: ${missingFields.join(', ')}` };
    }

    return await submitDynamicToGravityForms(formData, formId);
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

// Submit dynamic form data to Gravity Forms REST API
async function submitDynamicToGravityForms(formData: FormData, formId?: string): Promise<FormSubmissionResult> {
  try {
    const siteUrl = process.env.WP_SITE_URL;
    const targetFormId = formId || process.env.WP_GRAVITY_FORM_CONTACT_ID;
    const apiKey = process.env.WP_GRAVITY_API_KEY;
    const apiSecret = process.env.WP_GRAVITY_API_SECRET;

    if (!siteUrl || !targetFormId || !apiKey || !apiSecret) {
      console.error('Missing Gravity Forms configuration');
      return { success: false, message: 'Form configuration error. Please try again later.' };
    }

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    // Create new FormData for Gravity Forms (excluding honeypot)
    const gfFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      if (key !== 'website') {
        gfFormData.append(key, value);
      }
    }

    const response = await fetch(
      `${siteUrl}/wp-json/gf/v2/forms/${targetFormId}/submissions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
        },
        body: gfFormData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gravity Forms API Error:', errorText);
      return { success: false, message: 'Failed to submit form. Please try again.' };
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: result,
    };
  } catch (error) {
    console.error('Gravity Forms submission error:', error);
    return {
      success: false,
      message: 'Failed to submit form. Please try again later.'
    };
  }
}

// Legacy: Server action for contact form submission (static fields)
export async function submitContactFormAction(formData: FormData): Promise<FormSubmissionResult> {
  try {
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const subject = formData.get('subject')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';
    const honeypot = formData.get('website')?.toString().trim() || '';

    // Honeypot check - if filled, silently succeed (bot detection)
    if (honeypot) {
      return { success: true, message: 'Form submitted successfully' };
    }

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      const missingFields = [];
      if (!name) missingFields.push('Full Name');
      if (!email) missingFields.push('Email Address');
      if (!phone) missingFields.push('Contact No.');
      if (!subject) missingFields.push('Subject');
      if (!message) missingFields.push('Message');
      return { success: false, message: `Please fill in: ${missingFields.join(', ')}` };
    }

    // Validate field lengths
    if (!validateField(name, 100)) {
      return { success: false, message: 'Name is too long (max 100 characters)' };
    }

    if (!validateField(email, 255) || !isValidEmail(email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    if (!validateField(phone, 50) || !validatePhoneNumber(phone)) {
      return { success: false, message: 'Please enter a valid phone number' };
    }

    if (!validateField(subject, 200)) {
      return { success: false, message: 'Subject is too long (max 200 characters)' };
    }

    if (!validateField(message, 2000)) {
      return { success: false, message: 'Message is too long (max 2000 characters)' };
    }

    // Submit to Gravity Forms
    return await submitToGravityForms({ name, email, phone, subject, message });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

// Submit static form data to Gravity Forms (legacy method)
async function submitToGravityForms(data: ContactFormData): Promise<FormSubmissionResult> {
  try {
    const siteUrl = process.env.WP_SITE_URL;
    const formId = process.env.WP_GRAVITY_FORM_CONTACT_ID;
    const apiKey = process.env.WP_GRAVITY_API_KEY;
    const apiSecret = process.env.WP_GRAVITY_API_SECRET;

    if (!siteUrl || !formId || !apiKey || !apiSecret) {
      console.error('Missing Gravity Forms configuration');
      return { success: false, message: 'Form configuration error. Please try again later.' };
    }

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const response = await fetch(
      `${siteUrl}/wp-json/gf/v2/forms/${formId}/submissions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_1: data.name,
          input_2: data.email,
          input_3: data.phone,
          input_4: data.subject,
          input_5: data.message,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gravity Forms API Error:', errorText);
      return { success: false, message: 'Failed to submit form. Please try again.' };
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: result,
    };
  } catch (error) {
    console.error('Gravity Forms submission error:', error);
    return {
      success: false,
      message: 'Failed to submit form. Please try again later.'
    };
  }
}
