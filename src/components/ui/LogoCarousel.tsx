'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { getCloudinaryUrl } from '@/utils/cloudinary';

const logos = [
  {
    src: getCloudinaryUrl('/images/education/antioquia-logo.png'),
    alt: 'Universidad de Antioquia',
    width: 180,
    height: 300
  },
  {
    src: getCloudinaryUrl('/images/education/berkeley-logo.png'),
    alt: 'UC Berkeley',
    width: 180
  },
  {
    src: getCloudinaryUrl('/images/education/mit-harvard-club.jpeg'),
    alt: 'MIT Harvard Club',
    width: 200
  },
  {
    src: getCloudinaryUrl('/images/education/nlp-logo.png'),
    alt: 'NLP',
    width: 180
  },
  {
    src: 'https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746030040/pda_uqefb6.png',
    alt: 'PDA',
    width: 180
  },
  {
    src: getCloudinaryUrl('/images/education/triple-p-logo.jpg'),
    alt: 'Triple P International',
    width: 200
  },
  {
    src: getCloudinaryUrl('/images/education/upb-logo.png'),
    alt: 'Universidad Pontificia Bolivariana',
    width: 180
  },
  {
    src: getCloudinaryUrl('/images/education/uq-logo.png'),
    alt: 'Universidad de Queensland',
    width: 180
  }
];

export default function LogoCarousel() {
  const [duplicatedLogos, setDuplicatedLogos] = useState(logos);
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const lastDragPosition = useRef(0);

  useEffect(() => {
    setDuplicatedLogos([...logos, ...logos, ...logos, ...logos]);
  }, []);

  useEffect(() => {
    if (!isDragging && autoScrollEnabled) {
      controls.start({
        x: [currentX, currentX - window.innerWidth],
        transition: {
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          },
        },
      });
    }

    return () => {
      controls.stop();
    };
  }, [controls, isDragging, autoScrollEnabled, currentX]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setAutoScrollEnabled(false);
    controls.stop();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    lastDragPosition.current = currentX;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      setAutoScrollEnabled(true);
    }, 50);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - startX;
    const newX = lastDragPosition.current + delta;
    
    setCurrentX(newX);
    controls.set({ x: newX });
  };

  return (
    <div className="w-full relative py-1 md:py-2 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/95 before:to-white/80 before:backdrop-blur-sm">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006838' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }} />
      
      {/* Decorative Circles */}
      <div className="absolute left-0 top-0 w-32 h-32 bg-[#98B475]/5 rounded-full -translate-x-16 -translate-y-16" />
      <div className="absolute right-0 bottom-0 w-40 h-40 bg-[#006838]/5 rounded-full translate-x-20 translate-y-20" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="max-w-3xl mx-auto mb-1 md:mb-2 mt-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center relative"
          >
            <span className="block text-[#98B475] font-futura-pt text-sm tracking-[0.2em] uppercase mb-0.5 font-medium">
              Formación Académica
            </span>
            <span className="block text-2xl md:text-3xl font-futura-pt font-light tracking-wide text-[#1A1A1A] leading-tight">
              Formación e Instituciones
              <motion.div
                className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#98B475]/0 via-[#98B475] to-[#98B475]/0"
                initial={{ width: 0, x: '-50%' }}
                whileInView={{ width: '80%', x: '-40%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-[#4A4A4A] mt-1 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed"
          >
            Instituciones y centros educativos que han contribuido a mi formación profesional
          </motion.p>
        </div>

        <div 
          ref={carouselRef}
          className="relative -mx-4 md:-mx-8 overflow-hidden touch-pan-x backdrop-blur-[2px]"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onMouseMove={(e) => handleDragMove(e)}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onTouchMove={(e) => handleDragMove(e)}
        >
          <motion.div
            className="flex items-center gap-4 md:gap-8 py-0.5 md:py-1"
            animate={controls}
            style={{
              width: 'fit-content',
              touchAction: 'pan-x',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 relative transition-all duration-300 ${
                  isDragging ? 'grayscale-0' : 'grayscale hover:grayscale-0'
                } backdrop-blur-sm bg-white/30 rounded-lg p-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  style={{ 
                    width: logo.width * 0.8,
                    height: logo.height ? logo.height * 0.8 : 60,
                    position: 'relative'
                  }}
                  className="md:scale-100 scale-90"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Hint */}
        <motion.div 
          className="md:hidden text-center mt-1 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Desliza para ver más →
        </motion.div>
      </div>
    </div>
  );
} 