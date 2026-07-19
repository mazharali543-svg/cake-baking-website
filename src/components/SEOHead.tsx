/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useSiteContent } from '../lib/cmsStore';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  pageUrl?: string;
}

export default function SEOHead({
  title,
  description,
  keywords = ['homemade cakes', 'custom cakes', 'birthday cake near me', 'wedding cake delivery', 'cupcakes', 'Thecakebake'],
  pageUrl = 'https://thecakebake.com',
}: SEOHeadProps) {
  const { content } = useSiteContent();

  useEffect(() => {
    // 1. Update Document Title
    document.title = `${title} | Thecakebake - Freshly Baked with Love`;

    // 2. Manage standard Meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));

    // 3. Open Graph Tags
    updateMetaTag('og:title', `${title} | Thecakebake`, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', pageUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:image', 'https://thecakebake.com/assets/og-image.jpg', true);

    // 4. Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', `${title} | Thecakebake`);
    updateMetaTag('twitter:description', description);

    // 5. Schema.org JSON-LD Local Business Markup
    const schemaId = 'thecakebake-local-business-schema';
    let scriptEl = document.getElementById(schemaId) as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'Bakery',
      'name': 'Thecakebake',
      'image': 'https://thecakebake.com/assets/hero-cake.jpg',
      '@id': 'https://thecakebake.com/#bakery',
      'url': 'https://thecakebake.com',
      'priceRange': '$$',
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:00',
          'closes': '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Sunday',
          'opens': '10:00',
          'closes': '18:00',
        }
      ],
      'sameAs': [
        content.facebookUrl,
        content.instagramUrl,
      ],
    };

    scriptEl.textContent = JSON.stringify(localBusinessSchema, null, 2);

    // Clean up or log analytics tags initialized
    console.log('SEO metadata and Schema.org markup updated for page:', title);
  }, [title, description, keywords, pageUrl, content.facebookUrl, content.instagramUrl]);

  return null;
}

// Helper to find or create meta tags
function updateMetaTag(name: string, content: string, isProperty = false) {
  const attrName = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attrName}="${name}"]`);
  
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, name);
    document.head.appendChild(el);
  }
  
  el.setAttribute('content', content);
}
