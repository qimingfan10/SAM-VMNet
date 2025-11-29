# SAM-VMNet Website

This is the official website for the SAM-VMNet research project - a deep learning model for coronary artery segmentation and quantitative stenosis detection.

## 🚀 Quick Start

### Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
website/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx   # Navigation bar
│   │   └── Footer.jsx   # Footer component
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Homepage
│   │   ├── About.jsx    # About page
│   │   ├── Features.jsx # Features page
│   │   ├── Demo.jsx     # Demo page
│   │   ├── Documentation.jsx  # Documentation hub
│   │   └── Downloads.jsx      # Downloads page
│   ├── lib/             # Utilities
│   │   └── supabase.js  # Supabase client
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── .env                 # Environment variables
└── package.json         # Dependencies

```

## 🎨 Features

- **Modern Design**: Clean, professional interface built with React and TailwindCSS
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Vite for optimal loading speed
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Interactive Documentation**: Comprehensive guides and examples
- **Resource Hub**: Easy access to pre-trained models and datasets

## 🛠 Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Next-generation frontend tooling
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icon library
- **Supabase**: Backend infrastructure (for future features)

## 📄 Pages

- **Home**: Project overview and quick links
- **About**: Detailed information about the research and methodology
- **Features**: Technical capabilities and architecture
- **Demo**: Interactive demonstration and sample results
- **Documentation**: Complete installation and usage guide
- **Downloads**: Pre-trained models and datasets

## 🔧 Configuration

### Environment Variables

The project uses environment variables for Supabase configuration. These are already set up in the `.env` file:

- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_SUPABASE_ANON_KEY`: Supabase anonymous key

## 📝 License

This website is part of the SAM-VMNet project, licensed under the Apache-2.0 License.

## 🤝 Contributing

This is the official website for a published research project. For issues or suggestions, please open an issue on the main GitHub repository.

## 📧 Contact

For questions about the research or the website, please refer to the Contact section on the website or open an issue on GitHub.
