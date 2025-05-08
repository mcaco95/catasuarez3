'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaInstagram, 
      href: 'https://www.instagram.com/catasuarezeducacion/',
      label: 'Instagram'
    },
    { 
      icon: FaYoutube, 
      href: 'https://www.youtube.com/@catasuarez6063',
      label: 'YouTube'
    },
    { 
      icon: FaLinkedinIn, 
      href: 'https://linkedin.com/in/catasuarez',
      label: 'LinkedIn'
    }
  ];

  return (
    <footer className="bg-[#2A2A2A] text-white/90 py-16 border-t border-[#006838]/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-futura-pt font-heavy mb-6 relative inline-block">
              Contacto
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-[#006838]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </h3>
            <div className="space-y-3 font-futura-pt font-book">
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#006838]" />
                Medellín, Colombia
              </p>
              <a 
                href="mailto:contacto@catasuarez.com" 
                className="flex items-center gap-2 hover:text-[#006838] transition-colors duration-300 group"
              >
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#006838] group-hover:bg-[#006838] transition-all duration-300">
                  <HiMail className="text-lg group-hover:text-white" />
                </span>
                contacto@catasuarez.com
              </a>
              <a 
                href="https://wa.me/+573001234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#006838] transition-colors duration-300 group"
              >
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#006838] group-hover:bg-[#006838] transition-all duration-300">
                  <FaWhatsapp className="text-lg group-hover:text-white" />
                </span>
                +57 300 123 4567
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-futura-pt font-heavy mb-6 relative inline-block">
              Navegación
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-[#006838]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </h3>
            <nav className="space-y-3 font-futura-pt font-book">
              {['Inicio', 'Sobre Mí', 'Servicios', 'Blog', 'Contacto'].map((item) => (
                <Link 
                  key={item}
                  href={item === 'Inicio' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className="block hover:text-[#006838] transition-colors duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <motion.span 
                    className="absolute left-0 bottom-0 h-[1px] bg-[#006838]/50"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Schedule Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-futura-pt font-heavy mb-6 relative inline-block">
              Sígueme
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-[#006838]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </h3>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#006838] hover:border-[#006838] hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
            <h4 className="text-lg font-futura-pt font-heavy relative inline-block">
              Horario de Atención
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-[#006838]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </h4>
            <div className="font-futura-pt font-book space-y-2">
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#006838]" />
                Lunes a Viernes
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#006838]" />
                8:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#006838]/20 text-center text-sm font-futura-pt font-book text-white/60">
          <p>© {currentYear} Cata Suárez. Todos los derechos reservados.</p>
          <p className="mt-2">
            <Link href="/privacidad" className="hover:text-[#006838] transition-colors duration-300 relative group">
              Política de Privacidad
              <motion.span 
                className="absolute left-0 bottom-0 h-[1px] bg-[#006838]/50"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            {' · '}
            <Link href="/terminos" className="hover:text-[#006838] transition-colors duration-300 relative group">
              Términos y Condiciones
              <motion.span 
                className="absolute left-0 bottom-0 h-[1px] bg-[#006838]/50"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 