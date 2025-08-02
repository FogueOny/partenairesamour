'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Copy, Check, Sparkles } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import CosmicBackground from '@/components/CosmicBackground'

export default function CreatePage() {
  const [recipientName, setRecipientName] = useState('')
  const [loveMessage, setLoveMessage] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [errors, setErrors] = useState<{name?: string, message?: string}>({})

  const validateForm = () => {
    const newErrors: {name?: string, message?: string} = {}
    
    if (!recipientName.trim()) {
      newErrors.name = 'Le prénom est obligatoire'
    }
    
    if (!loveMessage.trim()) {
      newErrors.message = 'Le message d\'amour est obligatoire'
    } else if (loveMessage.length > 500) {
      newErrors.message = 'Le message ne peut pas dépasser 500 caractères'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            recipient_name: recipientName.trim(),
            love_message: loveMessage.trim()
          }
        ])
        .select()
        .single()

      if (error) throw error

      const link = `${window.location.origin}/love?id=${data.id}`
      setGeneratedLink(link)
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      alert('Une erreur s\'est produite. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
    }
  }

  const resetForm = () => {
    setRecipientName('')
    setLoveMessage('')
    setGeneratedLink('')
    setErrors({})
    setIsCopied(false)
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center relative overflow-hidden">
      <CosmicBackground />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-purple-300" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Message d'Amour
            </h1>
            <p className="text-purple-200">
              Créez un message romantique personnalisé
            </p>
          </motion.div>

          {!generatedLink ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-purple-200 mb-2">
                  Prénom de votre bien-aimée *
                </label>
                <Input
                  type="text"
                  id="recipientName"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-purple-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors ${
                    errors.name ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="Sarah, Marie, Emma..."
                  maxLength={100}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="loveMessage" className="block text-sm font-medium text-purple-200 mb-2">
                  Votre message d'amour *
                </label>
                <Textarea
                  id="loveMessage"
                  value={loveMessage}
                  onChange={(e) => setLoveMessage(e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-purple-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors resize-none ${
                    errors.message ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="Tu es la lumière de ma vie, celle qui illumine mes journées..."
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message && (
                    <p className="text-red-400 text-sm">{errors.message}</p>
                  )}
                  <p className="text-purple-300 text-sm ml-auto">
                    {loveMessage.length}/500
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Création en cours...
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Créer le message d'amour
                    <Sparkles className="w-5 h-5" />
                  </span>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  ✨ Message créé avec succès !
                </h3>
                <p className="text-purple-200 text-sm">
                  Votre lien magique est prêt à être partagé
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                <p className="text-sm text-purple-200 mb-2">Votre lien à partager :</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-purple-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                </div>
                {isCopied && (
                  <p className="text-green-400 text-sm mt-2">✓ Lien copié !</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetForm}
                className="w-full bg-purple-500/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/20 hover:bg-purple-500/30 transition-all duration-200"
              >
                Créer un nouveau message
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}