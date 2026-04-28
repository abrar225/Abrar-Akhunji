import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete, theme }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING_SYSTEM");

  const loadingTexts = [
    "LOADING_ASSETS",
    "COMPILING_SHADERS",
    "CONNECTING_NEURAL_NET",
    "FETCHING_DATA",
    "SYSTEM_READY"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Change text based on progress milestones
        const index = Math.floor((prev / 100) * loadingTexts.length);
        setText(loadingTexts[Math.min(index, loadingTexts.length - 1)]);
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[#030303] text-white' : 'bg-[#f8f9fa] text-black'}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-[300px] font-mono text-xs md:text-sm">
        <div className="flex justify-between mb-2 text-gray-500">
          <span>STATUS</span>
          <span className="text-purple-500 animate-pulse">PROCESSING</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/10 mb-4 relative overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">
            {`> ${text}...`}
          </span>
          <span className="font-bold text-purple-400 text-xl">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
