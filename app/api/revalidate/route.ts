import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * POST /api/revalidate
 * Webhook endpoint called by WordPress mu-plugin on content changes.
 *
 * Expected body: { secret, post_type, slug, action }
 */

// Map WordPress post types → Next.js route segments
const POST_TYPE_CONFIG: Record<
  string,
  {
    detailPrefix: string;   // e.g. /products/[slug]
    listPaths: string[];    // listing pages to revalidate
    tags: string[];         // cache tags to purge
  }
> = {
  post: {
    detailPrefix: '/press',
    listPaths: ['/press', '/'],
    tags: ['wordpress-posts'],
  },
  page: {
    detailPrefix: '',       // pages use root-level slugs like /about-us
    listPaths: ['/'],
    tags: ['wordpress-pages'],
  },
  product_category: {
    detailPrefix: '/products',
    listPaths: ['/products', '/'],
    tags: ['wordpress-products'],
  },
  gallery: {
    detailPrefix: '/gallery',
    listPaths: ['/gallery', '/'],
    tags: ['wordpress-galleries'],
  },
  dealer: {
    detailPrefix: '/dealer',
    listPaths: ['/dealer'],
    tags: ['wordpress-dealers'],
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, post_type, slug, action } = body as {
      secret?: string;
      post_type?: string;
      slug?: string;
      action?: string;
    };

    // ── Validate secret ──────────────────────────────────────
    const expectedSecret = process.env.REVALIDATE_SECRET_TOKEN;
    if (!expectedSecret) {
      console.error('[Revalidate] REVALIDATE_SECRET_TOKEN is not set');
      return NextResponse.json(
        { error: 'Server misconfiguration' },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret token' },
        { status: 401 }
      );
    }

    // ── Validate payload ─────────────────────────────────────
    if (!post_type || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: post_type, action' },
        { status: 400 }
      );
    }

    const config = POST_TYPE_CONFIG[post_type];

    // If we don't recognise the post type, still revalidate sitemap and return
    if (!config) {
      console.log(`[Revalidate] Unknown post_type "${post_type}" — revalidating sitemap only`);
      revalidatePath('/sitemap.xml');
      return NextResponse.json({
        revalidated: true,
        message: `Unknown post_type "${post_type}", sitemap revalidated`,
      });
    }

    // ── Revalidate detail page ───────────────────────────────
    if (slug) {
      const detailPath = config.detailPrefix
        ? `${config.detailPrefix}/${slug}`
        : `/${slug}`;

      revalidatePath(detailPath);
      console.log(`[Revalidate] Path: ${detailPath} (action: ${action})`);
    }

    // ── Revalidate listing pages ─────────────────────────────
    for (const listPath of config.listPaths) {
      revalidatePath(listPath);
      console.log(`[Revalidate] Path: ${listPath} (action: ${action})`);
    }

    // ── Revalidate cache tags ────────────────────────────────
    for (const tag of config.tags) {
      revalidateTag(tag);
      console.log(`[Revalidate] Tag: ${tag} (action: ${action})`);
    }

    // ── Always revalidate sitemap ────────────────────────────
    revalidatePath('/sitemap.xml');
    revalidateTag('wordpress-sitemap');
    console.log('[Revalidate] Sitemap revalidated');

    return NextResponse.json({
      revalidated: true,
      post_type,
      slug: slug ?? null,
      action,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Revalidate] Error:', message);
    return NextResponse.json(
      { error: 'Revalidation failed', details: message },
      { status: 500 }
    );
  }
}
