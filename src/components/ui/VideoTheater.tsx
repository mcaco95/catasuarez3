import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface VideoTheaterProps {
  videoId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoTheater({ videoId, title, isOpen, onClose }: VideoTheaterProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-10 z-50 flex flex-col bg-black rounded-xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 bg-black/50">
              <h3 className="text-white font-semibold truncate pr-4">{title}</h3>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 relative">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 