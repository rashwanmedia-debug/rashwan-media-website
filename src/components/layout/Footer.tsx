import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/components/ui/Logo';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone } from 'lucide-react';
import { brandInfo } from '@/config/brand';

const Footer: React.FC = () => {
  const router = useRouter();
  const isRTL = router.locale === 'ar';

  const footerLinks = {
    company: {
      title: isRTL ? 'الشركة' : 'Company',
      links: [
        { name: isRTL ? 'من نحن' : 'About', href: '/about' },
        { name: isRTL ? 'الخدمات' : 'Services', href: '/services' },
        { name: isRTL ? 'أعمالنا' : 'Work', href: '/work' },
        { name: isRTL ? 'مقالات' : 'Insights', href: '/insights' },
      ],
    },
    legal: {
      title: isRTL ? 'قانوني' : 'Legal',
      links: [
        { name: isRTL ? 'سياسة الخصوصية' : 'Privacy Policy', href: '/privacy' },
        { name: isRTL ? 'شروط الخدمة' : 'Terms of Service', href: '/terms' },
      ],
    },
  };

  const socialLinks = [
    { icon: Facebook, href: brandInfo.social.facebook, label: 'Facebook' },
    { icon: Instagram, href: brandInfo.social.instagram, label: 'Instagram' },
    { icon: Linkedin, href: brandInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: brandInfo.social.twitter, label: 'Twitter' },
  ];

  return (
    <footer className="bg-brand-deep text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Logo variant="monochrome" size={180} className="mb-4 invert" />
            <p className="text-gray-300 mb-4">
              {isRTL ? brandInfo.descriptionAr : brandInfo.description}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-4">{footerLinks.company.title}</h3>
            <ul className="space-y-2">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">
              {isRTL ? 'تواصل معنا' : 'Contact'}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${brandInfo.email}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail size={16} />
                  {brandInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brandInfo.phone}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  {brandInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} {brandInfo.name}. {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
          </p>
          <div className="flex gap-4">
            {footerLinks.legal.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;