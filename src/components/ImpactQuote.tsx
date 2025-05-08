'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/utils/cloudinary';

interface ImpactQuoteProps {
  quote: string;
  author?: string;
  imagePath: string;
  imageAlt: string;
  position?: 'left' | 'right';
  theme?: 'light' | 'dark';
}

const ImpactQuote = ({
  quote,
  author,
  imagePath,
  imageAlt,
  position = 'right',
  theme = 'light'
}: ImpactQuoteProps) => {
  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
      {/* Background Image */}
      <Image
        src={getCloudinaryUrl(imagePath)}
        alt={imageAlt}
        fill
        className="object-cover"
        quality={90}
      />
      
      {/* Gradient Overlay */}
      <div 
        className={`absolute inset-0 ${
          theme === 'light'
            ? 'bg-gradient-to-r'
            : 'bg-gradient-to-r'
        } ${
          position === 'right'
            ? 'from-black/60 via-black/40 to-transparent'
            : 'from-transparent via-black/40 to-black/60'
        }`}
      />

      {/* Quote Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 flex items-center ${
          position === 'right' ? 'justify-start' : 'justify-end'
        } p-12`}
      >
        <div className={`max-w-lg ${position === 'right' ? 'ml-8' : 'mr-8'}`}>
          <svg
            className="w-12 h-12 mb-6 text-white/80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl font-heavy font-futura-pt text-white mb-6 leading-relaxed">
            {quote}
          </blockquote>
          {author && (
            <cite className="text-lg font-book font-futura-pt text-white/90 not-italic">
              — {author}
            </cite>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ImpactQuote; 