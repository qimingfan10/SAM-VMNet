import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, FileText, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('Home', '首页'), path: '/' },
    { name: t('About', '关于'), path: '/about' },
    { name: t('Features', '特性'), path: '/features' },
    { name: t('Demo', '演示'), path: '/demo' },
    { name: t('Documentation', '文档'), path: '/docs' },
    { name: t('Downloads', '下载'), path: '/downloads' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SAM-VMNet</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title={t('Switch to Chinese', '切换到英文')}
            >
              <Languages className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium">{language === 'en' ? '中文' : 'EN'}</span>
            </button>
            <a
              href="https://github.com/qimingfan10/SAM-VMNet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="https://doi.org/10.1002/mp.17970"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FileText className="w-5 h-5 text-white" />
              <span className="text-sm font-medium">{t('Paper', '论文')}</span>
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <Languages className="w-5 h-5 text-gray-700" />
                <span>{language === 'en' ? '中文' : 'English'}</span>
              </div>
            </button>
            <a
              href="https://github.com/qimingfan10/SAM-VMNet"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <Github className="w-5 h-5 text-gray-700" />
                <span>GitHub</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
