/** @type {import('next').NextConfig} */
const nextConfig = {
  // L'option appDir n'est plus nécessaire dans Next.js 15
  // car elle est activée par défaut
  output: 'export',
  images: {
    unoptimized: true
  },
  // Configuration pour le déploiement sur Netlify
  trailingSlash: true
}

export default nextConfig