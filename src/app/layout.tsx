'use client';

import './globals.css';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getCloudinaryUrl } from '@/utils/cloudinary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowIntro, setShouldShowIntro] = useState(false);
  
  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const logoY = useTransform(scrollY, [0, 100], [0, 5]);
  const logoOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check localStorage only after component is mounted
  useEffect(() => {
    if (mounted && pathname === '/') {
      const lastVisitTime = localStorage.getItem('lastIntroTime');
      const now = Date.now();
      const thirtySecondsInMs = 30 * 1000;

      const shouldShow = !lastVisitTime || (now - parseInt(lastVisitTime)) > thirtySecondsInMs;
      
      if (shouldShow) {
        localStorage.setItem('lastIntroTime', now.toString());
        setShouldShowIntro(true);
        setIsLoading(true);
      }
    }
  }, [mounted, pathname]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <body suppressHydrationWarning className="bg-[#2A2A2A] overflow-x-hidden w-full">
        {mounted && (
          <>
            <AnimatePresence mode="wait">
              {shouldShowIntro && isLoading && pathname === '/' && (
                <LoadingScreen onLoadingComplete={handleLoadingComplete} />
              )}
            </AnimatePresence>

            <div 
              className="relative min-h-screen bg-[#2A2A2A] flex flex-col w-full overflow-hidden"
              style={{ 
                opacity: (shouldShowIntro && isLoading && pathname === '/') ? 0 : 1,
                visibility: (shouldShowIntro && isLoading && pathname === '/') ? 'hidden' : 'visible',
                transition: 'opacity 0.5s ease-in-out',
              }}
            >
              <motion.div 
                className="fixed top-0 left-[8%] z-50 w-[120px] h-[120px] md:block hidden"
                style={{
                  scale: logoScale,
                  y: logoY,
                  opacity: logoOpacity,
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
              >
                <Link href="/" className="block w-full h-full relative group">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-[#006838]/20 rounded-full blur-xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Logo image */}
                  <Image
                    src={getCloudinaryUrl('/images/logo.png')}
                    alt="Cata Suárez Logo"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,104,56,0.3)]"
                    priority
                  />
                  
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#006838]/0 via-[#98B475]/10 to-[#006838]/0 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                  />
                </Link>
              </motion.div>

              {/* Mobile Logo */}
              <div className="md:hidden fixed top-2 left-4 z-50 w-[60px] h-[60px]">
                <Link href="/" className="block w-full h-full relative">
                  <Image
                    src={getCloudinaryUrl('/images/logo.png')}
                    alt="Cata Suárez Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>

              <Navigation />
              
              <main className="flex-grow w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <div key={pathname} className="w-full">
                    {children}
                  </div>
                </AnimatePresence>
              </main>

              <Footer />
            </div>
          </>
        )}
      </body>
    </html>
  );
}
