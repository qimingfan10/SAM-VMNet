import { Link } from 'react-router-dom';
import { ArrowRight, Github, Star, GitFork, Download, BookOpen, Zap, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-6">
              <a
                href="https://github.com/qimingfan10/SAM-VMNet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Star on GitHub</span>
              </a>
              <a
                href="https://huggingface.co/ly17/SAM-VMNet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-medium text-gray-700">🤗 Hugging Face</span>
              </a>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              <span className="text-gradient">SAM-VMNet</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto">
              Deep Learning for Coronary Artery Segmentation and Quantitative Stenosis Detection
            </p>

            <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              A state-of-the-art model combining Vision Mamba with SAM for precise medical image analysis
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link
                to="/demo"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Try Demo</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/docs"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg border border-gray-200"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Documentation</span>
              </Link>

              <a
                href="https://github.com/qimingfan10/SAM-VMNet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
              >
                <Github className="w-5 h-5" />
                <span className="font-semibold">View on GitHub</span>
              </a>
            </div>

            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-md border border-gray-200">
              <Award className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">
                Published in <span className="font-semibold text-primary-600">Medical Physics</span> (2025)
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced capabilities for medical image analysis and clinical decision support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Precise Segmentation</h3>
              <p className="text-gray-600">
                SAM-VMNet combines Vision Mamba (VMUnet) with SAM for accurate coronary artery segmentation in angiographic images
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Stenosis Detection</h3>
              <p className="text-gray-600">
                Quantitative stenosis detection with severity classification using Method of Moments for radius calculation
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clinical Validation</h3>
              <p className="text-gray-600">
                Peer-reviewed and published in Medical Physics journal with comprehensive validation on clinical datasets
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Architecture Overview
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                SAM-VMNet integrates Vision Mamba UNet with the Segment Anything Model to achieve state-of-the-art performance in coronary artery segmentation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Branch 1: VM-UNet</h4>
                    <p className="text-gray-600">Vision Mamba-based encoder-decoder for initial segmentation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Branch 2: SAM Integration</h4>
                    <p className="text-gray-600">Combines VM-UNet output with SAM for refined segmentation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Stenosis Analysis</h4>
                    <p className="text-gray-600">MATLAB-based quantitative stenosis detection and visualization</p>
                  </div>
                </div>
              </div>
              <Link
                to="/features"
                className="inline-flex items-center space-x-2 mt-8 text-primary-600 hover:text-primary-700 font-semibold"
              >
                <span>Learn more about the architecture</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="/samvm-net.jpg"
                  alt="SAM-VMNet Architecture - Two-branch framework combining VMUnet with SAM"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Figure: SAM-VMNet architecture combining Vision Mamba UNet with Segment Anything Model
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Download pre-trained models, explore documentation, or try the interactive demo
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/downloads"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span className="font-semibold">Download Models</span>
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Read Documentation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
