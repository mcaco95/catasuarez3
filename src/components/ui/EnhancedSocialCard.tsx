import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaGlobe } from 'react-icons/fa';
import Link from 'next/link';

interface EnhancedSocialCardProps {
  platform: 'facebook' | 'instagram' | 'website';
  url: string;
  programName: string;
}

const platformConfig = {
  facebook: {
    icon: FaFacebook,
    bgColor: 'bg-[#1877F2]',
    text: 'Síguenos en Facebook',
    hoverText: 'Únete a nuestra comunidad',
    description: 'Contenido exclusivo y actualizaciones diarias',
    iconColor: 'text-white',
  },
  instagram: {
    icon: FaInstagram,
    bgColor: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
    text: 'Síguenos en Instagram',
    hoverText: 'Historias y momentos especiales',
    description: 'Consejos diarios e inspiración para la crianza',
    iconColor: 'text-white',
  },
  website: {
    icon: FaGlobe,
    bgColor: 'bg-[#80b0ab]',
    text: 'Visita nuestra página web',
    hoverText: 'Recursos y herramientas',
    description: 'Guía completa de crianza y parentalidad',
    iconColor: 'text-white',
  },
};

export default function EnhancedSocialCard({ platform, url, programName }: EnhancedSocialCardProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="block w-full">
      <motion.div
        className={`relative overflow-hidden rounded-lg ${config.bgColor} shadow-lg transition-all duration-300 hover:scale-[1.02]`}
        whileHover={{ y: -4 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative h-full py-4 px-5">
          <div className="flex items-start space-x-4">
            <Icon className={`h-8 w-8 ${config.iconColor} flex-shrink-0 mt-1`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-semibold text-white">{config.text}</h4>
              <p className="text-sm text-white/90 mt-0.5">
                {config.description}
              </p>
              <motion.p
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                className="text-sm text-white/80 mt-1 font-light"
              >
                {programName}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 