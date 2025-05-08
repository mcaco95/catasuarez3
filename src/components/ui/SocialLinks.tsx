'use client';

import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaLink } from 'react-icons/fa';

interface SocialLink {
  platform: 'facebook' | 'instagram' | 'youtube' | 'website';
  url: string;
  label: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return FaFacebook;
      case 'instagram':
        return FaInstagram;
      case 'youtube':
        return FaYoutube;
      default:
        return FaLink;
    }
  };

  return (
    <motion.div
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {links.map((link, index) => {
        const Icon = getIcon(link.platform);
        return (
          <motion.a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-[#006838] text-[#006838] hover:text-white border border-[#006838]/20 transition-all duration-300 group shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-futura-pt font-book">{link.label}</span>
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks; 