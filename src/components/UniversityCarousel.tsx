'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const universities = [
  {
    name: 'Harvard University',
    logo: '/images/universities/harvard.png', // Placeholder path
    location: 'Cambridge, MA'
  },
  {
    name: 'Universidad Pontificia Bolivariana',
    logo: '/images/universities/upb.png', // Placeholder path
    location: 'Medellín, Colombia'
  },
  {
    name: 'University of Queensland',
    logo: '/images/universities/uq.png', // Placeholder path
    location: 'Brisbane, Australia'
  }
];

const UniversityCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % universities.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + universities.length) % universities.length);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#F8FAF5] to-white rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-[#D3DCCA] rounded-lg opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[#006838] font-futura-pt font-heavy">
                  {universities[currentIndex].name}
                </p>
              </div>
            </div>
            <p className="text-[#2A2A2A] font-futura-pt font-book">
              {universities[currentIndex].location}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {universities.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#006838] w-4' : 'bg-[#98B475]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default UniversityCarousel; 