'use client';

import Hero from '../components/ui/Hero';
import About from '../components/ui/About';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import QuoteSection from '../components/ui/QuoteSection';

export default function Home() {
  return (
    <PageTransition>
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <QuoteSection />
          <About />
        </motion.div>
      </main>
    </PageTransition>
  );
}
