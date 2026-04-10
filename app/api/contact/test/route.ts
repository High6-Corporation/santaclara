import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const consumerKey = process.env.WP_GRAVITY_API_KEY;
    const consumerSecret = process.env.WP_GRAVITY_API_SECRET;
    const formId = process.env.WP_GRAVITY_FORM_CONTACT_ID;
    const siteUrl = process.env.WP_SITE_URL;

    if (!consumerKey || !consumerSecret || !formId || !siteUrl) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 }
      );
    }

    // Create signature
    const stringToSign = `${consumerKey}&${timestamp}`;
    const signature = crypto
      .createHmac('sha256', consumerSecret)
      .update(stringToSign)
      .digest('base64');

    // Try different API endpoints
    const endpoints = [
      `${siteUrl}/wp-json/gf/v2/forms/${formId}`,
      `${siteUrl}/wp-json/gravityformsapi/forms/${formId}`,
      `${siteUrl}/wp-json/gf/v2/forms`,
      `${siteUrl}/wp-json/gravityforms/v2/forms/${formId}`,
    ];

    const results: Array<{
      endpoint?: string;
      status?: number;
      ok?: boolean;
      data?: unknown;
      error?: string;
    }> = [];

    for (const endpoint of endpoints) {
      try {
        console.log(`Testing endpoint: ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-GRAVITYFORMS-API-KEY': consumerKey,
            'X-GRAVITYFORMS-TIMESTAMP': timestamp,
            'X-GRAVITYFORMS-SIGNATURE': signature,
          },
        });

        const data = await response.json();
        
        results.push({
          endpoint,
          status: response.status,
          ok: response.ok,
          data,
        });

        if (response.ok) {
          return NextResponse.json({
            success: true,
            workingEndpoint: endpoint,
            formData: data,
            allTests: results,
          });
        }
      } catch (error: unknown) {
        results.push({
          endpoint,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        });
      }
    }

    // If none worked, return all results for debugging
    return NextResponse.json({
      success: false,
      message: 'No working endpoint found',
      allTests: results,
    });
  } catch (error: unknown) {
    console.error('Error testing API:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Internal server error', details: message },
      { status: 500 }
    );
  }
}
