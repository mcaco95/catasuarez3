'use client';

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HiMail } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';

const ContactInput = ({ label, type, value, onChange, required = true, as = 'input' }: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  as?: 'input' | 'textarea' | 'select';
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value);
    setHasValue(e.target.value.length > 0);
  };
  
  return (
    <motion.div 
      className="relative mb-4 md:mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <label 
        className={`absolute left-3 transition-all duration-300 pointer-events-none font-futura-pt font-book
          ${(isFocused || hasValue) ? 'text-xs -top-2 bg-white px-2 text-[#006838]' : 'text-gray-500 top-3'}`}
      >
        {label}
      </label>
      {as === 'select' ? (
        <select
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#006838] font-futura-pt font-book bg-white transition-all duration-300 text-sm md:text-base"
        >
          <option value="padre">Padre/Madre</option>
          <option value="educador">Educador</option>
          <option value="otro">Otro</option>
        </select>
      ) : as === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          rows={4}
          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#006838] font-futura-pt font-book resize-none transition-all duration-300 text-sm md:text-base"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#006838] font-futura-pt font-book transition-all duration-300 text-sm md:text-base"
        />
      )}
    </motion.div>
  );
};

const ContactLink = ({ icon: Icon, href, label, text }: { 
  icon: React.ComponentType<{ className: string }>, 
  href: string, 
  label: string, 
  text: string 
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 md:gap-4 group"
    whileHover={{ x: 5 }}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#006838]/5 flex items-center justify-center group-hover:bg-[#006838]/10 transition-all duration-300 flex-shrink-0">
      <Icon className="text-lg md:text-xl text-[#006838]" />
    </div>
    <div>
      <p className="text-xs md:text-sm text-gray-500 font-futura-pt font-book">{label}</p>
      <p className="text-sm md:text-base text-gray-800 font-futura-pt font-heavy break-words">{text}</p>
    </div>
  </motion.a>
);

const Contacto = () => {
  const { scrollY } = useScroll();
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'padre'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be implemented later
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - MODIFIED FOR TWO COLUMNS */}
      <motion.section 
        className="relative min-h-screen md:h-screen flex flex-col md:flex-row overflow-hidden bg-[#F0F3EE]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        {/* Left Column (Text & Background) */}
        <div className="w-full md:w-1/2 lg:w-3/5 bg-[#F0F3EE] p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-center order-2 md:order-1">
          <motion.div 
            className="max-w-xl"
            {...(isTouch ? mobileAnimationProps : {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.4 }
            })}
          >
            <h1 className="text-5xl md:text-6xl font-heavy font-futura-pt mb-4 md:mb-6 text-[#004422] leading-tight">
              Conectemos y transformemos <br />
              <span className="text-[#5C8A3F]">juntos</span>
            </h1>
            <p className="text-lg md:text-xl font-book font-futura-pt text-gray-700 leading-relaxed max-w-lg md:max-w-2xl">
              Estoy aquí para escucharte y ayudarte a alcanzar tu máximo potencial.
              Cada conversación es un paso hacia el cambio positivo.
            </p>
          </motion.div>
        </div>

        {/* Right Column (Image) */}
        <div className="w-full md:w-1/2 lg:w-2/5 h-[65vh] sm:h-[75vh] md:h-full relative order-1 md:order-2">
          <Image
            src="https://res.cloudinary.com/dqgqrvnnw/image/upload/v1746713527/foto_cata_mem5l8.jpg"
            alt="Catalina Suárez - Contacto"
            fill
            className="object-cover object-center md:object-[center_top]"
            quality={90}
            priority
          />
        </div>
        
        {/* Mobile Scroll Down Hint - Retained but might need style adjustments if it overlaps weirdly now */}
        {isTouch && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center z-20 order-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-gray-600/50 rounded-full flex justify-center p-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              <motion.div
                className="w-1 h-2 bg-gray-700/80 rounded-full"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              />
            </motion.div>
            <motion.span
              className="text-gray-600/80 text-xs md:text-sm mt-2 font-futura-pt font-book"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            >
              Desliza hacia abajo
            </motion.span>
          </motion.div>
        )}
      </motion.section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Contact Information */}
              <div className="space-y-8 md:space-y-12">
                <div>
                  <motion.h2 
                    className="text-2xl md:text-3xl font-heavy font-futura-pt text-[#006838] mb-3 md:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Información de Contacto
                  </motion.h2>
                  <motion.p 
                    className="text-sm md:text-base text-gray-600 font-futura-pt font-book"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Elige el medio que prefieras para conectar conmigo.
                  </motion.p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <ContactLink
                    icon={FaMapMarkerAlt}
                    href="https://maps.google.com/?q=Barranquilla,Colombia"
                    label="Ubicación"
                    text="Barranquilla, Colombia"
                  />
                  <ContactLink
                    icon={HiMail}
                    href="mailto:catasuarezeducacion@gmail.com"
                    label="Email"
                    text="catasuarezeducacion@gmail.com"
                  />
                  <ContactLink
                    icon={FaWhatsapp}
                    href="https://wa.me/573132933130"
                    label="WhatsApp"
                    text="+57 313 293 3130"
                  />
                </div>

                <motion.div 
                  className="pt-6 md:pt-8 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-base md:text-lg font-heavy font-futura-pt text-gray-800 mb-3 md:mb-4">Sígueme en redes sociales</h3>
                  <div className="flex gap-3 md:gap-4">
                    {[
                      { icon: FaInstagram, href: 'https://www.instagram.com/catasuarezeducacion', label: 'Instagram' },
                      { icon: FaFacebook, href: 'https://www.facebook.com/share/ReZFk9ZBQrzSofF2/', label: 'Facebook' },
                      { icon: FaLinkedin, href: 'https://www.linkedin.com/in/catalina-su%C3%A1rez-p%C3%A9rez-25337914a', label: 'LinkedIn' },
                      { icon: FaYoutube, href: 'https://youtube.com/@catasuarez6063', label: 'YouTube' }
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#006838]/5 flex items-center justify-center hover:bg-[#006838]/10 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <social.icon className="text-base md:text-lg text-[#006838]" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Contact Form */}
              <div>
                <motion.h2 
                  className="text-2xl md:text-3xl font-heavy font-futura-pt text-[#006838] mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Envíame un mensaje
                </motion.h2>
                
                <form onSubmit={handleSubmit} className="space-y-1 md:space-y-2">
                  <ContactInput
                    label="Nombre completo"
                    type="text"
                    value={formData.name}
                    onChange={(value) => setFormData({ ...formData, name: value })}
                  />
                  
                  <ContactInput
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => setFormData({ ...formData, email: value })}
                  />
                  
                  <ContactInput
                    label="Teléfono"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value })}
                  />
                  
                  <ContactInput
                    label="Soy"
                    value={formData.type}
                    onChange={(value) => setFormData({ ...formData, type: value })}
                    as="select"
                  />
                  
                  <ContactInput
                    label="Mensaje"
                    value={formData.message}
                    onChange={(value) => setFormData({ ...formData, message: value })}
                    as="textarea"
                  />

                  <motion.button
                    type="submit"
                    className="w-full mt-4 md:mt-6 bg-[#006838] text-white py-3 md:py-4 rounded-lg hover:bg-[#005830] transition-all duration-300 font-heavy font-futura-pt relative overflow-hidden group text-sm md:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="relative z-10">Enviar mensaje</span>
                    <motion.div
                      className="absolute inset-0 bg-[#98B475] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      animate={{ scale: [0.9, 1], opacity: [0, 1] }}
                      exit={{ scale: 0.9, opacity: 0 }}
                    />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto; 