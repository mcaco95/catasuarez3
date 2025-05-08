'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCloudinaryUrl } from '@/utils/cloudinary';

const ProgramCard = ({ 
  title, 
  description, 
  duration,
  format,
  features,
  image,
  banner,
  callToAction = "Quiero más información",
  isReversed = false
}: { 
  title: string;
  description: string;
  duration?: string;
  format?: string;
  features?: string[];
  image: string;
  banner?: string;
  callToAction?: string;
  isReversed?: boolean;
}) => (
  <motion.div
    className="mb-16 md:mb-40"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {banner && (
      <motion.div 
        className="flex justify-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full max-w-[200px] md:max-w-[280px]">
          <Image
            src={banner}
            alt="Program Banner"
            width={280}
            height={93}
            className="w-full h-auto"
            quality={100}
          />
        </div>
      </motion.div>
    )}

    <div className={`grid grid-cols-1 ${isReversed ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-[1.2fr_1fr]'} gap-8 md:gap-16 items-center bg-white`}>
      <div className={`relative aspect-[4/3] overflow-hidden rounded-lg md:rounded-2xl shadow-md ${isReversed ? 'order-1 md:order-2' : 'order-1'}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          quality={95}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      <div className={`flex flex-col ${isReversed ? 'order-2 md:order-1' : 'order-2'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl md:text-3xl font-heavy font-futura-pt text-[#006838] mb-4 md:mb-6">
            {title}
          </h3>
          <p className="text-gray-600 font-book font-futura-pt leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
            {description}
          </p>
          
          {(duration || format) && (
            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              {duration && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#006838] mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-book font-futura-pt text-gray-600 text-sm md:text-base">{duration}</p>
                </div>
              )}
              {format && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#006838] mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <p className="font-book font-futura-pt text-gray-600 text-sm md:text-base">{format}</p>
                </div>
              )}
            </div>
          )}

          {features && features.length > 0 && (
            <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#006838] mr-2 md:mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="font-book font-futura-pt text-gray-600 text-sm md:text-base">{feature}</p>
                </li>
              ))}
            </ul>
          )}

          <Link 
            href="/contacto"
            className="inline-flex items-center text-[#006838] hover:text-[#006838]/80 transition-colors duration-300 group"
          >
            <span className="font-futura-pt font-book text-base md:text-lg">{callToAction}</span>
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const Programas = () => {
  const { scrollY } = useScroll();
  const mobileScale = useTransform(scrollY, [0, 300], [1, 1.05]); 
  const [isTouch, setIsTouch] = useState(false);
  const lastScrollY = useSpring(0);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

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
    <motion.main 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{
            scale: isTouch ? mobileScale : undefined
          }}
        >
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746046767/3_cejb0v.png"
              alt="Programas Hero"
              fill
              className="object-cover object-[70%_35%] md:object-center"
              quality={100}
              priority
            />
          </motion.div>
        </motion.div>

        <div className="relative h-full flex flex-col justify-center">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-[800px]">
              <motion.div
                className="overflow-hidden mb-4 md:mb-6"
                {...(isTouch ? mobileAnimationProps : {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1.2, delay: 0.8 }
                })}
              >
                <p className="text-white/70 font-futura-pt font-book tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs md:text-sm">
                  Nuestros Programas
                </p>
              </motion.div>

              <div className="space-y-4 md:space-y-6">
                <motion.h1
                  className="text-5xl md:text-8xl font-futura-pt font-heavy text-white leading-[1.1] tracking-tight"
                  {...(isTouch ? { ...mobileAnimationProps, transition: { ...mobileAnimationProps.transition, delay: 0.2 } } : {
                    initial: { opacity: 0, y: 40 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 1.2, delay: 1 }
                  })}
                >
                  Transformando
                  <br />
                  Vidas
                </motion.h1>
                
                <motion.p
                  className="text-base md:text-xl font-book font-futura-pt text-white/90 max-w-md md:max-w-xl"
                  {...(isTouch ? { ...mobileAnimationProps, transition: { ...mobileAnimationProps.transition, delay: 0.4 } } : {
                    initial: { opacity: 0, y: 40 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 1.2, delay: 1.2 }
                  })}
                >
                  Programas especializados diseñados para padres, educadores y profesionales,
                  enfocados en el desarrollo integral y la transformación positiva.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
        
        {isTouch && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
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
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {/* Curso de Comunicación */}
          <ProgramCard
            title="CURSO DE FORMACIÓN VIRTUAL: COMUNICACIÓN EFECTIVA CON ADOLESCENTES"
            description="Formación virtual de 10 horas para apoyar a los padres, madres y maestros en su labor de acompañar y educar adolescentes de una manera eficaz y tranquila."
            duration="10 horas de formación"
            format="Curso Virtual con acompañamiento En Vivo"
            features={[
              "Este curso lo realizo 3 veces al año con un acompañamiento semanal En Vivo durante 2 meses",
              "Acceso a recursos y materiales especializados",
              "Sesiones prácticas y dinámicas",
              "Certificado de participación"
            ]}
            image={getCloudinaryUrl('https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746026927/images/curso-comunicacion-hero.jpg')}
            callToAction="Quiero más información"
          />

          {/* Familias A+ */}
          <ProgramCard
            title="PROGRAMA DE PARENTALIDAD POSITIVA: FAMILIAS A+"
            description="Programa de formación B-learning (presencial y virtual) para enseñar habilidades parentales, disciplina positiva y herramientas básicas para poner en práctica una crianza positiva, amorosa y efectiva a niños y niñas desde los 2 hasta los 10 años."
            features={[
              "Metodología mixta: presencial y virtual",
              "Material didáctico especializado",
              "Acompañamiento personalizado",
              "Evaluación de impacto"
            ]}
            image={getCloudinaryUrl('https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746026949/images/familias-aplus-cards.jpg')}
            isReversed={true}
            callToAction="Quiero más información"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-[#006838]/5">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-heavy font-futura-pt text-[#006838] mb-6">
              ¿Listo para iniciar la transformación?
            </h2>
            <p className="text-base md:text-lg text-gray-700 font-book font-futura-pt mb-8">
              Contacta conmigo para obtener más información sobre mis programas y cómo puedo ayudarte.
            </p>
            <Link 
              href="/contacto"
              className="inline-block bg-[#006838] text-white font-futura-pt font-book py-3 px-8 rounded-full hover:bg-[#00532c] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contáctame Ahora
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
};

export default Programas; 