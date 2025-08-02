'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Gift, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-5xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-600 rounded-2xl shadow-lg mb-6">
              <Heart className="w-10 h-10 text-white fill-current" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-6"
          >
            Messages d'amour
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Créez et partagez des messages romantiques avec une touche personnelle et élégante
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/create">
              <Button size="lg" className="text-lg px-8 py-6">
                <Heart className="w-5 h-5 mr-2" />
                Créer un message
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                <MessageCircle className="w-5 h-5 text-rose-500" />
                Messages personnalisés
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Avec le prénom de votre bien-aimée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Chaque message est unique et adapté à votre histoire d'amour
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                <Heart className="w-5 h-5 text-rose-500" />
                Design élégant
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Interface moderne et raffinée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Un design sobre et élégant qui met en valeur votre message
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                <Gift className="w-5 h-5 text-rose-500" />
                Partage simple
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Un lien unique à partager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Un lien privé que vous pouvez partager en toute simplicité
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}