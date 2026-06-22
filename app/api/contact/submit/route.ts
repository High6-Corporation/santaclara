import { NextResponse } from 'next/server';
import { submitDynamicFormAction, getDynamicFormFields } from '@/lib/contactFormService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const formId = body.form_id || process.env.WP_GRAVITY_FORM_CONTACT_ID;

    // Extract CleanTalk token before converting to FormData
    const ct_bot_detector_event_token = body.ct_bot_detector_event_token || '';

    // Convert JSON body to FormData for dynamic submission
    const formData = new FormData();
    for (const [key, value] of Object.entries(body)) {
      if (key !== 'form_id' && key !== 'ct_bot_detector_event_token' && value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    }

    // Fetch dynamic form fields from Gravity Forms
    const fields = await getDynamicFormFields(formId);

    if (fields.length === 0) {
      console.error('No form fields found. Check your Gravity Forms configuration.');
      return NextResponse.json(
        { error: 'Form configuration error' },
        { status: 500 }
      );
    }

    // Submit using dynamic form service
    const result = await submitDynamicFormAction(formData, fields, formId, ct_bot_detector_event_token);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: result.message,
        data: result.data
      });
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    console.error('Error submitting form:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Internal server error', details: message },
      { status: 500 }
    );
  }
}
