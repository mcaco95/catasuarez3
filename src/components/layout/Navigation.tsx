'use client';

import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaInstagram, FaFacebook, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Navigation = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const socialLinks = [
    { 
      icon: FaInstagram, 
      href: 'https://www.instagram.com/catasuarezeducacion',
      label: 'Instagram'
    },
    { 
      icon: FaFacebook, 
      href: 'https://www.facebook.com/share/ReZFk9ZBQrzSofF2/',
      label: 'Facebook'
    },
    { 
      icon: FaLinkedinIn, 
      href: 'https://www.linkedin.com/in/catalina-su%C3%A1rez-p%C3%A9rez-25337914a',
      label: 'LinkedIn'
    },
    { 
      icon: FaYoutube, 
      href: 'https://youtube.com/@catasuarez6063',
      label: 'YouTube'
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white h-[60px]">
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#98B475] origin-left shadow-sm"
        style={{ scaleX }}
      />
      <div className="container mx-auto h-full flex justify-between items-center px-8">
        {/* Empty div to balance the space taken by logo */}
        <div className="w-[120px]"></div>
        
        {/* Menu Items */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex justify-between w-[600px] text-[#006838] text-base font-futura-pt font-book">
            <Link href="/" className="hover:text-[#004d2a]">Inicio</Link>
            <Link href="/sobre-mi" className="hover:text-[#004d2a]">Sobre mí</Link>
            <Link href="/casos-de-exito" className="hover:text-[#004d2a]">Casos de Éxito</Link>
            <Link href="/programas" className="hover:text-[#004d2a]">Programas</Link>
            <Link href="/contacto" className="hover:text-[#004d2a]">Contacto</Link>
          </div>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006838] hover:text-[#004d2a] transition-colors duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 