# Déploiement sur Netlify

## Configuration pour amourcm.netlify.app

Ce projet est configuré pour être déployé sur Netlify à l'adresse [amourcm.netlify.app](https://amourcm.netlify.app).

## Étapes de déploiement

1. Créez un compte sur [Netlify](https://www.netlify.com/) si vous n'en avez pas déjà un.

2. Connectez votre dépôt GitHub à Netlify.

3. Configurez les paramètres de déploiement :
   - **Build command** : `npm run build`
   - **Publish directory** : `out`

4. Configurez le nom de domaine personnalisé :
   - Dans les paramètres du site, allez à "Domain settings"
   - Cliquez sur "Add custom domain"
   - Entrez `amourcm.netlify.app`

5. Configurez les variables d'environnement :
   - Ajoutez les variables d'environnement nécessaires pour Supabase dans les paramètres du site

## Architecture du projet

Ce projet utilise :
- **Next.js** pour le rendu statique et les routes
- **Vite** pour le développement local rapide

Pour le déploiement sur Netlify, nous utilisons uniquement Next.js avec l'option `output: 'export'` pour générer un site statique.

## Pourquoi Next.js et Vite ?

Le projet utilise à la fois Next.js et Vite pour différentes raisons :

1. **Next.js** : Utilisé pour les fonctionnalités de routage avancées et la génération de sites statiques.

2. **Vite** : Utilisé pour le développement local rapide avec rechargement à chaud.

Pour le déploiement en production, seul Next.js est utilisé pour générer les fichiers statiques.