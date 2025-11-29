import { Github, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-white">SAM-VMNet</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md mb-4">
              Deep learning model for coronary artery segmentation and quantitative stenosis detection in angiographic images.
            </p>
            <p className="text-xs text-gray-500">
              Published in Medical Physics (2025)
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm hover:text-primary-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-sm hover:text-primary-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-sm hover:text-primary-400 transition-colors">
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/qimingfan10/SAM-VMNet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary-400 transition-colors flex items-center space-x-1"
                >
                  <Github className="w-4 h-4 text-gray-300" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://doi.org/10.1002/mp.17970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary-400 transition-colors flex items-center space-x-1"
                >
                  <FileText className="w-4 h-4 text-gray-300" />
                  <span>Paper</span>
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/ly17/SAM-VMNet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  Hugging Face
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 SAM-VMNet. Licensed under Apache-2.0.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://github.com/qimingfan10/SAM-VMNet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5 text-gray-400" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
