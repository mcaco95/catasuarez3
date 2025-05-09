'use client';

import Link from 'next/link';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaFacebook, FaLinkedinIn, FaYoutube, FaTimes, FaBars, FaTiktok } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import useMagneticHover from '../hooks/useMagneticHover';
import { useEffect, useState } from 'react';

const MenuItem = ({ href, label, isActive }: { href: string; label: string; isActive: boolean }) => {
  const { ref, position } = useMagneticHover(15);
  
  return (
    <motion.div
      ref={ref}
      className="relative"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
        mass: 0.5
      }}
    >
      <Link 
        href={href}
        className={`
          px-4 py-2 relative group transition-all duration-300
          ${isActive ? 'text-[#006838]' : 'text-[#2A2A2A] hover:text-[#006838]'}
          hover:scale-105 inline-block
        `}
      >
        <span className="relative z-10">
          {label}
          <AnimatePresence>
            {isActive && (
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#006838] to-[#80b0ab]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </AnimatePresence>
        </span>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-[#80b0ab]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
        
        {/* Hover underline with spring physics */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#006838] to-[#80b0ab] origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
        />
      </Link>
    </motion.div>
  );
};

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const [isComplete, setIsComplete] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Clear any existing timeout
      if (timeout) {
        clearTimeout(timeout);
      }

      if (latest >= 0.99) {
        // Only set isComplete to true if we stay at the bottom for 100ms
        timeout = setTimeout(() => {
          setIsComplete(true);
        }, 100);
      } else {
        setIsComplete(false);
      }
    });

    return () => {
      unsubscribe();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [scrollYProgress]);

  return (
    <>
      {/* Base gradient bar */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[3px] opacity-30 bg-gradient-to-r from-[#006838] via-[#80b0ab] to-[#006838]"
      />
      
      {/* Progress bar with glow */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[3px] origin-left"
        style={{ scaleX }}
      >
        <div className="h-full w-full bg-gradient-to-r from-[#006838] via-[#80b0ab] to-[#006838] relative overflow-hidden">
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
        
        {/* Glow effect */}
        <div className="absolute top-0 left-0 right-0 h-full blur-[6px] bg-gradient-to-r from-[#006838] via-[#80b0ab] to-[#006838] opacity-50 transform scale-y-[2]" />
      </motion.div>

      {/* Completion pulse effect */}
      <AnimatePresence>
        {isComplete && (
          <>
            {/* Large outer pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0, 0.4, 0],
                scale: [1, 3, 1],
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute top-[-15px] right-0 h-[35px] w-[100px] bg-gradient-to-r from-transparent via-[#80b0ab] to-[#006838] blur-xl rounded-full"
            />
            
            {/* Medium pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [1, 2.5, 1],
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.3,
              }}
              className="absolute top-[-12px] right-0 h-[30px] w-[80px] bg-gradient-to-r from-transparent via-[#80b0ab] to-[#006838] blur-lg rounded-full"
            />

            {/* Core glow */}
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute top-[-10px] right-0 h-[25px] w-[60px] bg-gradient-to-r from-[#80b0ab] to-[#006838] blur-md rounded-full"
            />

            {/* Bright center */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-[-5px] right-[20px] h-[15px] w-[15px] bg-white blur-sm rounded-full"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SocialIcon = ({ 
  icon: Icon, 
  href, 
  label 
}: { 
  icon: React.ComponentType<{ className: string }>, 
  href: string, 
  label: string 
}) => {
  const { ref, position } = useMagneticHover(20); // Magnetic hover effect
  
  return (
    <motion.div
      ref={ref}
      className="relative"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
        mass: 0.5
      }}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block p-2 group"
        aria-label={label}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Icon */}
        <Icon className="w-5 h-5 relative z-10 text-[#006838] group-hover:text-[#004d2a] transition-colors duration-300" />
        
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#006838]/10 blur-md"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: 1.5,
            opacity: 1,
            transition: { type: "spring", stiffness: 400, damping: 17 }
          }}
        />

        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#006838]/5"
          initial={{ scale: 1 }}
          whileHover={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.2, 0.5],
            transition: { 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </motion.a>
    </motion.div>
  );
};

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/sobre-mi', label: 'Sobre mí' },
    { href: '/casos-de-exito', label: 'Casos de éxito' },
    { href: '/programas', label: 'Programas' },
    { href: '/contacto', label: 'Contacto' },
  ];

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
    },
    { 
      icon: FaTiktok, 
      href: 'https://www.tiktok.com/@catasuarezeducacion',
      label: 'TikTok'
    }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80"
      >
        <ScrollProgressBar />
        
        <div className="container mx-auto h-[70px] flex justify-between items-center px-8">
          {/* Logo Space */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-[120px]"
          >
            {/* Logo placeholder */}
          </motion.div>
          
          {/* Desktop Menu Items */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex justify-between w-[600px] font-futura-pt font-book">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <MenuItem
                    href={item.href}
                    label={item.label}
                    isActive={pathname === item.href}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Desktop Social Media Icons */}
          <motion.div 
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
              >
                <SocialIcon 
                  icon={social.icon} 
                  href={social.href} 
                  label={social.label} 
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 p-2 text-[#006838]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[70px] left-0 right-0 bg-white z-40 md:hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xl font-futura-pt font-book ${
                      pathname === item.href ? 'text-[#006838]' : 'text-[#2A2A2A]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-[#006838] flex items-center justify-center hover:bg-[#006838] transition-colors duration-300"
                    >
                      <social.icon className="w-6 h-6 text-[#006838] hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;