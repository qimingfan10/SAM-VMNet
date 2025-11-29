import { Upload, Image as ImageIcon, Play, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Demo = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('Interactive', '交互式')} <span className="text-gradient">{t('Demo', '演示')}</span>
          </h1>
          <p className="text-xl text-gray-600">
            {t("Explore SAM-VMNet's capabilities with sample results and visualizations", '通过示例结果和可视化探索 SAM-VMNet 的功能')}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">i</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Demo Information</h3>
                <p className="text-blue-800 text-sm">
                  This demo showcases the segmentation and stenosis detection workflow. For actual model inference, please download the models and follow the installation instructions in the documentation.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sample Results</h2>

          <div className="space-y-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Step 1: Original Angiographic Image</h3>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Original coronary angiography image</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Input angiographic image showing coronary arteries. The image contains complex vessel structures that need to be segmented and analyzed for stenosis.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Step 2: Segmentation Result</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-2">
                      <div className="text-center">
                        <p className="text-blue-700 font-semibold">Branch 1: VM-UNet</p>
                        <p className="text-sm text-blue-600">Initial segmentation</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-2">
                      <div className="text-center">
                        <p className="text-green-700 font-semibold">Branch 2: SAM-VMNet</p>
                        <p className="text-sm text-green-600">Refined segmentation</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  The two-branch architecture produces progressively refined segmentation results. Branch 1 provides initial segmentation, which Branch 2 refines using SAM.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Step 3: Stenosis Detection</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-2 p-4">
                      <div className="text-center">
                        <p className="text-purple-700 font-semibold text-sm mb-2">Centerline Extraction</p>
                        <div className="space-y-1">
                          <div className="h-1 bg-purple-600 w-full rounded"></div>
                          <div className="h-1 bg-purple-600 w-4/5 rounded mx-auto"></div>
                          <div className="h-1 bg-purple-600 w-3/5 rounded mx-auto"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">Vessel skeleton extracted</p>
                  </div>
                  <div>
                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center mb-2 p-4">
                      <div className="text-center">
                        <p className="text-pink-700 font-semibold text-sm mb-2">Bifurcation Detection</p>
                        <div className="flex justify-center space-x-2">
                          <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                          <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                          <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">Segmentation points identified</p>
                  </div>
                  <div>
                    <div className="aspect-square bg-gradient-to-br from-red-100 to-orange-200 rounded-lg flex items-center justify-center mb-2 p-4">
                      <div className="text-center">
                        <p className="text-red-700 font-semibold text-sm mb-2">Stenosis Points</p>
                        <div className="flex justify-center space-x-2">
                          <div className="w-4 h-4 bg-medical-red rounded-full"></div>
                          <div className="w-4 h-4 bg-medical-green rounded-full"></div>
                          <div className="w-4 h-4 bg-medical-blue rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">Color-coded by severity</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Stenosis Severity Classification:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-medical-red rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-700"><span className="font-semibold">Severe stenosis</span> - Diameter reduction &gt;75%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-medical-green rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-700"><span className="font-semibold">Moderate stenosis</span> - Diameter reduction 50-75%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-medical-blue rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-700"><span className="font-semibold">Mild stenosis</span> - Diameter reduction 25-50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Try It Yourself</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-gray-600 mb-6">
              To run SAM-VMNet on your own images, follow these steps:
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Install Dependencies</h4>
                  <p className="text-sm text-gray-600">Set up your environment with Python, PyTorch, and required packages</p>
                  <code className="block mt-2 bg-gray-900 text-gray-100 px-4 py-2 rounded text-sm">
                    pip install -r requirements.txt
                  </code>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Download Pre-trained Weights</h4>
                  <p className="text-sm text-gray-600">Get the model weights from the Downloads page</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Run Inference</h4>
                  <p className="text-sm text-gray-600">Use the test script to segment your images</p>
                  <code className="block mt-2 bg-gray-900 text-gray-100 px-4 py-2 rounded text-sm">
                    bash test.sh
                  </code>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Run Stenosis Detection</h4>
                  <p className="text-sm text-gray-600">Use MATLAB to analyze the segmented vessels</p>
                  <code className="block mt-2 bg-gray-900 text-gray-100 px-4 py-2 rounded text-sm">
                    ./run_stenosis_detection.sh image.jpg mask.png
                  </code>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="/docs"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Full Documentation</span>
              </a>
              <a
                href="/downloads"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download Models</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
