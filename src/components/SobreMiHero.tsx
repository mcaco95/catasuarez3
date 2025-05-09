'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { getCloudinaryUrl } from '@/utils/cloudinary';

const SobreMiHero = () => {
  const { scrollY } = useScroll();
  
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    mass: 1
  });

  const opacity = useTransform(smoothScrollY, [0, 800], [1, 0]);
  const y = useTransform(smoothScrollY, [0, 800], [0, 200]);

  return (
    <motion.section
      className="relative min-h-[90vh] md:min-h-screen w-full overflow-hidden"
      style={{ opacity }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src={getCloudinaryUrl('/images/5.png')}
          alt="Cata Suarez Background"
          fill
          className="object-cover object-[80%_40%] md:object-[center_40%] scale-110"
          quality={100}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative container mx-auto min-h-[90vh] md:min-h-screen flex flex-col justify-start px-6 md:px-12 lg:px-16 pt-32 md:pt-40">
        <motion.div 
          className="max-w-[900px] text-white h-full flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Small Title */}
          <motion.div
            className="overflow-hidden mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <p className="text-white/90 font-futura-pt font-book tracking-[0.2em] uppercase text-xs md:text-sm">
              Sobre Mí
            </p>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            className="flex justify-end mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="max-w-full md:max-w-[500px] pl-4 md:pl-6 border-l-2 border-[#98B475] ml-0 md:ml-[50px]">
              <p className="text-lg md:text-2xl lg:text-3xl font-heavy font-futura-pt leading-tight text-[#98B475]">
                &ldquo;Siempre, siempre, siempre me ha gustado trabajar por la gente y con la gente.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-8 md:space-y-10 max-w-[650px] pb-24 md:pb-32 lg:pb-40 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent backdrop-blur-[1px] md:hidden" />
            <motion.div
              className="max-w-full relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heavy font-futura-pt text-white leading-tight mb-4 md:mb-6 px-4 md:px-0">
               
                <br />
                <span className="text-[#98B475] drop-shadow-sm"></span>
              </h2>
              <p className="font-book font-futura-pt leading-relaxed text-base md:text-lg text-white px-4 md:px-0 drop-shadow-sm">
                
              </p>
            </motion.div>

            <motion.div
              className="max-w-full relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-heavy font-futura-pt mb-4 md:mb-6 text-[#5C8A3F] px-4 md:px-0 drop-shadow-sm">
                Un camino misional
              </h3>
              <div className="space-y-4 md:space-y-6">
                <p className="font-book font-futura-pt leading-relaxed text-base md:text-lg text-white px-4 md:px-0 drop-shadow-sm">
                  A los 19 años, <strong className="text-[#5C8A3F]">fui voluntaria</strong> por un año de un proyecto social y educativo en el centro de México.
                </p>
                <p className="font-book font-futura-pt leading-relaxed text-base md:text-lg text-white px-4 md:px-0 drop-shadow-sm">
                  <strong className="text-[#5C8A3F]">Trabajé como psicóloga</strong> del colegio Vermont de Medellín y con la Presidencia de Colombia en programas de desarrollo alternativo.
                </p>
                <p className="font-book font-futura-pt leading-relaxed text-base md:text-lg text-white px-4 md:px-0 drop-shadow-sm">
                  Para el Gobierno de Colombia <strong className="text-[#5C8A3F]">desarrollé programas para la promoción de la cultura de la legalidad</strong> dirigidos hacia grupos de campesinos, indígenas y afrodescendientes involucrados en el negocio de las drogas ilícitas.
                </p>
                <p className="font-book font-futura-pt leading-relaxed text-base md:text-lg text-white px-4 md:px-0 drop-shadow-sm">
                  Luego volví a la educación y <strong className="text-[#5C8A3F]">trabajé con fundaciones</strong> para la promoción de la primera infancia.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SobreMiHero; 