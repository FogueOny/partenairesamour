'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { supabase, type LoveMessage } from '../../lib/supabase'
import EnvelopeAnimation from '../../components/EnvelopeAnimation'
import { Card, CardContent, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

import { Suspense } from 'react'

function LoveContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  
  const [message, setMessage] = useState<LoveMessage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessage = async () => {
      if (!id) {
        setError('Aucun identifiant de message fourni')
        setLoading(false)
        return
      }

      try {
        console.log('Fetching message with ID:', id)
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('id', id)
          .single()

        console.log('Supabase response:', { data, error })

        if (error) {
          console.error('Supabase error details:', error)
          throw error
        }

        if (!data) {
          setError('Message non trouvé')
        } else {
          setMessage(data)
        }
      } catch (error: any) {
        console.error('Erreur lors de la récupération:', error)
        setError(`Erreur: ${error.message || 'Ce message d\'amour n\'existe pas ou a expiré'}`)
      } finally {
        setLoading(false)
      }
    }

    fetchMessage()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Heart className="w-12 h-12 text-rose-500 fill-current" />
            </motion.div>
            <CardTitle className="text-slate-900 dark:text-slate-50 mb-2">
              Chargement...
            </CardTitle>
            <CardDescription>
              Préparation de votre message d'amour
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !message) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
            <div className="mb-4">
              <Heart className="w-16 h-16 text-rose-500 mx-auto opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Message introuvable
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {error || 'Ce message n\'existe pas ou a été supprimé'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              ID: {id || 'non fourni'}
            </p>
            <Link href="/create">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Nouveau message
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Envelope Container */}
          <div className="relative">
            {/* Wax Seal */}
            <motion.div 
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            >
              <div className="w-12 h-12 bg-red-600 rounded-full shadow-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            
            {/* Envelope */}
            <div className="bg-gradient-to-b from-red-100 to-red-50 dark:from-slate-800 dark:to-slate-700 rounded-t-3xl shadow-2xl border border-red-200 dark:border-slate-600">
              {/* Envelope Flap */}
              <motion.div 
                className="h-16 bg-gradient-to-r from-red-200 to-red-100 dark:from-slate-700 dark:to-slate-600 rounded-t-3xl border-b-2 border-red-300 dark:border-slate-500 relative overflow-hidden"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-300/20 dark:to-slate-600/20"></div>
              </motion.div>
              
              {/* Letter Content */}
              <motion.div 
                className="bg-gradient-to-b from-stone-50 to-stone-100 dark:from-slate-800 dark:to-slate-700 p-8 mx-4 -mt-8 rounded-2xl shadow-inner relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d1d5db' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
              >
                {/* Paper Texture */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 bg-gradient-to-tl from-pink-100 to-transparent rounded-full blur-xl"></div>
                </div>
                
                {/* Header */}
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h1 className="text-4xl font-serif italic text-red-800 dark:text-red-400 mb-2">
                    Mon Cher {message.recipient_name}
                  </h1>
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent mx-auto"></div>
                </motion.div>
                
                {/* Message Content */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <EnvelopeAnimation 
                    recipientName={message.recipient_name}
                    loveMessage={message.love_message}
                  />
                </motion.div>
                
                {/* Signature Area */}
                <motion.div 
                  className="mt-8 text-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Avec tout mon amour,
                  </p>
                  <p className="text-lg font-serif italic text-red-700 dark:text-red-300">
                    {message.sender_name ?? 'Quelqu\'un qui t\'aime'}
                  </p>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Bottom of envelope */}
            <motion.div 
              className="bg-gradient-to-t from-red-200 to-red-100 dark:from-slate-700 dark:to-slate-600 h-8 rounded-b-3xl shadow-lg"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4 }}
            ></motion.div>
          </div>
          
          {/* Footer */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <Link href="/create">
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Heart className="w-4 h-4 mr-2" />
                Écrire une autre lettre d'amour
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function LovePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Heart className="w-12 h-12 text-pink-500 fill-current" />
          </motion.div>
          <p className="text-gray-600 text-lg">
            Chargement de votre message d'amour...
          </p>
        </motion.div>
      </div>
    }>
      <LoveContent />
    </Suspense>
  )
}