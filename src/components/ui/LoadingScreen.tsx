'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onLoadingComplete, 2500);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#2A2A2A] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex flex-col items-center">
        {/* Breathing circle background */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-[#80b0ab]/30"
          style={{ top: '-50%', transform: 'translateY(50%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Secondary breathing circle */}
        <motion.div
          className="absolute w-[250px] h-[250px] rounded-full bg-[#006838]/20"
          style={{ top: '-50%', transform: 'translateY(50%)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.5,
          }}
        />

        {/* Main text */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1 
            className="text-white text-6xl font-heavy font-futura-pt tracking-wider"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            Cata Suárez
          </motion.h1>
          <motion.p
            className="text-white/60 mt-4 font-futura-pt font-book tracking-[0.2em] uppercase text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Psicóloga. Crianza y educación positiva.
          </motion.p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-[-60px] w-[160px] h-[2px] bg-[#98B475] shadow-[0_0_10px_#98B475] rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 160, opacity: 0.85 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 