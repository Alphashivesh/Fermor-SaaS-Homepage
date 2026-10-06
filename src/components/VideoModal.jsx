import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-video-modal', handleOpen);
    return () => window.removeEventListener('open-video-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
          {/* Deep Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-xl"
          />
          
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] border border-slate-800"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-900/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-full backdrop-blur-md transition-colors border border-slate-700/50"
            >
              <X size={20} />
            </button>

            {/* GOOGLE DRIVE PREVIEW EMBED */}
            <iframe
              className="w-full h-full"
              src="https://drive.google.com/file/d/1kRl0DQXdNxhuH8c4R1W92J9uLupgwKCW/preview"
              title="Fermor Interactive Demo"
              frameBorder="0"
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
