import { useState } from 'react';
import { Book, Code, Terminal, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Documentation = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('installation');

  const sections = [
    { id: 'installation', name: 'Installation', icon: Terminal },
    { id: 'quickstart', name: 'Quick Start', icon: CheckCircle },
    { id: 'training', name: 'Training', icon: Code },
    { id: 'testing', name: 'Testing', icon: FileText },
    { id: 'stenosis', name: 'Stenosis Detection', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-gradient">{t('Documentation', '文档')}</span>
          </h1>
          <p className="text-xl text-gray-600">
            {t('Complete guide to using SAM-VMNet for coronary artery analysis', '使用 SAM-VMNet 进行冠状动脉分析的完整指南')}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{section.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                {activeSection === 'installation' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Installation</h2>
                      <p className="text-gray-600 mb-6">
                        Follow these steps to set up SAM-VMNet on your system.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Clone the Repository</h3>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <code className="text-gray-100 text-sm">
                          git clone https://github.com/qimingfan10/SAM-VMNet.git<br />
                          cd SAM-VMNet
                        </code>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Install Dependencies</h3>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                        <code className="text-gray-100 text-sm">
                          pip install -r requirements.txt
                        </code>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> The .whl files for mamba_ssm and causal_conv1d can be found at their respective GitHub repositories.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">3. System Requirements</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Python 3.8+</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>PyTorch 1.13.0</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>CUDA-capable GPU (recommended)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>MATLAB R2016b+ (for stenosis detection)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeSection === 'quickstart' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
                      <p className="text-gray-600 mb-6">
                        Get started with SAM-VMNet in minutes.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Download Pre-trained Weights</h3>
                      <p className="text-gray-600 mb-4">
                        Download the following files and place them in the <code className="bg-gray-100 px-2 py-1 rounded">./pre_trained_weights</code> directory:
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• vmamba_small_e238_ema.pth</li>
                        <li>• best-epoch142-loss0.3230.pth</li>
                        <li>• best-epoch142-loss0.3488.pth</li>
                        <li>• MedSAM_model.pth</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Prepare Dataset</h3>
                      <p className="text-gray-600 mb-4">
                        Organize your data in the following structure:
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <code className="text-gray-100 text-sm">
                          ./data/vessel/<br />
                          &nbsp;&nbsp;├── train/<br />
                          &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── images/<br />
                          &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── masks/<br />
                          &nbsp;&nbsp;├── val/<br />
                          &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── images/<br />
                          &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── masks/<br />
                          &nbsp;&nbsp;└── test/<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── images/<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── masks/
                        </code>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Run Verification</h3>
                      <p className="text-gray-600 mb-4">
                        Verify your setup:
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <code className="text-gray-100 text-sm">
                          bash verify_setup.sh
                        </code>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'training' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Training the Model</h2>
                      <p className="text-gray-600 mb-6">
                        SAM-VMNet uses a two-stage training process.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Stage 1: Train VM-UNet (Branch 1)</h3>
                      <p className="text-gray-600 mb-4">
                        First, train the pure VM-UNet model:
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                        <code className="text-gray-100 text-sm">
                          bash train.sh
                        </code>
                      </div>
                      <p className="text-gray-600">
                        The trained weights will be saved in <code className="bg-gray-100 px-2 py-1 rounded">./result_branch1/</code>
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Stage 2: Generate Predictions</h3>
                      <p className="text-gray-600 mb-4">
                        Use Branch 1 to predict masks:
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                        <code className="text-gray-100 text-sm">
                          bash test.sh
                        </code>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Stage 3: Train SAM-VMNet (Branch 2)</h3>
                      <p className="text-gray-600 mb-4">
                        Train the combined SAM-VMNet model:
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                        <code className="text-gray-100 text-sm">
                          bash train.sh
                        </code>
                      </div>
                      <p className="text-gray-600">
                        The final weights will be saved in <code className="bg-gray-100 px-2 py-1 rounded">./result_branch2/</code>
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Tip:</strong> Monitor training progress using TensorBoard or check the log files in the result directories.
                      </p>
                    </div>
                  </div>
                )}

                {activeSection === 'testing' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Testing and Evaluation</h2>
                      <p className="text-gray-600 mb-6">
                        Evaluate the model on your test dataset.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Run Inference</h3>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <code className="text-gray-100 text-sm">
                          python test.py --model_path ./result_branch2/best_model.pth
                        </code>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Output Format</h3>
                      <p className="text-gray-600 mb-4">
                        Segmentation masks are saved as PNG images in the same structure as the input.
                      </p>
                    </div>
                  </div>
                )}

                {activeSection === 'stenosis' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Stenosis Detection</h2>
                      <p className="text-gray-600 mb-6">
                        Analyze segmented vessels for stenosis using the MATLAB module.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start (Recommended)</h3>
                      <p className="text-gray-600 mb-4">
                        Using the bash script (Linux/Mac):
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                        <code className="text-gray-100 text-sm">
                          ./run_stenosis_detection.sh original_image.jpg segmented_mask.png
                        </code>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Using the Python script (Cross-platform):
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <code className="text-gray-100 text-sm">
                          python run_stenosis_detection.py original_image.jpg segmented_mask.png
                        </code>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Manual Method</h3>
                      <p className="text-gray-600 mb-4">
                        1. Edit <code className="bg-gray-100 px-2 py-1 rounded">stenosis_detection/maskjiance1016.m</code>
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                        <code className="text-gray-100 text-sm">
                          Im = imread("your_original_image.jpg");<br />
                          im = imread("your_segmented_mask.png");
                        </code>
                      </div>
                      <p className="text-gray-600 mb-4">
                        2. Run in MATLAB:
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <code className="text-gray-100 text-sm">
                          cd stenosis_detection<br />
                          maskjiance1016
                        </code>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Output Interpretation</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Figure 1: Centerline Extraction</h4>
                          <p className="text-gray-600 text-sm">Shows the extracted vessel skeleton in red points</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Figure 2: Bifurcation Points</h4>
                          <p className="text-gray-600 text-sm">Displays centerline points and bifurcation points in purple</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Figure 3: Stenosis Detection</h4>
                          <p className="text-gray-600 text-sm mb-2">Color-coded stenosis severity markers:</p>
                          <div className="space-y-2 ml-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-medical-red rounded-full"></div>
                              <span className="text-sm text-gray-700">Red: Severe (&gt;75%)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-medical-green rounded-full"></div>
                              <span className="text-sm text-gray-700">Green: Moderate (50-75%)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-medical-blue rounded-full"></div>
                              <span className="text-sm text-gray-700">Blue: Mild (25-50%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
