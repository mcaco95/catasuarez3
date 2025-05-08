'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getCloudinaryUrl } from '@/utils/cloudinary';

const SobreMiHero = () => {
  const { scrollY } = useScroll();
  
  // Gentler spring physics
  // const smoothScrollY = useSpring(scrollY, {
  //   stiffness: 50,
  //   damping: 20,
  //   mass: 1
  // });

  // Reduced slide distance and increased scroll range for smoother transitions
  // const opacity = useTransform(smoothScrollY, [0, 1000], [1, 0]);
  // const x = useTransform(smoothScrollY, [0, 1000], [0, -300]);

  // --- Mobile Specific Logic ---
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
  // --- End Mobile Specific Logic ---

  return (
    <motion.section
      className="relative min-h-screen w-full overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: isTouch ? mobileScale : undefined
        }}
      >
        <Image
          src={getCloudinaryUrl('/images/5.png')}
          alt="Cata Suarez Background"
          fill
          className="object-cover object-[70%_35%] md:object-[center_40%]"
          quality={90}
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="relative container mx-auto px-6 md:pl-[8%] md:pr-[20%] h-screen flex flex-col justify-center">
        <motion.div 
          className="max-w-5xl text-white"
        >
          <motion.div
            className="mb-8 md:mb-12"
            {...(isTouch ? mobileAnimationProps : {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.2 }
            })}
          >
            <motion.div 
              className="h-0.5 w-16 md:w-24 bg-[#98B475] mb-4 md:mb-6"
              initial={{ width: 0 }}
              animate={{ width: isTouch ? 64 : 96 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <h1 className="text-5xl md:text-7xl font-heavy font-futura-pt leading-tight">
              Mi Historia
            </h1>
          </motion.div>

          <motion.div
            className="mb-8 md:mb-12"
            {...(isTouch ? { ...mobileAnimationProps, transition: { ...mobileAnimationProps.transition, delay: 0.2 } } : {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.4 }
            })}
          >
            <p className="text-xl md:text-3xl font-heavy font-futura-pt leading-tight mb-2">
              &ldquo;Siempre, siempre, siempre me ha gustado trabajar por la gente y con la gente.&rdquo;
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <motion.div
              {...(isTouch ? { ...mobileAnimationProps, transition: { ...mobileAnimationProps.transition, delay: 0.4 } } : {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8, delay: 0.6 }
              })}
              className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-full md:max-w-sm mx-auto"
            >
              <Image
                src={getCloudinaryUrl('/IMG_1980_jkklvm.jpg')}
                alt="Cata Suárez en su biblioteca"
                fill
                className="object-cover rounded-lg"
                quality={90}
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </motion.div>

            <motion.div
              className="space-y-6 md:space-y-8"
              {...(isTouch ? { ...mobileAnimationProps, transition: { ...mobileAnimationProps.transition, delay: 0.6 } } : {
                initial: { opacity: 0, x: 20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8, delay: 0.8 }
              })}
            >
              <div>
                <h2 className="text-xl md:text-2xl font-heavy font-futura-pt mb-3 md:mb-4">
                  Un camino misional
                </h2>
                <p className="font-book font-futura-pt leading-relaxed text-sm md:text-base text-white/90">
                  A los 19 años fui voluntaria por un año de un proyecto social y educativo en el centro de México. Trabajé como psicóloga del colegio Vermont de Medellín y con la Presidencia de Colombia en programas de desarrollo alternativo, con grupos de campesinos, indígenas y afrodescendientes involucrados en el negocio de las drogas ilícitas. Luego volví a la educación y trabajé con fundaciones para la promoción de la primera infancia.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-heavy font-futura-pt mb-3 md:mb-4">
                  El día que mi vida cambió
                </h2>
                <p className="font-book font-futura-pt leading-relaxed text-sm md:text-base text-white/90">
                  Cuando nació mi hijo sietemesino, con varios retos en su desarrollo motor, descubrí que mi gran misión es enseñar a padres y maestros la magia de educar amorosa y efectivamente y me comprometí con esta gran labor de trabajar para prevenir los malos tratos a la infancia y la adolescencia y cambiar los modelos.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
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
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <motion.div
              className="w-1 h-2 bg-white/80 rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
          </motion.div>
          <motion.span
            className="text-white/60 text-xs md:text-sm mt-2 font-futura-pt font-book"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          >
            Desliza hacia abajo
          </motion.span>
        </motion.div>
      )}
    </motion.section>
  );
};

export default SobreMiHero; 