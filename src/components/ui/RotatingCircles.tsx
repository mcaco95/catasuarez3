import { motion } from 'framer-motion';

interface RotatingCirclesProps {
  className?: string;
  color?: string;
}

export default function RotatingCircles({ className = '', color = '#98B475' }: RotatingCirclesProps) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className={`w-[300px] h-[300px] rounded-full border-2 opacity-20`} style={{ borderColor: color }} />
      </motion.div>
      
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className={`w-[300px] h-[300px] rounded-full border-2 opacity-10`} style={{ borderColor: color }} />
      </motion.div>
      
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className={`w-[300px] h-[300px] rounded-full border-2 opacity-5`} style={{ borderColor: color }} />
      </motion.div>
    </div>
  );
} 