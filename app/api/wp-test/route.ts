import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const siteUrl = process.env.WP_SITE_URL;

    // Test basic WordPress REST API
    const tests = [
      {
        name: 'WordPress REST API Root',
        url: `${siteUrl}/wp-json/`,
      },
      {
        name: 'Gravity Forms Plugin Check',
        url: `${siteUrl}/wp-json/wp/v2/plugins`,
      },
      {
        name: 'All REST Routes',
        url: `${siteUrl}/wp-json/wp/v2/posts`,
      },
    ];

    const results: any[] = [];

    for (const test of tests) {
      try {
        console.log(`Testing: ${test.name} - ${test.url}`);
        const response = await fetch(test.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        
        results.push({
          name: test.name,
          url: test.url,
          status: response.status,
          ok: response.ok,
          data: response.ok ? data : null,
        });
      } catch (error: any) {
        results.push({
          name: test.name,
          url: test.url,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      results,
      message: 'Check if WordPress REST API is accessible',
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
