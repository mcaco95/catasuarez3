'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import LogoCarousel from './ui/LogoCarousel';
import { getCloudinaryUrl } from '@/utils/cloudinary';

const SobreMiEducation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Hero parallax effects
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);

  // Configuration variables for easy adjustment
  const heroConfig = {
    height: "40vh",
    mobileHeight: "50vh",
    desktopHeight: "60vh",
    imagePosition: "15% 34%"
  };

  return (
    <motion.section
      ref={sectionRef}
      id="education"
      className="relative w-full bg-[#F8FAF5] pt-8 md:pt-12 overflow-hidden"
    >
      {/* Hero Section - Shorter height */}
      <motion.div 
        ref={heroRef}
        className="relative mb-12"
        style={{ 
          height: `min(${heroConfig.mobileHeight}, ${heroConfig.desktopHeight})`,
          scale: heroScale,
          y: heroY,
          opacity: heroOpacity
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={getCloudinaryUrl('/images/RBS_3576.jpg')}
            alt="Education Hero"
            fill
            className="object-cover transform -scale-x-100"
            style={{ objectPosition: heroConfig.imagePosition }}
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          
          <div className="absolute inset-0 container mx-auto px-4 md:px-6 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="ml-0 md:ml-auto max-w-[90%] md:max-w-2xl"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heavy font-futura-pt mb-4 text-white">
                Formación académica
              </h2>
              <p className="text-xl md:text-2xl font-book font-futura-pt italic text-[#98b475] leading-snug relative pl-8 pr-4 py-4 my-4 border-l-4 border-[#98b475] bg-[#F8FAF5]/10 rounded-r-lg">
                <span className="absolute -left-0 top-0 text-6xl text-[#98b475]/70 font-serif select-none leading-none">&quot;</span>
                La educación puede verse como un derecho, un valor, una ciencia y muchas
                cosas más. Para mí es el arma más poderosa para transformar al mundo.
                <span className="absolute -right-1 bottom-0 text-6xl text-[#98b475]/70 font-serif select-none leading-none">&quot;</span>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Unified Main Heading */}
        <motion.h2 
          className="text-3xl md:text-4xl font-heavy font-futura-pt text-[#006838] mb-12 text-center relative inline-block left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Formación Académica y Certificaciones
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-[#98B475] mx-auto w-1/3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.h2>

        {/* MODIFIED: Changed back to 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-8">
          
          {/* Card 1: UPB */}
          <motion.div
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-[#006838] hover:border-l-[#98b475] h-full flex flex-col transition-all duration-300 ease-out"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <div className="p-6 md:p-8 relative flex-grow hover:bg-gray-50/50 transition-colors duration-300 ease-out">
              <div className="flex items-start mb-4">                       
                <div className="flex-shrink-0 w-20 h-16 md:w-24 md:h-20 flex items-center justify-center mr-4 relative group-hover:scale-105 transition-transform duration-300">
                  <Image src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746026940/images/education/upb-logo.png" alt="Universidad Pontificia Bolivariana Logo" fill className="object-contain" />
                </div>
                <h4 className="text-xl font-bold font-futura-pt text-[#006838] group-hover:text-[#98b475] transition-colors duration-300 self-center">
                  UNIVERSIDAD PONTIFICIA BOLIVARIANA - Colombia
                </h4>
              </div>
              <ul className="font-book font-futura-pt text-base text-[#2A2A2A]/80 list-disc pl-5 space-y-1">
                <li>Psicóloga</li>
                <li>Magister en Desarrollo</li>
              </ul>
            </div>
          </motion.div>

          {/* Card 2: PDA */}
          <motion.div 
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-[#006838] hover:border-l-[#98b475] h-full flex flex-col transition-all duration-300 ease-out"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <div className="p-6 md:p-8 relative flex-grow hover:bg-gray-50/50 transition-colors duration-300 ease-out">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-20 h-16 md:w-24 md:h-20 flex items-center justify-center mr-4 relative group-hover:scale-105 transition-transform duration-300">
                  <Image src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746030040/pda_uqefb6.png" alt="Asociación Americana de Disciplina Positiva Logo" fill className="object-contain" />
                </div>
                <h4 className="text-xl font-bold font-futura-pt text-[#006838] group-hover:text-[#98b475] transition-colors duration-300 self-center">
                  ASOCIACIÓN AMERICANA DE DISCIPLINA POSITIVA - USA
                </h4>
              </div>
              <ul className="font-book font-futura-pt text-base text-[#2A2A2A]/80 list-disc pl-5 space-y-1">
                <li>Educadora en Disciplina Parental Positiva</li>
                <li>Educadora de Disciplina Positiva en el Aula</li>
                <li>Educador de Disciplina Positiva para la Primera Infancia</li>
                <li>Educador de Disciplina Positiva para Organizaciones</li>
              </ul>
            </div>
          </motion.div>

          {/* Card 3: Berkeley/Additional */}
          <motion.div 
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-[#006838] hover:border-l-[#98b475] h-full flex flex-col transition-all duration-300 ease-out"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <div className="p-6 md:p-8 relative flex-grow hover:bg-gray-50/50 transition-colors duration-300 ease-out">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-20 h-16 md:w-24 md:h-20 flex items-center justify-center mr-4 relative group-hover:scale-105 transition-transform duration-300">
                  <Image src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746026934/images/education/berkeley-logo.png" alt="Universidad de Berkeley Logo" fill className="object-contain" />
                </div>
                <h4 className="text-xl font-bold font-futura-pt text-[#006838] group-hover:text-[#98b475] transition-colors duration-300 self-center">
                  The Sciencie of Happiness – Universidad de Berkeley
                </h4>
              </div>
              <p className="text-sm font-semibold text-[#006838] mt-4 mb-2">
                Otras Certificaciones Adicionales:
              </p>
              <ul className="font-book font-futura-pt text-base text-[#2A2A2A]/80 list-disc pl-5 space-y-1">
                <li>Consultora de Empoderamiento y Motivación – Lynn Lott</li>
                <li>Políticas Efectivas de Desarrollo Infantil – BID</li>
                <li>Psicología Positiva- Institución Europea de Psicología Positiva</li>
                <li>Diplomado en Prevención Temprana de Comportamientos Agresivos</li>
              </ul>
            </div>
          </motion.div>

          {/* Card 4: Global NLP */}
          <motion.div
            className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-[#006838] h-full flex flex-col transition-all duration-300 ease-out hover:border-l-[#98b475]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <div className="flex-grow hover:bg-[#006838]/5 transition-colors duration-300 ease-out">
              <div className="mb-3 h-16 md:h-20 w-full relative group-hover:scale-105 transition-transform duration-300">
                <Image src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746026938/images/education/nlp-logo.png" alt="Global NLP Training Logo" fill className="object-contain" />
              </div>
              <h4 className="text-xl font-bold font-futura-pt text-[#006838] group-hover:text-[#98b475] transition-colors duration-300 mb-3">
                GLOBAL NLP TRAINING
              </h4>
              <ul className="font-book font-futura-pt text-base text-[#2A2A2A]/80 list-disc pl-5 space-y-1">
                <li>Master Practitioner en Programación Neurolinguistica</li>
                <li>Coach de Inteligencia Social y Emocional</li>
                <li>Coach en Mentalidad y Liderazgo Personal</li>
                <li>Coach de Mentalidad y Estrategia de Vida</li>
                <li>Coaching Motivacional</li>
                <li>Coaching en Liderazgo y Comunicación Efectiva</li>
              </ul>
            </div>
          </motion.div>

          {/* Card 5: UQ - MODIFIED to span 2 columns on desktop */}
          <motion.div
            className="group bg-[#006838] hover:bg-[#005828] p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl text-white h-full flex flex-col md:col-span-2 transition-all duration-300 ease-out border-l-4 border-white hover:border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <div className="flex-grow flex flex-col items-center text-center">
              <div className="mb-4 h-16 md:h-20 w-32 md:w-40 relative group-hover:scale-105 transition-transform duration-300">
                <Image src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746026942/images/education/uq-logo.png" alt="Universidad de Queensland Logo" fill className="object-contain" />
              </div>
              <h4 className="text-xl font-bold font-futura-pt mb-3">
                UNIVERSIDAD DE QUEENSLAND – Australia
              </h4>
              <ul className="font-book font-futura-pt opacity-90 list-disc space-y-1 inline-block text-left">
                <li>Facilitadora del Programa de Parentalidad Positiva grupal</li>
                <li>Facilitadora del Programa de Parentalidad Positiva para Adolescentes</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Logo Carousel with reduced height - MOVED HERE */}
      <div>
        <LogoCarousel />
      </div>
    </motion.section>
  );
};

export default SobreMiEducation; 