'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { brandMetrics, brandInfo } from '@/config/brand';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';

const Hero: React.FC = () => {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const countersRef = useRef<HTMLDivElement>(null);
  const isCountersInView = useInView(countersRef, { once: true });

  useEffect(() => {
    setMounted(true);
  }, []);

  const headline = isRTL
    ? 'أنا Rashwan — أبني أنظمة إعلانية بتجيب أرباح حقيقية'
    : 'I\'m Rashwan — Building advertising systems that deliver real profits';

  const subtitle = isRTL ? brandInfo.taglineAr : brandInfo.tagline;

  const counters = [
    {
      icon: TrendingUp,
      value: brandMetrics.roiAverage,
      suffix: '%',
      label: isRTL ? 'متوسط ROI' : 'Avg ROI',
    },
    {
      icon: Target,
      value: brandMetrics.projectsCompleted,
      suffix: '+',
      label: isRTL ? 'مشروع منجز' : 'Projects',
    },
    {
      icon: Users,
      value: brandMetrics.clientsSatisfied,
      suffix: '+',
      label: isRTL ? 'عميل راض' : 'Clients',
    },
  ];

  const animationVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.15,
          delayChildren: shouldReduceMotion ? 0 : 0.2,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.01 : 0.6,
          ease: 'easeOut',
        },
      },
    },
    logo: {
      hidden: { scale: shouldReduceMotion ? 1 : 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: shouldReduceMotion ? 0.01 : 0.8,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-deep to-brand-primary">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-deep via-brand-primary to-brand-accent"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: shouldReduceMotion ? '0% 0%' : ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(77, 108, 255, 0.3) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            variants={animationVariants.container}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            <motion.h1
              variants={animationVariants.item}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={animationVariants.item}
              className="text-xl md:text-2xl mb-8 text-gray-100 font-medium"
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={animationVariants.item}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/start-project"
                className="group inline-flex items-center justify-center gap-2 bg-white text-brand-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {isRTL ? 'ابدأ مشروعك' : 'Start Your Project'}
                <ArrowRight
                  size={20}
                  className={`group-hover:translate-x-1 transition-transform ${
                    isRTL ? 'rotate-180' : ''
                  }`}
                />
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-brand-primary transition-all duration-300"
              >
                {isRTL ? 'شاهد أعمالنا' : 'View Our Work'}
              </Link>
            </motion.div>

            {/* Counters */}
            <motion.div
              ref={countersRef}
              variants={animationVariants.item}
              className="grid grid-cols-3 gap-6"
            >
              {counters.map((counter, index) => (
                <CounterCard
                  key={index}
                  {...counter}
                  isInView={isCountersInView}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Logo Avatar */}
          <motion.div
            variants={animationVariants.logo}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: shouldReduceMotion ? 0 : [0, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-accent to-white opacity-20 blur-3xl"
                style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }}
              />
              <div className="relative rounded-full overflow-hidden shadow-2xl">
                <Logo variant="avatar" size={300} priority />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface CounterCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: number;
  suffix: string;
  label: string;
  isInView: boolean;
  shouldReduceMotion: boolean | null;
}

const CounterCard: React.FC<CounterCardProps> = ({
  icon: Icon,
  value,
  suffix,
  label,
  isInView,
  shouldReduceMotion,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setCount(value);
      return;
    }

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300">
      <Icon size={24} className="mx-auto mb-2 text-white" />
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-gray-200">{label}</div>
    </div>
  );
};

export default Hero;