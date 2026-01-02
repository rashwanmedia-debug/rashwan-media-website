import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/components/ui/Logo';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isRTL = router.locale === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navigation = [
    { name: isRTL ? 'الرئيسية' : 'Home', href: '/' },
    { name: isRTL ? 'الخدمات' : 'Services', href: '/services' },
    { name: isRTL ? 'أعمالنا' : 'Work', href: '/work' },
    { name: isRTL ? 'مقالات' : 'Insights', href: '/insights' },
    { name: isRTL ? 'من نحن' : 'About', href: '/about' },
  ];

  const toggleLocale = () => {
    const newLocale = router.locale === 'ar' ? 'en' : 'ar';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Logo variant="wordmark" size={160} priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand-accent',
                  router.pathname === item.href
                    ? 'text-brand-primary'
                    : 'text-brand-text'
                )}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-2 text-sm font-medium text-brand-text hover:text-brand-accent transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              {isRTL ? 'EN' : 'عر'}
            </button>
            <Link
              href="/start-project"
              className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-deep transition-colors"
            >
              {isRTL ? 'ابدأ مشروعك' : 'Start Project'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brand-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-base font-medium transition-colors',
                    router.pathname === item.href
                      ? 'text-brand-primary'
                      : 'text-brand-text'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 text-base font-medium text-brand-text"
              >
                <Globe size={18} />
                {isRTL ? 'English' : 'عربي'}
              </button>
              <Link
                href="/start-project"
                className="bg-brand-primary text-white px-6 py-3 rounded-lg text-center hover:bg-brand-deep transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isRTL ? 'ابدأ مشروعك' : 'Start Project'}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;