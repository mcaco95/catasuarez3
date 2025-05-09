'use client';

import { motion, useScroll, useTransform, animate, AnimationPlaybackControls, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/utils/cloudinary';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls: AnimationPlaybackControls = animate<number>(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest: number) => {
          setCount(Math.round(latest));
        }
      });

      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      {count}{suffix}
    </motion.span>
  );
};

const SobreMiProfessional = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      id="professional"
      className="relative min-h-screen w-full bg-white pb-24 overflow-hidden"
      style={{ opacity }}
    >
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#98B475]/5 rounded-full -translate-y-1/2 translate-x-1/2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#006838]/5 rounded-full translate-y-1/2 -translate-x-1/2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] mb-32 md:mb-40">
        <Image
          src={getCloudinaryUrl('/images/2.png')}
          alt="Professional Impact"
          fill
          className="object-cover object-[70%_center] md:object-[center_12%] transition-transform duration-700 hover:scale-105"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="absolute inset-0 container mx-auto px-4 md:px-6 flex flex-col justify-start md:pt-20 lg:pt-24 md:pb-40 lg:pb-48">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full md:max-w-2xl md:mx-auto pr-[130px] sm:pr-[150px] md:pr-0"
          >
            <motion.div
              className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#98B475] to-[#006838]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heavy font-futura-pt mb-4 md:mb-8 text-white relative">
              Experiencia profesional
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-[#98B475]"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </h2>
            <p className="text-xl md:text-2xl font-book font-futura-pt text-white/90 leading-relaxed">
            Por más de una década me he enfocado en diseñar e implementar programas masivos de educación positiva, parentalidad positiva, competencias comportamentales docentes, habilidades socioemocionales y muchos temas más, para transformar personas, familias e instituciones.
            </p>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-8 right-4 sm:right-4 md:-bottom-10 md:left-1/2 md:transform md:-translate-x-1/2 w-auto max-w-[100px] sm:max-w-[115px] md:w-full md:max-w-4xl lg:max-w-5xl xl:max-w-6xl md:px-4 z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            <motion.div 
              className="bg-white rounded-xl shadow-2xl p-2 sm:p-2 md:p-2 lg:p-3 xl:p-4 group cursor-pointer relative overflow-hidden border-l-4 border-[#006838] hover:border-l-[#98b475]"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-[#006838]/5 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
              <motion.div 
                className="relative text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-heavy font-futura-pt text-[#006838] mb-0.5 group-hover:text-[#98B475] transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedNumber value={25} suffix="+" />
              </motion.div>
              <div 
                className="relative text-[9px] sm:text-[10px] md:text-xs lg:text-xs font-book font-futura-pt text-[#2A2A2A] group-hover:text-[#006838] transition-colors duration-300"
              >
                Años de Experiencia
            </div>
            </motion.div>
            <motion.div 
              className="bg-[#006838] text-white rounded-xl shadow-2xl p-2 sm:p-2 md:p-2 lg:p-3 xl:p-4 group cursor-pointer overflow-hidden relative border-l-4 border-white hover:border-gray-200"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-[#98B475] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <motion.div 
                className="relative text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-heavy font-futura-pt mb-0.5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <AnimatedNumber value={35000} suffix="+" />
              </motion.div>
              <div 
                className="relative text-[9px] sm:text-[10px] md:text-xs lg:text-xs font-book font-futura-pt opacity-90"
              >
                Familias y Educadores
            </div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-xl shadow-2xl p-2 sm:p-2 md:p-2 lg:p-3 xl:p-4 group cursor-pointer relative overflow-hidden border-l-4 border-[#006838] hover:border-l-[#98b475]"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-[#98B475]/5 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
              <motion.div 
                className="relative text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-heavy font-futura-pt text-[#98B475] mb-0.5 group-hover:text-[#006838] transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AnimatedNumber value={90} suffix="%" />
              </motion.div>
              <div 
                className="relative text-[9px] sm:text-[10px] md:text-xs lg:text-xs font-book font-futura-pt text-[#2A2A2A] group-hover:text-[#98B475] transition-colors duration-300"
              >
                de satisfacción en los contenidos y las metodologías de mis programas
            </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-0">
        {/* Main Content Grid - Experience and Social Impact side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Left Side - Experience Section */}
          <div className="space-y-8">
            {/* Experience Content */}
          <motion.div
              className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:sticky md:top-24 space-y-8">
                <motion.div 
                  className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                <Image
                    src={getCloudinaryUrl('/images/zF6AD9413-C9F9-4043-8D51-08270A61A67E.jpeg.jpg')}
                  alt="Professional Impact"
                  fill
                    className="object-cover object-[70%_center] transition-transform duration-700 group-hover:scale-110"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <motion.h3 
                      className="text-3xl md:text-4xl font-heavy font-futura-pt text-white mb-3"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                    Impacto Profesional
                    </motion.h3>
                    <motion.p 
                      className="text-lg md:text-xl font-book font-futura-pt text-white/90"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      Transformando vidas a través de la educación
                    </motion.p>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative bg-white rounded-2xl shadow-2xl overflow-hidden group border-l-4 border-[#006838] hover:border-l-[#98b475]"
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-[#006838]/5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="p-8 md:p-10 relative">
                    <h3 className="text-3xl md:text-4xl font-heavy font-futura-pt text-[#006838] mb-6 relative inline-block group-hover:text-[#006838]/90 transition-colors duration-300">
                      Psicóloga. Crianza y educación positiva.
                      <motion.div
                        className="absolute -bottom-2 left-0 h-1 bg-[#98B475]"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                  </h3>
                    <p className="font-book font-futura-pt leading-relaxed text-lg text-[#2A2A2A] mb-8">
                      Mi trayectoria incluye roles como psicóloga educativa en el colegio Vermont de Medellín, donde he trabajado en el desarrollo integral de los estudiantes, implementando programas innovadores que fomentan el crecimiento personal y académico.
                    </p>
                    <div className="flex items-center space-x-6">
                      <motion.div 
                        className="w-14 h-14 md:w-16 md:h-16 bg-[#006838]/10 rounded-full flex items-center justify-center group/icon cursor-pointer"
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-[#006838] group-hover/icon:text-[#98B475] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </motion.div>
                      <motion.div 
                        className="w-14 h-14 md:w-16 md:h-16 bg-[#98B475]/10 rounded-full flex items-center justify-center group/icon cursor-pointer"
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-[#98B475] group-hover/icon:text-[#006838] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </motion.div>
                      <motion.div 
                        className="w-14 h-14 md:w-16 md:h-16 bg-[#D3DCCA]/10 rounded-full flex items-center justify-center group/icon cursor-pointer"
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-[#D3DCCA] group-hover/icon:text-[#98B475] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </motion.div>
              </div>
            </div>
          </motion.div>

                <motion.div 
                  className="bg-[#98B475] rounded-2xl shadow-2xl text-white relative overflow-hidden group cursor-pointer border-l-4 border-white hover:border-gray-200"
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-[#006838] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="relative z-10 p-8 md:p-10">
                    <h3 className="text-3xl md:text-4xl font-heavy font-futura-pt mb-6">
                      Colaboración con la Presidencia
                    </h3>
                    <p className="font-book font-futura-pt leading-relaxed text-lg md:text-xl opacity-90">
                      He colaborado con la Presidencia de Colombia en programas de desarrollo alternativo, apoyando a comunidades campesinas, indígenas y afrodescendientes, contribuyendo al desarrollo social y económico del país.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Social Impact Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative py-10 md:py-12 px-8 md:px-10 bg-[#006838]/5 rounded-3xl">
            <motion.div
                className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-heavy font-futura-pt mb-4 text-[#006838] relative inline-block">
                Compromiso Social
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-[#98B475]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
              </h2>
                <p className="text-lg md:text-xl font-book font-futura-pt text-[#2A2A2A]/80 max-w-2xl mx-auto">
                Construyendo un futuro mejor para las comunidades
              </p>
            </motion.div>

              <div className="space-y-8">
              <motion.div
                  className="bg-white rounded-2xl shadow-2xl overflow-hidden group border-l-4 border-[#006838] hover:border-l-[#98b475]"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
              >
                  <div className="relative p-8 md:p-10 border-l-4 border-[#006838]">
                    <div className="absolute inset-0 bg-[#006838]/5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="relative">
                      <h4 className="text-2xl md:text-3xl font-heavy font-futura-pt text-[#2A2A2A] mb-4 group-hover:text-[#006838] transition-colors duration-300">
                    Fundaciones y Primera Infancia
                  </h4>
                  <p className="font-book font-futura-pt leading-relaxed text-lg text-[#2A2A2A]">
                    Mi vocación por la educación me llevó a trabajar con fundaciones para la promoción de la primera infancia, impulsando el bienestar y el aprendizaje en los primeros años de vida.
                  </p>
                </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-[#006838] rounded-2xl shadow-2xl text-white overflow-hidden group border-l-4 border-white hover:border-gray-200"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative p-8 md:p-10">
                    <div className="absolute inset-0 bg-[#98B475] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="relative z-10">
                      <h4 className="text-2xl md:text-3xl font-heavy font-futura-pt mb-4">
                    Impacto en la Comunidad
                  </h4>
                  <p className="font-book font-futura-pt leading-relaxed text-lg opacity-90">
                    A través de mi trabajo, he contribuido al desarrollo de programas educativos que benefician a cientos de niños y familias en comunidades vulnerables.
                  </p>
                    </div>
                </div>
              </motion.div>

              <motion.div
                  className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
              >
                <Image
                    src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746030154/foto-feria-de-calle_nfjet1.jpg"
                  alt="Social Impact"
                  fill
                    className="object-cover object-[70%_center] transition-transform duration-700 group-hover:scale-110"
                    quality={90}
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-heavy font-futura-pt text-white mb-3"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                    Impacto Social
                    </motion.h3>
                    <motion.p 
                      className="text-base md:text-lg font-book font-futura-pt text-white/90"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                    Transformando comunidades a través de la educación
                    </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SobreMiProfessional; 