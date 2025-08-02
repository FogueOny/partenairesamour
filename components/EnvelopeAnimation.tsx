'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Heart } from 'lucide-react'

interface EnvelopeAnimationProps {
  recipientName: string
  loveMessage: string
}

import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'

export default function EnvelopeAnimation({ recipientName, loveMessage }: EnvelopeAnimationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true)
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 3000)
    }
  }

  // Génération des cœurs pour la pluie (avec vérification SSR)
  const hearts = typeof window !== 'undefined' ? Array.from({ length: 20 }, (_, i) => {
    const x = Math.random() * window.innerWidth
    const duration = 3 + Math.random() * 2
    return {
      id: i,
      x: Math.random() * 100 - 50,
      left: `${x}px`,
      top: `${window.innerHeight}px`,
      duration,
      color: `hsl(${Math.random() * 60 + 300}, 70%, 60%)`
    }
  }) : []

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence>
        {showHearts && hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0.5, 1, 0.8],
              y: -800,
              x: heart.x,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: heart.duration, 
              ease: "easeOut" 
            }}
            className="fixed pointer-events-none z-50"
            style={{ left: heart.left, top: heart.top }}
          >
            <Heart className="w-6 h-6 text-rose-500 fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={handleOpen}
            >
              <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <Heart className="w-16 h-16 text-rose-500 fill-current" />
                  </motion.div>
                  <CardTitle className="text-2xl mb-2">Un message spécial</CardTitle>
                  <CardDescription>Pour {recipientName}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="relative">
              {/* Floating Hearts Background */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ 
                      x: Math.random() * 100 + '%', 
                      y: '100%',
                      opacity: 0 
                    }}
                    animate={{ 
                      y: '-100%', 
                      opacity: [0, 1, 0],
                      x: [null, Math.random() * 20 - 10 + '%']
                    }}
                    transition={{ 
                      duration: 8 + Math.random() * 4, 
                      delay: i * 0.5 + 1,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  >
                    <Heart className="w-3 h-3 text-red-300 fill-current" />
                  </motion.div>
                ))}
              </div>
              
              {/* Letter Content */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                {/* Paper Fold Lines */}
                <div className="absolute inset-0 border-l-2 border-r-2 border-red-100/20 dark:border-red-900/20 rounded-2xl"></div>
                <div className="absolute inset-0 border-t border-b border-red-100/10 dark:border-red-900/10 rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10 px-4 py-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    {/* Decorative Header */}
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
                      <Heart className="w-4 h-4 mx-2 text-red-400 fill-current" />
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
                    </div>
                    
                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="text-center"
                    >
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-serif italic">
                        {loveMessage}
                      </p>
                    </motion.div>
                    
                    {/* Decorative Footer */}
                    <div className="flex justify-center mt-6">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}