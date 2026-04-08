import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { fullName, email, contactNo, companyName, dropdown, textField } = body;

    // Validate required fields
    if (!fullName || !email || !dropdown || !textField) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const consumerKey = process.env.WP_GRAVITY_API_KEY;
    const consumerSecret = process.env.WP_GRAVITY_API_SECRET;
    const formId = process.env.WP_GRAVITY_FORM_CONTACT_ID;
    const siteUrl = process.env.WP_SITE_URL;
    
    if (!consumerKey || !consumerSecret || !formId || !siteUrl) {
      console.error('Missing environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Generate OAuth 1.0a signature for Gravity Forms
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomBytes(16).toString('hex');
    
    // Build signature base string
    const method = 'POST';
    const baseUrl = `${siteUrl}/wp-json/gf/v2/forms/${formId}/submissions`;
    
    const params = new URLSearchParams();
    params.set('oauth_consumer_key', consumerKey);
    params.set('oauth_nonce', nonce);
    params.set('oauth_signature_method', 'HMAC-SHA256');
    params.set('oauth_timestamp', timestamp);
    params.set('oauth_version', '1.0');
    
    // Sort parameters
    const sortedParams = params.toString().split('&').sort().join('&');
    
    const baseString = `${method}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(sortedParams)}`;
    const signingKey = `${encodeURIComponent(consumerSecret)}&`;
    
    const signature = crypto
      .createHmac('sha256', signingKey)
      .update(baseString)
      .digest('base64');

    const authHeader = [
      `OAuth oauth_consumer_key="${consumerKey}"`,
      `oauth_nonce="${nonce}"`,
      `oauth_signature="${encodeURIComponent(signature)}"`,
      `oauth_signature_method="HMAC-SHA256"`,
      `oauth_timestamp="${timestamp}"`,
      `oauth_version="1.0"`,
    ].join(', ');

    console.log('Submitting to Gravity Forms:', {
      apiUrl: baseUrl,
      formId,
      timestamp,
    });

    // Submit to Gravity Forms
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        input_1: fullName,        // Full Name
        input_2: email,           // Email Address
        input_3: contactNo,       // Contact No.
        input_4: companyName,     // Company Name
        input_5: dropdown,        // Dropdown
        input_6: textField,       // Text Field
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Gravity Forms API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      });
      return NextResponse.json(
        { 
          error: responseData.message || 'Failed to submit form',
          details: responseData 
        },
        { status: response.status }
      );
    }

    console.log('Gravity Forms submission successful:', responseData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      data: responseData
    });
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
