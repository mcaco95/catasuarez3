'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { getCloudinaryUrl } from '@/utils/cloudinary';

const SobreMiInfo = () => {
  const { scrollY } = useScroll();
  
  // Gentler spring physics
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    mass: 1
  });

  // Reduced slide distance and increased scroll range for smoother transitions
  const opacity = useTransform(smoothScrollY, [600, 1000], [0, 1]);
  const x = useTransform(smoothScrollY, [600, 1000], [300, 0]);

  return (
    <motion.section
      className="relative min-h-screen w-full bg-[#D3DCCA]"
      style={{ opacity, x }}
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="container mx-auto min-h-screen flex items-center py-24">
        <motion.div 
          className="w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {/* Image Container with overlaid text */}
          <motion.div
            className="relative aspect-[21/9] w-full rounded-lg overflow-hidden bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={getCloudinaryUrl('/images/2.png')}
              alt="Sobre Mi Info"
              fill
              className="object-cover scale-x-[-1] object-[center_20%]"
              quality={100}
              sizes="90vw"
            />
            
            {/* Text Content overlaid on the white part of the image */}
            <motion.div
              className="absolute top-0 right-0 w-[45%] h-full pr-[8%] py-16 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl font-heavy font-futura-pt mb-4 text-[#006838]">
                  Formación Académica
                </h2>
                <p className="font-book font-futura-pt leading-relaxed text-base text-[#2A2A2A]">
                  Soy psicóloga con una Maestría en Desarrollo de la Universidad Pontificia Bolivariana de Medellín.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-heavy font-futura-pt mb-4 text-[#006838]">
                  Certificaciones Internacionales
                </h2>
                <p className="font-book font-futura-pt leading-relaxed text-base text-[#2A2A2A]">
                  Estoy certificada en el Programa de Parentalidad Positiva de la Universidad de Queensland (Australia), un método reconocido a nivel mundial por su eficacia en la prevención de trastornos de conducta.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-heavy font-futura-pt mb-4 text-[#006838]">
                  Experiencia profesional
                </h2>
                <p className="font-book font-futura-pt leading-relaxed text-base text-[#2A2A2A]">
                  Mi trayectoria incluye roles como psicóloga educativa en el colegio Vermont de Medellín y colaboración con la Presidencia de Colombia en programas de desarrollo alternativo, apoyando a comunidades campesinas, indígenas y afrodescendientes.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-heavy font-futura-pt mb-4 text-[#006838]">
                  Compromiso Social
                </h2>
                <p className="font-book font-futura-pt leading-relaxed text-base text-[#2A2A2A]">
                  Mi vocación por la educación me llevó a trabajar con fundaciones para la promoción de la primera infancia, impulsando el bienestar y el aprendizaje en los primeros años de vida.
                </p>
              </div>
            </motion.div>

            {/* Decorative circle - Aligned with the bottom right corner */}
            <motion.div 
              className="absolute bottom-0 right-0 mb-4 mr-4 w-24 h-24 border-2 border-dashed border-[#006838] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SobreMiInfo; 