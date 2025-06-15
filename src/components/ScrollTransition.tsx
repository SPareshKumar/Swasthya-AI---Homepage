import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from './useScrollAnimation';

const ScrollTransition: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { scrollProgress } = useScrollAnimation();
  
  // Transform values based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.2, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
        style={{ opacity, scale }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Morphing Shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ y }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-teal-500/10 to-green-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
      />

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 to-blue-500"
          style={{ 
            scaleX: scrollYProgress,
            transformOrigin: "0%" 
          }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60"
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollProgress > 0.1 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm mb-2 font-light tracking-wide">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full relative"
          animate={{ borderColor: ["rgba(255,255,255,0.3)", "rgba(20,184,166,0.6)", "rgba(255,255,255,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-teal-400 rounded-full absolute left-1/2 transform -translate-x-1/2"
            animate={{ y: [2, 20, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-white rotate-45"
          animate={{ rotate: [45, 225, 45] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-24 h-24 border border-teal-400"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default ScrollTransition;