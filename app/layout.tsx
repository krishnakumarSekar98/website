import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Poppins } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';
import { openingHoursSpec } from '@/lib/hours';
import ScrollProgress from '@/components/ScrollProgress';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Muscle Fitness Studio | Best Gym in Saidapet, Chennai',
  description:
    'Muscle Fitness Studio is a premium gym in Saidapet, Chennai offering strength training, weight loss, muscle building, personal training and diet guidance. Open from 5 AM, 7 days a week.',
  keywords: [
    'gym in Saidapet',
    'fitness centre Chennai',
    'weight loss gym Saidapet',
    'personal trainer Chennai',
    'Muscle Fitness Studio',
    'best gym Saidapet Chennai',
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: 'Muscle Fitness Studio | Best Gym in Saidapet, Chennai',
    description:
      "Saidapet's premium fitness destination. Modern equipment, certified trainers, flexible early-morning timings and affordable plans.",
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muscle Fitness Studio | Best Gym in Saidapet, Chennai',
    description: "Saidapet's premium fitness destination. Open 7 days a week from 5 AM.",
    images: ['/images/hero.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#2A2620',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  '@id': `${site.url}/#gym`,
  name: site.name,
  alternateName: site.shortName,
  description: site.description,
  url: site.url,
  telephone: site.phoneRaw,
  email: site.email,
  image: `${site.url}/images/hero.jpg`,
  logo: `${site.url}/images/logo.webp`,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: 'Saidapet, Chennai',
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: 13.0213, longitude: 80.2231 }, // TODO: verify exact coordinates
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'Place', name: 'Saidapet' },
    { '@type': 'Place', name: 'Guindy' },
    { '@type': 'Place', name: 'T. Nagar' },
  ],
  hasMap: site.maps.directions,
  openingHoursSpecification: openingHoursSpec(),
  sameAs: Object.values(site.socials).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${poppins.variable}`}>
      <body className="grain">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-page"
        >
          Skip to content
        </a>
        <ScrollProgress />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
