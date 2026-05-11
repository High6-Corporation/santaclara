// Schema.org JSON-LD generators for GEO / structured data

const BASE_URL = 'https://santaclaraplywood.com';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Santa Clara Marine Plywood',
    alternateName: 'SMWPI Wood Products Inc.',
    url: BASE_URL,
    logo: `${BASE_URL}/images/santa-clara-logo.png`,
    foundingDate: '1923',
    sameAs: [
      'https://www.facebook.com/SantaClaraPlywood/',
      'https://www.instagram.com/santaclaramarineplywood/',
      'https://www.tiktok.com/@santaclaraplywood',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+63-2-242-5998',
        contactType: 'sales',
        areaServed: 'PH',
        availableLanguage: ['English', 'Filipino'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+63-82-291-0898',
        contactType: 'sales',
        areaServed: 'PH',
        availableLanguage: ['English', 'Filipino'],
      },
    ],
  };
}

export function localBusinessManilaSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Santa Clara Marine Plywood — Manila Office',
    image: `${BASE_URL}/images/santa-clara-logo.png`,
    url: BASE_URL,
    telephone: '+63-2-242-5998',
    email: 'smwpipurchasing@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1824 Tytana Plaza, Plaza Lorenzo Ruiz, Binondo',
      addressLocality: 'Manila',
      addressRegion: 'Metro Manila',
      postalCode: '1000',
      addressCountry: 'PH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 14.6009,
      longitude: 120.9741,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
  };
}

export function localBusinessDavaoSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Santa Clara Marine Plywood — Davao Office',
    image: `${BASE_URL}/images/santa-clara-logo.png`,
    url: BASE_URL,
    telephone: '+63-82-291-0898',
    email: 'smwpipurchasing@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Daliao, Toril',
      addressLocality: 'Davao City',
      addressRegion: 'Davao del Sur',
      addressCountry: 'PH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.0158,
      longitude: 125.5083,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Santa Clara Marine Plywood',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productSchema({
  name,
  description,
  image,
  category,
  url,
}: {
  name: string;
  description: string;
  image: string;
  category: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
    url,
    brand: {
      '@type': 'Brand',
      name: 'Santa Clara Marine Plywood',
    },
    category,
    manufacturer: {
      '@type': 'Organization',
      name: 'SMWPI Wood Products Inc.',
      url: BASE_URL,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PHP',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Santa Clara Marine Plywood',
      },
    },
  };
}
