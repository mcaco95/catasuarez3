'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getCloudinaryUrl } from '@/utils/cloudinary';

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 600], [1, 0]);
  const mobileScale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const [isTouch, setIsTouch] = useState(false);
  const lastScrollY = useSpring(0);

  // Detect touch device
  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  // Track scroll for mobile-specific animations
  useMotionValueEvent(scrollY, "change", (latest) => {
    lastScrollY.set(latest);
  });

  const mobileAnimationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.5
    }
  };

  return (
    <motion.section 
      className="relative min-h-screen w-full overflow-hidden"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Background Image with Mobile Parallax */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          scale: isTouch ? mobileScale : undefined
        }}
      >
        <Image
          src={getCloudinaryUrl('/images/hero/hero-image.png')}
          alt="Cata Suárez"
          fill
          className="object-cover object-[70%_35%] md:object-[center_35%]"
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </motion.div>

      {/* Content Container with Touch-friendly Animations */}
      <div className="relative container mx-auto h-screen flex items-center px-6 md:px-0">
        <div className="text-white max-w-xl md:pl-[8%]">
          <motion.h2 
            {...(isTouch ? mobileAnimationProps : {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 0.4, ease: "easeOut" }
            })}
            className="text-lg md:text-xl font-book font-futura-pt mb-3 md:mb-4 text-[#98b475]"
          >
            Crianza y Educación Positiva
          </motion.h2>
          
          <motion.h1 
            {...(isTouch ? {
              ...mobileAnimationProps,
              transition: {
                ...mobileAnimationProps.transition,
                delay: 0.2
              }
            } : {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 0.6, ease: "easeOut" }
            })}
            className="text-5xl md:text-7xl font-heavy font-futura-pt mb-4 md:mb-6 leading-tight"
          >
            <span className="text-white">CATA</span>
            <br />
            <span className="text-[#98b475]">SUÁREZ</span>
          </motion.h1>
          
          <motion.p 
            {...(isTouch ? {
              ...mobileAnimationProps,
              transition: {
                ...mobileAnimationProps.transition,
                delay: 0.4
              }
            } : {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 0.8, ease: "easeOut" }
            })}
            className="text-base md:text-lg font-book font-futura-pt leading-relaxed text-white/90 max-w-[90%] md:max-w-full mb-8"
          >
            <span className="text-[#98b475] font-semibold">El punto de partida de un educador 
            exitoso comienza consigo mismo.</span>{' '}
            Quiero mostrarte diferentes <strong>caminos</strong> y guiarte para que te conviertas en un{' '}
            <strong>padre</strong>, <strong>madre</strong>, <strong>cuidador</strong> o{' '}
            <strong>maestro</strong> realmente <span className="text-[#98b475] font-semibold">transformador</span>.
            Aquel que <strong>conecta</strong>, <strong>inspira</strong> y deja{' '}
            <strong>huellas profundas</strong> en sus hijos y estudiantes.
          </motion.p>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      {isTouch && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <motion.div
              className="w-1 h-2 bg-white/80 rounded-full"
              animate={{
                y: [0, 4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </motion.div>
          <motion.span
            className="text-white/60 text-sm mt-2 font-futura-pt font-book"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            Desliza hacia abajo
          </motion.span>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Hero; 