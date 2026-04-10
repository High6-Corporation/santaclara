import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  try {
    const consumerKey = process.env.WP_GRAVITY_API_KEY;
    const consumerSecret = process.env.WP_GRAVITY_API_SECRET;
    const formId = process.env.WP_GRAVITY_FORM_CONTACT_ID;
    const siteUrl = process.env.WP_SITE_URL;

    if (!consumerKey || !consumerSecret || !formId || !siteUrl) {
      return NextResponse.json({ error: 'Missing env variables' }, { status: 500 });
    }

    // Generate OAuth 1.0a signature
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomBytes(16).toString('hex');
    const method = 'GET';
    const baseUrl = `${siteUrl}/wp-json/gf/v2/forms/${formId}`;

    const params = new URLSearchParams();
    params.set('oauth_consumer_key', consumerKey);
    params.set('oauth_nonce', nonce);
    params.set('oauth_signature_method', 'HMAC-SHA256');
    params.set('oauth_timestamp', timestamp);
    params.set('oauth_version', '1.0');

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

    console.log('Testing Gravity Forms API with OAuth...');
    console.log('URL:', baseUrl);
    console.log('Auth Header:', authHeader);

    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      },
    });

    const data = await response.json();

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      url: baseUrl,
      data: data,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
