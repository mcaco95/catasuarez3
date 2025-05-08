'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import VideoEmbed from '@/components/ui/VideoEmbed';
import EnhancedSocialCard from '@/components/ui/EnhancedSocialCard';
import RotatingCircles from '@/components/ui/RotatingCircles';
import { getCloudinaryUrl } from '@/utils/cloudinary';
import { AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const HighlightedQuote = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="relative z-10 -mx-4 md:-mx-12 my-12"
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="bg-[#80b0ab] text-white p-8 md:p-12 rounded-lg shadow-2xl transform -rotate-1 overflow-hidden">
      <motion.div 
        className="transform rotate-1"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-xl md:text-2xl font-book font-futura-pt leading-relaxed text-center">
          {children}
        </p>
      </motion.div>
    </div>
    <motion.div 
      className="absolute inset-0 bg-white/10 blur-xl -z-10 transform rotate-3"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: 0.2 }}
    />
  </motion.div>
);

const MainQuote = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="relative max-w-xl md:max-w-4xl mx-auto my-16 md:my-24 px-4 md:px-0"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
  >
    <motion.div 
      className="absolute -inset-2 md:-inset-4 bg-[#80b0ab]/10 blur-xl -z-10"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 0.2 }}
    />
    <div className="relative bg-white/90 backdrop-blur-sm border-l-4 md:border-l-8 border-[#80b0ab] p-6 md:p-12 rounded-r-xl md:rounded-r-3xl shadow-2xl overflow-hidden">
      <motion.p 
        className="text-xl md:text-3xl font-book font-futura-pt text-[#80b0ab] leading-relaxed text-center"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {children}
      </motion.p>
    </div>
  </motion.div>
);

interface ProgramCardProps {
  title: string;
  description: string;
  images: string[];
  quote?: string;
  details?: string;
  logo?: string;
  videoId?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
  };
  websiteUrl?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProgramCard = ({ 
  title, 
  description, 
  images, 
  quote, 
  details,
  logo,
  videoId,
  socialLinks,
  websiteUrl
}: ProgramCardProps) => (
  <motion.div
    className="bg-white rounded-lg overflow-hidden mb-16 md:mb-32 relative shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {/* Decorative Circles */}
    <RotatingCircles className="opacity-10 md:opacity-30 -right-16 md:-right-32 -top-16 md:-top-32 scale-50 md:scale-75" />
    <RotatingCircles className="opacity-10 md:opacity-30 -left-16 md:-left-32 -bottom-16 md:-bottom-32 scale-50 md:scale-75" color="#80b0ab" />

    <div className="relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
        <div className="space-y-4 md:space-y-6 order-2 md:order-1">
          {logo && (
            <motion.div 
              className={`relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-6 ${
                logo.includes('maestros-vida-logo') 
                  ? '' 
                  : logo.includes('cosmo-logo')
                    ? 'rounded-full bg-white p-2 shadow-lg overflow-hidden'
                    : 'rounded-full bg-white/80 p-4 shadow-lg overflow-hidden'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <Image
                src={logo}
                alt={title}
                fill
                className={`object-contain ${
                  logo.includes('maestros-vida-logo') 
                    ? '' 
                    : logo.includes('cosmo-logo')
                      ? 'scale-150 p-1'
                      : 'p-2'
                }`}
              />
            </motion.div>
          )}
          <h3 className="text-xl md:text-2xl font-heavy font-futura-pt text-[#80b0ab]">
            {title}
          </h3>
          <p className="text-sm md:text-base text-gray-700 font-book font-futura-pt leading-relaxed">
            {description}
          </p>
          {details && (
            <p className="text-sm md:text-base text-gray-700 font-book font-futura-pt leading-relaxed">
              {details}
            </p>
          )}
          {(socialLinks || websiteUrl) && (
            <motion.div 
              className="mt-4 md:mt-8 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {socialLinks?.facebook && (
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <EnhancedSocialCard
                    platform="facebook"
                    url={socialLinks.facebook}
                    programName={title}
                  />
                </motion.div>
              )}
              {socialLinks?.instagram && (
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <EnhancedSocialCard
                    platform="instagram"
                    url={socialLinks.instagram}
                    programName={title}
                  />
                </motion.div>
              )}
              {websiteUrl && (
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <EnhancedSocialCard
                    platform="website"
                    url={websiteUrl}
                    programName={title}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
        <div className="space-y-4 flex flex-col justify-center order-1 md:order-2">
          {videoId ? (
            <div className="mt-4 md:mt-16">
              <VideoEmbed videoId={videoId} title={title} />
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              {images.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="relative w-full overflow-hidden rounded-lg shadow-md"
                  style={{ aspectRatio: '16/9' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Image
                    src={image}
                    alt={`${title} - Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      {quote && <HighlightedQuote>{quote}</HighlightedQuote>}
    </div>
  </motion.div>
);

// NEW COMPONENT DEFINITION START
interface GridProgramCardProps {
  logo?: string;
  title: string;
  description: string;
  details?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
  };
  websiteUrl?: string;
}

const GridProgramCard: React.FC<GridProgramCardProps> = ({
  logo,
  title,
  description,
  details,
  socialLinks,
  websiteUrl
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasExpandableContent = !!details || !!socialLinks?.facebook || !!socialLinks?.instagram || !!websiteUrl;

  return (
    <motion.div
      layout
      className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col h-full transition-all duration-300 ease-out hover:shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="p-6 flex flex-col items-center text-center flex-grow group-hover:bg-gray-50/50 transition-colors duration-300">
        {logo && (
          <motion.div
            layout="position"
            className="relative w-24 h-24 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={logo}
              alt={`${title} Logo`}
              fill
              className={`object-contain ${logo.includes('cosmo-logo') ? 'transform scale-150' : ''}`.trim()}
            />
          </motion.div>
        )}
        <motion.h4 layout="position" className="text-lg md:text-xl font-heavy font-futura-pt text-[#80b0ab] group-hover:text-[#006838] transition-colors duration-300 mb-2">
          {title}
        </motion.h4>
        <motion.p layout="position" className="text-sm text-gray-600 font-book font-futura-pt leading-relaxed mb-4 flex-grow">
          {description}
        </motion.p>

        <motion.div layout className="w-full">
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", marginTop: '16px' },
                  collapsed: { opacity: 0, height: 0, marginTop: '0px' }
                }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                {details && (
                  <p className="text-sm text-gray-700 font-book font-futura-pt leading-relaxed mb-4 text-left border-t pt-4">
                    {details}
                  </p>
                )}
                {(socialLinks || websiteUrl) && (
                  <div className="space-y-3 border-t pt-4">
                    {socialLinks?.facebook && (
                      <EnhancedSocialCard platform="facebook" url={socialLinks.facebook} programName={title} />
                    )}
                    {socialLinks?.instagram && (
                      <EnhancedSocialCard platform="instagram" url={socialLinks.instagram} programName={title} />
                    )}
                    {websiteUrl && (
                      <EnhancedSocialCard platform="website" url={websiteUrl} programName={title} />
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {hasExpandableContent && (
         <div className="bg-gray-50 px-6 py-3 mt-auto text-center border-t border-gray-100">
           <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm font-medium text-[#80b0ab] hover:text-[#006838] group-hover:font-semibold transition-all duration-200"
          >
            {isOpen ? 'Ver menos' : 'Ver más'}
          </button>
         </div>
      )}
    </motion.div>
  );
};
// NEW COMPONENT DEFINITION END

// REVISED IMAGE CAROUSEL COMPONENT DEFINITION START
interface ImageCarouselProps {
  imageUrls: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls }) => {
  // Initialize Embla Carousel with loop and autoplay
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center' 
    }, 
    [Autoplay({ 
      delay: 3000, // 4-second delay
      stopOnInteraction: false, // Keep playing after user interaction
      stopOnMouseEnter: true // Pause when mouse hovers over
    })]
  );

  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full group overflow-hidden" ref={emblaRef}> 
      <div className="flex -ml-4"> 
        {imageUrls.map((url, index) => (
          <div 
            key={index} 
            className="relative flex-grow-0 flex-shrink-0 basis-full sm:basis-4/5 md:basis-2/3 lg:basis-1/2 xl:basis-1/3 pl-4"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 bg-gray-100">
              <Image
                src={url} 
                alt={`Galería de Impacto - Imagen ${index + 1}`}
                fill
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 66vw, (max-width: 1280px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// REVISED IMAGE CAROUSEL COMPONENT DEFINITION END

const CasosDeExito = () => {
  // --- Mobile Specific Logic ---
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

  const getMobileAnim = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.5,
      delay
    }
  });
  // --- End Mobile Specific Logic ---

  // --- Program Data --- 
  const programData: ProgramCardProps[] = [
    {
      title: "PADRES DE PRIMERA",
      description: "Enseña a los padres, madres y cuidadores de niños y niñas en primera infancia competencias parentales positivas que les permitan cambiar modelos de crianza violentos y prevenir el maltrato y el castigo físico.",
      images: [
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/padres-primera-1.jpeg',
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/padres-primera-2.jpeg',
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/padres-primera-3.jpeg',
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/padres-primera-4.jpeg'
      ],
      quote: "El programa fue evaluado y logramos una disminución de la práctica del castigo físico en más del 30%.",
      details: "El Programa fue creado y desarrollado para la Alcaldía de Barranquilla entre el 2020 y el 2023. Tiene una metodología adaptada del modelo de disciplina positiva con un componente virtual y presencial y un análisis de costo-beneficio para poder impactar a un gran número de familias en condición de vulnerabilidad. En este programa hemos impactado de manera directa más de 2.000 personas.",
      logo: "https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_400/v1746026927/images/padres-primera-logo.png",
      videoId: "ir2qe-cuo30",
      socialLinks: {
        facebook: "https://www.facebook.com/padresdeprimerabaq",
        instagram: "https://www.instagram.com/padresdeprimerabaq"
      }
    },
    {
      title: "DIPLOMADO VIRTUAL EN CRIANZA POSITIVA Y DESARROLLO INFANTIL – MAESTROS DE PRIMERA",
      description: "Programa de formación virtual de 100 horas que diseñé para capacitar a los maestros y madres comunitarias que trabajan con la primera infancia. Fue implementado por la Institución Universitaria Salazar y Herrera de Medellín y contó con el apoyo de más de 13 profesionales de alto nivel.",
      images: [
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/maestros-primera-1.jpeg',
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/maestros-primera-2.jpeg'
      ],
      details: "De la mano del programa Padres de Primera se hizo esta formación para enseñarles a los agentes educativos que trabajan con la primera infancia de Barranquilla conceptos básicos de crianza positiva y desarrollo infantil, considerando que esta población de educadores tiene un alto impacto en las familias y sus prácticas de crianza. En este Diplomado se graduaron 450 maestros y maestras.",
      logo: "https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_400/v1746026927/images/maestros-primera-logo.jpeg",
      socialLinks: {
        facebook: "https://www.facebook.com/profile.php?id=100031031697025"
      }
    },
    {
      title: "MAESTROS PARA LA VIDA",
      description: "Programa de formación en competencias comportamentales docentes, disciplina positiva y habilidades socioemocionales.",
      images: [
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/maestros-vida-1.jpeg',
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/maestros-vida-2.jpeg'
      ],
      details: "Este Programa fue dirigido a 90 maestros y maestras desde el nivel básico del Colegio Salazar y Herrera, hasta decanos y docentes universitarios de la Institución Universitaria Salazar y Herrera.",
      logo: "https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_400/v1746026927/images/maestros-vida-logo.jpeg"
    },
    {
      title: "CRIANZA POSITIVA Y CONEXIONES INSPIRADORAS",
      description: "Programa de formación en parentalidad positiva implementado con 1.000 familias y 100 docentes de los colegios COSMO SCHOOLS de Medellín, en alianza con la Caja de Compensación COMFAMA.",
      images: [
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/cosmo-1.jpeg',
        'https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_1200/v1746026927/images/cosmo-2.jpeg'
      ],
      quote: "El programa fue desarrollado entre el 2022 y 2023, y en las evaluaciones encontramos un aumento significativo en diferentes competencias parentales vinculares, protectoras y reflexivas, y una disminución de prácticas punitivas y castigos físicos de más del 30%",
      logo: "https://res.cloudinary.com/dqgqrvnnw/image/upload/q_auto:best,f_auto,w_400/v1746026927/images/cosmo-logo.png",
      websiteUrl: "https://crianzaamorosa.redpapaz.org/",
      details: "Soy la autora principal del contenido virtual de crianza amorosa de la Corporación Red Papaz (con alcance LATAM). Es una guía completa para que padres, madres y cuidadores puedan encontrar respuestas a las preguntas más comunes sobre parentalidad y crianza."
    }
  ];

  // Find the program with the videoId
  const videoProgram = programData.find(p => !!p.videoId);

  // Gather all image URLs for the carousel
  const allImageUrls = programData.reduce((acc, program) => {
    if (program.images && program.images.length > 0) {
      return acc.concat(program.images);
    }
    return acc;
  }, [] as string[]); // Initialize accumulator as string[]

  return (
    <motion.main 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
         {/* Apply parallax only to background wrapper on touch */}
        <motion.div 
          className="absolute inset-0"
          style={{
            scale: isTouch ? mobileScale : undefined
          }}
        >
           {/* Keep existing desktop scale animation on inner div */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={getCloudinaryUrl('/images/casos-hero.png')}
              alt="Casos de Éxito"
              fill
              className="object-cover object-[70%_35%] md:object-[center_15%]"
              quality={100}
              priority
            />
          </motion.div>
        </motion.div>

        <div className="relative h-full flex flex-col justify-center">
          {/* Adjusted padding for mobile */}
          <div className="container mx-auto px-6 md:px-8 pt-16">
            <div className="max-w-[800px]">
              <motion.div
                className="overflow-hidden mb-4 md:mb-8" // Adjusted margin
                // Conditional Animation
                {...(isTouch ? getMobileAnim(0) : {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1.2, delay: 0.8 }
                })}
              >
                <p className="text-white/70 font-futura-pt font-book tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs md:text-sm">
                  Casos de Éxito
                </p>
              </motion.div>

              <div className="relative">
                 {/* Quote marks - keep desktop anims, maybe hide/simplify on mobile? Hiding for now */}
                <motion.div
                  className="absolute -left-4 md:-left-8 -top-8 md:-top-10 hidden md:block" // Hidden on mobile
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4, delay: 1 }}
                >
                  <span className="font-futura-pt font-thin text-[80px] md:text-[120px] leading-none text-white/20">
                    &ldquo;
                  </span>
                </motion.div>

                {/* Adjusted padding for mobile */}
                <div className="space-y-1 md:space-y-2 text-left relative z-10 pl-0 md:pl-4">
                  {["En la crianza", "no hay recetas;", "sí hay estrategias"].map((text, index) => (
                    <motion.div
                      key={text}
                      className="overflow-hidden"
                      // Conditional Animation (staggered for mobile)
                      {...(isTouch ? getMobileAnim(0.2 + index * 0.1) : {
                        initial: { y: 80 },
                        animate: { y: 0 },
                        transition: { 
                          duration: 1.2, 
                          delay: 1.2 + (index * 0.15),
                          ease: [0.25, 1, 0.5, 1]
                        }
                      })}
                    >
                      <p 
                        // Responsive text size
                        className={`text-5xl md:text-7xl font-futura-pt ${
                          index === 2 ? 'font-heavy text-[#98b475]' : 'font-light text-white/90'
                        } leading-[1.1] md:leading-[1.2] tracking-tight`}
                      >
                        {text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                 {/* Quote marks - keep desktop anims, maybe hide/simplify on mobile? Hiding for now */}
                <motion.div
                  className="absolute right-0 md:-left-[-550px] -bottom-4 md:-bottom-6 hidden md:block" // Hidden on mobile
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4, delay: 1.8 }}
                >
                  <span className="font-futura-pt font-thin text-[80px] md:text-[120px] leading-none text-white/20">
                    &rdquo;
                  </span>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 md:mt-12 max-w-md md:max-w-xl" // Adjusted margin/max-width
                // Conditional Animation
                {...(isTouch ? getMobileAnim(0.5) : {
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1.4, delay: 2 }
                })}
              >
                {/* Responsive text size */}
                <h1 className="text-2xl md:text-4xl font-heavy font-futura-pt text-white/90 leading-tight">
                  Historias de
                  <br />
                  transformación real
                </h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        {isTouch && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }} // Slightly later delay due to text anims
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

      {/* Standalone Video Section */}
      {videoProgram && videoProgram.videoId && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl"> {/* Constrained width */} 
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
             >
                <VideoEmbed videoId={videoProgram.videoId} title={videoProgram.title} />
             </motion.div>
          </div>
        </section>
      )}

      {/* Main Quote */}
      <MainQuote>
        Todos mis programas tienen más del 90% de satisfacción y muestran
        impactos significativos en todas las evaluaciones que realizamos
      </MainQuote>

      {/* Grid Programs Section */}
      <section className="py-12 md:py-16 bg-gray-50"> {/* Added light bg for contrast */}
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-heavy font-futura-pt text-[#80b0ab] text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Casos de Éxito Destacados
          </motion.h2>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {programData.map((program, index) => (
              <GridProgramCard 
                key={program.title || index} // Use title as key if available
                logo={program.logo}
                title={program.title}
                description={program.description}
                details={program.details}
                socialLinks={program.socialLinks}
                websiteUrl={program.websiteUrl}
              />
            ))}
          </div>
          
        </div>
      </section>

      {/* New Image Carousel Section */}
      {allImageUrls.length > 0 && (
        <section className="py-16 md:py-24 bg-white"> {/* Or another suitable background */}
          <div className="container mx-auto px-4 md:px-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-heavy font-futura-pt text-[#006838] text-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Galería de Impacto
            </motion.h2>
            <ImageCarousel imageUrls={allImageUrls} />
          </div>
        </section>
      )}

    </motion.main>
  );
};

export default CasosDeExito; 