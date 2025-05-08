'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExpand } from 'react-icons/fa';
import VideoTheater from './VideoTheater';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/utils/cloudinary';

interface VideoEmbedProps {
  videoId: string;
  title: string;
  thumbnailUrl?: string;
}

const VideoEmbed = ({ videoId, title, thumbnailUrl }: VideoEmbedProps) => {
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const imageUrl = thumbnailUrl 
    ? getCloudinaryUrl(thumbnailUrl)
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative group">
      <motion.div
        className="relative aspect-video w-full rounded-xl overflow-hidden shadow-xl bg-black/5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <button
          onClick={() => setIsTheaterMode(true)}
          className="w-full h-full relative group"
          aria-label={`Play ${title}`}
        >
          {/* Thumbnail */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 z-10" />
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
            alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
          />
          </div>
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-[#006838] border-b-[12px] border-b-transparent ml-2" />
            </div>
          </div>

          {/* Expand Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute top-4 right-4 text-white group-hover:opacity-100 transition-opacity z-20"
          >
            <FaExpand className="w-6 h-6" />
          </motion.div>
        </button>
      </motion.div>

      <VideoTheater
        videoId={videoId}
        title={title}
        isOpen={isTheaterMode}
        onClose={() => setIsTheaterMode(false)}
      />
    </div>
  );
};

export default VideoEmbed; 