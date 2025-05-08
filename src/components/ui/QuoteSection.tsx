import { motion } from 'framer-motion';

const QuoteSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl md:text-3xl font-heavy font-futura-pt text-gray-900 leading-tight">
              &ldquo;UN EDUCADOR <span className="text-[#98b475]">TRANSFORMADOR</span>,<br />
              SE TRANSFORMA PRIMERO A SÍ MISMO&rdquo;
            </p>
            <span className="block mt-4 text-lg md:text-xl font-book italic text-[#98b475]/90">— Catalina Suárez</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection; 