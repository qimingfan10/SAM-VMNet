# Deployment Guide

This guide explains how to deploy the SAM-VMNet website to various hosting platforms.

## Quick Deploy

The website is built and ready to deploy. The `dist/` folder contains all the production files.

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Using Netlify CLI:**
```bash
npm install -g netlify-cli
cd website
netlify deploy --prod --dir=dist
```

2. **Using Netlify Web Interface:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/` folder
   - Done!

### Option 2: Vercel

1. **Using Vercel CLI:**
```bash
npm install -g vercel
cd website
vercel --prod
```

2. **Using Vercel Web Interface:**
   - Go to [vercel.com](https://vercel.com)
   - Import from GitHub or upload the project
   - Build command: `npm run build`
   - Output directory: `dist`

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
cd website
npm install -D gh-pages
```

2. Add to package.json scripts:
```json
"deploy": "gh-pages -d dist"
```

3. Deploy:
```bash
npm run build
npm run deploy
```

### Option 4: Static File Server

Simply serve the `dist/` folder with any static file server:

```bash
# Using Python
cd website/dist
python -m http.server 8000

# Using Node.js serve
npx serve dist

# Using PHP
cd website/dist
php -S localhost:8000
```

## Build Settings

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18.x or higher

## Environment Variables

Make sure these are set in your deployment platform:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## SPA Routing Configuration

The website uses React Router for client-side routing. The following files ensure proper routing:

- `public/_redirects` - For Netlify
- `vercel.json` - For Vercel
- For other platforms, configure a rewrite rule to redirect all routes to `/index.html`

## Custom Domain

After deploying, you can configure a custom domain through your hosting platform's dashboard.

### DNS Configuration Example:
```
A     @     192.0.2.1
CNAME www   your-site.netlify.app
```

## SSL/HTTPS

Most modern hosting platforms (Netlify, Vercel) provide free SSL certificates automatically. No additional configuration needed.

## Performance Tips

The website is already optimized with:
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Lazy loading
- ✅ Gzip compression
- ✅ Minified CSS/JS

## Troubleshooting

### 404 on Page Refresh
Make sure SPA routing is properly configured (see above).

### Assets Not Loading
Check that the base path is correctly set in `vite.config.js`.

### Build Fails
- Ensure Node.js version is 18.x or higher
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Monitoring

Consider adding these services:
- Google Analytics for traffic monitoring
- Sentry for error tracking
- Lighthouse CI for performance monitoring

## Updates

To update the website:
1. Make changes to the code
2. Run `npm run build`
3. Deploy the new `dist/` folder

## Support

For deployment issues, refer to:
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/pages)
