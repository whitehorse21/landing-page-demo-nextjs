# Travel Landing Page - Next.js

A modern, responsive travel landing page converted from React/Vite to Next.js, featuring Light/Dark Theme, Multilanguage support (EN, ES, FR, NL), and a complete dashboard.

## Features

- 🎨 Modern, clean design with a travel theme
- 📱 Fully responsive layout (mobile, tablet, desktop)
- ⚡ Built with Next.js 14+ (App Router) for optimal performance
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling with dark mode support
- 🌍 Multilanguage support (English, Spanish, French, Dutch)
- 🌓 Light/Dark theme toggle
- 🔐 Authentication system
- 📊 Dashboard with bookings, payments, messages, and settings
- 🧩 Modular component architecture
- 🚀 Server-side rendering and static generation support

## Conversion Status

This project has been converted from the original React/Vite project. See `CONVERSION_STATUS.md` for detailed conversion progress.

**Core infrastructure is complete:**
- ✅ All contexts (Theme, Language, Auth)
- ✅ Custom hooks (useScrollAnimation, useCountUp)
- ✅ Locale files and data
- ✅ Next.js configuration
- ⚠️ Components are being converted (see CONVERSION_STATUS.md)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be optimized for production.

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
landing-page-demo-nextjs/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── AboutUs.tsx        # About Us section
│   ├── Services.tsx       # Services section
│   ├── Experience.tsx     # Experience section
│   ├── Testimonials.tsx  # Customer testimonials
│   ├── Subscribe.tsx     # Newsletter subscription
│   └── Footer.tsx        # Footer component
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Technologies Used

- **Next.js 14+** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

## Key Differences from React/Vite Version

- Uses Next.js App Router instead of React Router
- Server-side rendering capabilities
- Built-in file-based routing system
- Optimized image handling (Next.js Image component)
- Better SEO out of the box
- API routes support
- Client components marked with `'use client'` directive
- Server components by default

## Project Structure

```
landing-page-demo-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── dashboard/          # Dashboard pages (to be created)
├── components/             # React components
│   ├── Header.tsx          # Navigation (needs conversion)
│   ├── Hero.tsx           # Hero section (needs conversion)
│   └── ...                # Other components
├── contexts/               # React contexts
│   ├── ThemeContext.tsx    # Theme management ✅
│   ├── LanguageContext.tsx # i18n support ✅
│   └── AuthContext.tsx    # Authentication ✅
├── hooks/                  # Custom hooks
│   ├── useScrollAnimation.ts ✅
│   └── useCountUp.ts      ✅
├── locales/                # Translation files
│   ├── en.json            ✅
│   ├── es.json            ⚠️
│   ├── fr.json            ⚠️
│   └── nl.json            ⚠️
├── data/                   # Static data
│   └── blogPosts.json     ✅
└── ...
```

## Customization

### Colors

The primary color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#10b981', // emerald-500
    light: '#34d399',   // emerald-400
    dark: '#059669',    // emerald-600
  },
}
```

### Components

All components are modular and can be easily customized or extended. Each component is self-contained in the `components/` directory.

## Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build

### Other Platforms

Next.js can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## License

MIT

## About

Travel Landing page built with Next.js, featuring Light/Dark Theme support and multilingual capabilities.
