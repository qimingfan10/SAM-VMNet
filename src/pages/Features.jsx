import { Brain, Layers, TrendingUp, Zap, CheckCircle, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('Key', '核心')} <span className="text-gradient">{t('Features', '特性')}</span>
          </h1>
          <p className="text-xl text-gray-600">
            {t('Advanced capabilities powered by state-of-the-art deep learning architectures', '由最先进的深度学习架构驱动的高级功能')}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{t('Vision Mamba Architecture', 'Vision Mamba 架构')}</h2>
              </div>
              <p className="text-gray-700 mb-4">
                {t('Leverages the power of Vision Mamba (VMamba) for efficient processing of medical images with long-range dependencies.', '利用 Vision Mamba (VMamba) 的力量高效处理具有长距离依赖性的医学图像。')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{t('Efficient long-range dependency modeling', '高效的长距离依赖建模')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{t('Linear computational complexity', '线性计算复杂度')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{t('Optimized for medical image characteristics', '针对医学图像特征优化')}</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{t('SAM Integration', 'SAM 集成')}</h2>
              </div>
              <p className="text-gray-700 mb-4">
                {t('Integrates the Segment Anything Model to refine segmentation results and handle edge cases.', '集成 Segment Anything Model 以精化分割结果并处理边缘情况。')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Foundation model capabilities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Improved boundary detection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Robust to image variations</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{t('Quantitative Stenosis Detection', '定量狭窄检测')}</h2>
              </div>
              <p className="text-gray-700 mb-4">
                {t('Advanced MATLAB-based module for precise stenosis detection and quantification.', '基于 MATLAB 的高级模块，用于精确的狭窄检测和量化。')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Centerline extraction using skeletonization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Method of Moments radius calculation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Automatic severity classification</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{t('Clinical Visualization', '临床可视化')}</h2>
              </div>
              <p className="text-gray-700 mb-4">
                {t('Intuitive color-coded visualization system for immediate clinical interpretation.', '直观的彩色编码可视化系统，便于立即进行临床解读。')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-medical-red rounded-full mt-0.5 flex-shrink-0"></div>
                  <span className="text-gray-700">Red markers for severe stenosis (&gt;75%)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-medical-green rounded-full mt-0.5 flex-shrink-0"></div>
                  <span className="text-gray-700">Green markers for moderate stenosis (50-75%)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-medical-blue rounded-full mt-0.5 flex-shrink-0"></div>
                  <span className="text-gray-700">Blue markers for mild stenosis (25-50%)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('Two-Branch Architecture', '双分支架构')}</h2>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t('Branch 1: Pure VM-UNet', '分支 1：纯 VM-UNet')}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                The first branch uses a pure Vision Mamba UNet architecture to perform initial segmentation of coronary arteries.
              </p>
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h4 className="font-semibold text-gray-900 mb-2">Training Process:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Trained independently on angiographic images</li>
                  <li>• Generates initial segmentation masks</li>
                  <li>• Weights saved and used for Branch 2</li>
                  <li>• Fast inference with linear complexity</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t('Branch 2: SAM-VMNet Integration', '分支 2：SAM-VMNet 集成')}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                The second branch combines Branch 1 outputs with SAM to refine the segmentation results.
              </p>
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                <h4 className="font-semibold text-gray-900 mb-2">Refinement Process:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Takes Branch 1 predictions as prompts</li>
                  <li>• SAM refines boundaries and details</li>
                  <li>• Combines strengths of both models</li>
                  <li>• Achieves state-of-the-art accuracy</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t('Stenosis Analysis Pipeline', '狭窄分析流程')}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Post-processing module for quantitative analysis of the segmented vessels.
              </p>
              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                <h4 className="font-semibold text-gray-900 mb-2">Analysis Steps:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Centerline extraction from segmentation mask</li>
                  <li>• Radius measurement at each centerline point</li>
                  <li>• Bifurcation point detection</li>
                  <li>• Stenosis identification and severity calculation</li>
                  <li>• Color-coded visualization generation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('Technical Advantages', '技术优势')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <Zap className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Efficient Processing</h3>
                <p className="text-sm text-gray-600">
                  Vision Mamba's linear complexity enables fast processing of high-resolution medical images
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">High Accuracy</h3>
                <p className="text-sm text-gray-600">
                  Combination of specialized architectures achieves superior segmentation performance
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <Layers className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Modular Design</h3>
                <p className="text-sm text-gray-600">
                  Two-branch architecture allows for flexible deployment and easy updates
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <Activity className="w-8 h-8 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Clinical Ready</h3>
                <p className="text-sm text-gray-600">
                  Validated on clinical datasets with comprehensive quantitative analysis tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
