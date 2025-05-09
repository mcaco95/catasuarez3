'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FC } from 'react';
import { getCloudinaryUrl } from '@/utils/cloudinary';

interface AnimatedButtonProps {
  href: string;
  text: string;
}

// Reusable animated button component
const AnimatedButton: FC<AnimatedButtonProps> = ({ href, text }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay: 1, ease: "easeOut" }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    animate={{
      scale: [1, 1.05, 1],
      y: [0, -4, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: [0.76, 0, 0.24, 1]
      }
    }}
  >
    <Link 
      href={href}
      className="inline-block bg-[#006838] text-white px-6 md:px-8 py-3 rounded-full hover:bg-white hover:text-[#006838] transition-all duration-300 border-2 border-[#006838] hover:-translate-y-1 shadow-[0_4px_12px_rgba(0,104,56,0.15)] hover:shadow-[0_6px_20px_rgba(0,104,56,0.25)] text-sm md:text-base"
    >
      {text}
    </Link>
  </motion.div>
);

const About = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [400, 800], [0, 1]);

  return (
    <motion.section 
      className="relative py-12 md:py-24 bg-white overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Image - Moved to section level */}
      <div className="absolute right-45 top-1/2 -translate-y-1/2 w-[1000px] h-[1000px] -z-10 opacity-30 md:opacity-70">
        <Image
          src={getCloudinaryUrl('/images/background.png')}
          alt="Background Pattern"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 space-y-16 md:space-y-32">
        {/* El Punto de Partida Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* Image Container with 9:16 aspect ratio */}
          <motion.div 
            className="relative w-full md:w-[75%] aspect-[9/16] max-h-[600px] mx-auto order-1 md:order-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src={getCloudinaryUrl('/images/about/about-image.jpg')}
              alt="Cata Suárez en su biblioteca"
              fill
              className="object-cover object-center rounded-lg"
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Decorative circle */}
            <motion.div 
              className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-16 h-16 md:w-24 md:h-24 border-2 border-dashed border-[#006838] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="relative max-w-xl order-2 md:order-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-[2rem] md:text-[2.5rem] leading-tight font-heavy font-futura-pt text-[#006838] mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              Aprender es mi pasión 
              <br />
              y enseñar es mi misión
            </motion.h2>
            


            {/* Information Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <h3 className="text-2xl font-heavy font-futura-pt text-[#98b475] mb-4">
                FORMACIÓN ACADÉMICA
                </h3>
                <p className="font-book font-futura-pt leading-relaxed text-base text-[#2A2A2A]/80">
                Soy psicóloga y Magister en Desarrollo. Amo aprender y nunca he dejado de capacitarme y actualizarme para que mi misión de educadora tenga un gran impacto en todas las personas y grupos con las que trabajo.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-[#98b475] p-8 rounded-xl shadow-[0_4px_20px_rgba(152,180,117,0.3)] transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-2xl font-heavy font-futura-pt text-white mb-4">
                EXPERIENCIA PROFESIONAL
                </h3>
                <p className="font-book font-futura-pt leading-relaxed text-base text-white/90">
                Desde los 19 años estoy trabajando con programas Sociales y educativos de gran alcance. He trabajado en diferentes contextos educativos y sociales, públicos, privados y fundacionales. También fui docente por 6 años de la Maestría en salud mental de la Universidad Pontificia Bolivariana con la cátedra “Promoción en Salud Mental y Prevención de Trastornos Mentales”.
                </p>
              </motion.div>
            </motion.div>

            <div className="mt-12">
              <AnimatedButton href="/sobre-mi" text="Sobre mí" />
            </div>
          </motion.div>
        </div>

        {/* Casos de Éxito Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          <motion.div 
            className="relative max-w-xl md:justify-self-end order-2 md:order-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-[2rem] md:text-[2.5rem] leading-tight font-heavy font-futura-pt text-[#006838] mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              Historias de
              <br />
              Transformación Real
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 mb-4 md:mb-6 text-base md:text-lg font-book font-futura-pt"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              Conoce cómo padres y educadores han transformado sus prácticas y sus relaciones,
              logrando resultados extraordinarios en sus hijos y sus familias.
            </motion.p>
            
            <motion.div
              // Main container for the quote block
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="mt-4 md:mt-6 mb-8 md:mb-12 relative text-center md:text-left" // Adjusted margins, relative for positioning quote marks
            >
              {/* Large decorative opening quotation mark */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }} // Staggered animation
                className="absolute -top-4 left-0 md:-left-3 lg:-left-4 font-serif text-6xl md:text-7xl lg:text-8xl text-[#98b475]/30 select-none z-0 pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </motion.span>
            
              {/* The quote text */}
              <p className="relative z-10 text-xl md:text-2xl lg:text-[1.6rem] font-futura-pt font-book italic text-gray-700 leading-relaxed md:pl-10 lg:pl-12">
                &hellip;el poder de una educación <br className="block sm:hidden" /> {/* Ensures keywords start fresh on small screens */}
                <span className="font-heavy text-[#006838]">consciente</span>,{' '}
                <span className="font-heavy text-[#006838]">positiva</span>{' '}
                y <span className="font-heavy text-[#006838]">amorosa</span>.
              </p>
              
              {/* Large decorative closing quotation mark */}
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }} // Staggered animation
                className="absolute -bottom-5 right-0 md:-right-3 lg:-right-4 font-serif text-6xl md:text-7xl lg:text-8xl text-[#98b475]/30 select-none z-0 pointer-events-none"
                aria-hidden="true"
              >
                &rdquo;
              </motion.span>
            </motion.div>

            <AnimatedButton href="/casos-de-exito" text="Casos de éxito" />
          </motion.div>

          <motion.div 
            className="relative w-full md:w-[75%] aspect-[9/16] max-h-[600px] order-1 md:order-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746648967/25b_celebraci%C3%B3n_grado_ixej6c.jpg"
              alt="Historias de Transformación"
              fill
              className="object-cover object-center rounded-lg"
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-16 h-16 md:w-24 md:h-24 border-2 border-dashed border-[#006838] rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Programas Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          <motion.div 
            className="relative w-full md:w-[75%] aspect-[9/16] max-h-[600px] mx-auto order-1 md:order-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746027795/images/RBS_3467.jpg"
              alt="Nuestros Programas"
              fill
              className="object-cover object-center rounded-lg"
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <motion.div 
              className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-16 h-16 md:w-24 md:h-24 border-2 border-dashed border-[#006838] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <motion.div 
            className="relative max-w-xl order-2 md:order-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-[2rem] md:text-[2.5rem] leading-tight font-heavy font-futura-pt text-[#006838] mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              Programas que
              <br />
              Transforman Vidas
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 mb-4 md:mb-6 text-base md:text-lg font-book font-futura-pt"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              Descubre nuestros programas diseñados para padres,
              madres y educadores comprometidos con el desarrollo
              integral de sus hijos y estudiantes.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 mb-8 md:mb-12 text-base md:text-lg font-book font-futura-pt"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              Metodologías probadas que combinan teoría y práctica
              para resultados transformadores y duraderos.
            </motion.p>

            <AnimatedButton href="/programas" text="Programas" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About; 