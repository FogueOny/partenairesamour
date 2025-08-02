/** @type {import('next').NextConfig} */
const nextConfig = {
  // L'option appDir n'est plus nécessaire dans Next.js 15
  // car elle est activée par défaut
  output: 'export',
  images: {
    unoptimized: true
  },
  // Configuration pour le déploiement sur Netlify
  trailingSlash: true,
  // Optimisations pour accélérer le build
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  // Désactiver la génération de source maps en production pour accélérer le build
  productionBrowserSourceMaps: false,
  // Optimiser le bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      };
    }
    return config;
  }
}

export default nextConfig