import { NextResponse } from 'next/server';
import { submitDynamicFormAction, getDynamicFormFields } from '@/lib/contactFormService';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Convert JSON body to FormData for dynamic submission
    const formData = new FormData();
    for (const [key, value] of Object.entries(body)) {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    }

    // Fetch dynamic form fields from Gravity Forms
    const fields = await getDynamicFormFields();

    if (fields.length === 0) {
      console.error('No form fields found. Check your Gravity Forms configuration.');
      return NextResponse.json(
        { error: 'Form configuration error' },
        { status: 500 }
      );
    }

    // Submit using dynamic form service
    const result = await submitDynamicFormAction(formData, fields);

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
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
