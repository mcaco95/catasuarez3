'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/utils/cloudinary';

const SobreMiInfo = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-white to-[#F8FAF5]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Title Section - Moved Above Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 md:mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heavy font-futura-pt text-[#98b475] leading-tight">
            El día que mi vida <span className="text-[#98b475]">cambió</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-[#98b475] to-[#98b475]/60 rounded-full mt-4 mx-auto md:mx-0" />
        </motion.div>

        {/* Two Column Grid for Image and Text Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }} // Adjusted delay
            className="relative aspect-[3/4] md:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
          >
            <Image
              src={getCloudinaryUrl('/IMG_1980_jkklvm.jpg')}
              alt="Cata Suárez con su hijo"
              fill
              className="object-cover object-[70%_center]"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
          </motion.div>

          {/* Right Column: Quote and Paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }} // Adjusted delay
            className="space-y-6 md:space-y-8" // Removed larger top margin from here
          >
            <p className="text-lg md:text-xl lg:text-2xl font-book font-futura-pt text-[#2A2A2A]/80 leading-relaxed italic">
              &ldquo;Cuando nació mi hijo sietemesino, descubrí mi verdadera misión en la vida...&rdquo;
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#98b475] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p className="text-base md:text-lg font-book font-futura-pt text-[#2A2A2A]/80 leading-relaxed">
                  Mi hijo nació sietemesino, enfrentando varios retos en su desarrollo motor. Este momento transformó mi perspectiva sobre la educación y el cuidado infantil.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#98b475] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-base md:text-lg font-book font-futura-pt text-[#2A2A2A]/80 leading-relaxed">
                  Descubrí que mi gran misión es enseñar a padres y maestros la magia de educar amorosa y efectivamente, transformando vidas a través del amor y la comprensión.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#98b475] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className="text-base md:text-lg font-book font-futura-pt text-[#2A2A2A]/80 leading-relaxed">
                  Me comprometí con la gran labor de trabajar para prevenir los malos tratos a la infancia y la adolescencia, buscando cambiar los modelos educativos tradicionales.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SobreMiInfo; 