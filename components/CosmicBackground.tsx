'use client'

import { useEffect, useRef } from 'react'

const romanticWords = [
  "Amour", "Passion", "Éternité", "Béguin", "Désir", "Tendresse", 
  "Cherie", "Mon cœur", "Bisou", "Calin", "Romance", "Folie",
  "Étoile", "Rêve", "Magie", "Douceur", "Caresse", "Souffle"
]

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const stars: Array<{
      x: number
      y: number
      radius: number
      color: string
      speed: number
      word: string
      opacity: number
    }> = []

    // Initialize stars
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `hsl(${280 + Math.random() * 40}, 70%, ${60 + Math.random() * 20}%)`,
        speed: Math.random() * 0.5 + 0.1,
        word: romanticWords[Math.floor(Math.random() * romanticWords.length)],
        opacity: Math.random() * 0.5 + 0.3
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 5, 35, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star, index) => {
        star.y += star.speed
        
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
          star.word = romanticWords[Math.floor(Math.random() * romanticWords.length)]
        }

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()

        // Draw word when star is in center
        if (star.y > canvas.height * 0.3 && star.y < canvas.height * 0.7) {
          ctx.save()
          ctx.globalAlpha = star.opacity
          ctx.fillStyle = 'white'
          ctx.font = '12px serif'
          ctx.textAlign = 'center'
          ctx.fillText(star.word, star.x, star.y - 15)
          ctx.restore()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{
        background: 'linear-gradient(135deg, #0f0523 0%, #1a0b3d 25%, #2d1b69 50%, #4c1d95 75%, #6b21a8 100%)'
      }}
    />
  )
}