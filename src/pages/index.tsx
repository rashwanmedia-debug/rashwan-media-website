import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';
import { seoDefaults, brandInfo } from '@/config/brand';

// Import Hero as client-only to avoid SSR issues
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-deep to-brand-primary">
      <div className="animate-pulse text-white text-xl">Loading...</div>
    </div>
  ),
});

interface HomeProps {
  locale: string;
}

const Home: React.FC<HomeProps> = ({ locale }) => {
  const isRTL = locale === 'ar';
  const title = seoDefaults.title;
  const description = seoDefaults.description;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brandInfo.name,
    url: 'https://rashwan.media',
    logo: 'https://rashwan.media/assets/logo.svg',
    description: isRTL ? brandInfo.descriptionAr : brandInfo.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: brandInfo.address,
    },
    sameAs: [
      brandInfo.social.facebook,
      brandInfo.social.instagram,
      brandInfo.social.linkedin,
      brandInfo.social.twitter,
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={seoDefaults.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={seoDefaults.ogImage} />
        <meta property="og:url" content="https://rashwan.media" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={seoDefaults.ogImage} />
        <meta name="twitter:site" content={seoDefaults.twitterHandle} />
        
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <ErrorBoundary
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-deep to-brand-primary text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                {isRTL ? 'أنا Rashwan' : 'I\'m Rashwan'}
              </h1>
              <p className="text-xl">
                {isRTL ? brandInfo.descriptionAr : brandInfo.description}
              </p>
            </div>
          </div>
        }
      >
        <Hero />
      </ErrorBoundary>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      locale: locale || 'ar',
    },
  };
};

export default Home;