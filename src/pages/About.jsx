import { Award, Users, Target, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">SAM-VMNet</span>
          </h1>
          <p className="text-xl text-gray-600">
            A breakthrough in medical image analysis combining state-of-the-art deep learning architectures
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
          <p className="text-lg text-gray-600 mb-4">
            Coronary artery disease is one of the leading causes of mortality worldwide. Accurate segmentation of coronary arteries and detection of stenosis (vessel narrowing) in angiographic images is critical for diagnosis and treatment planning. However, manual analysis is time-consuming and subject to inter-observer variability.
          </p>
          <p className="text-lg text-gray-600">
            Traditional automated methods often struggle with the complex vessel structures, varying image quality, and the need for precise quantitative measurements required in clinical settings.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
          <p className="text-lg text-gray-600 mb-8">
            SAM-VMNet introduces a novel two-branch architecture that combines the strengths of Vision Mamba (VMamba) and the Segment Anything Model (SAM) to achieve unprecedented accuracy in coronary artery segmentation and stenosis detection.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <img
              src="/samvm-net.jpg"
              alt="SAM-VMNet Architecture Diagram"
              className="w-full rounded-lg"
            />
            <p className="text-center text-sm text-gray-600 mt-4">
              Figure: Two-branch architecture of SAM-VMNet combining Vision Mamba UNet with SAM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Branch 1: VM-UNet</h3>
              <p className="text-gray-600">
                Leverages Vision Mamba for efficient long-range dependency modeling in medical images, providing initial high-quality segmentation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Branch 2: SAM Integration</h3>
              <p className="text-gray-600">
                Integrates SAM's powerful segmentation capabilities with Branch 1 outputs to refine boundaries and improve overall accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Stenosis Detection Module</h2>
          <p className="text-lg text-gray-600 mb-6">
            Beyond segmentation, SAM-VMNet includes a comprehensive MATLAB-based module for quantitative stenosis detection that provides:
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Centerline Extraction</h4>
                <p className="text-gray-600">Precise skeletonization to identify vessel centerlines</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Radius Calculation</h4>
                <p className="text-gray-600">Method of Moments for accurate vessel radius measurement at each point</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Stenosis Quantification</h4>
                <p className="text-gray-600">Automatic detection and severity classification of stenotic regions</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Color-Coded Visualization</h4>
                <p className="text-gray-600">Intuitive visualization with severity-based color coding (red: severe, green: moderate, blue: mild)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Publication</h2>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              This work has been accepted and published in <span className="font-semibold text-primary-600">Medical Physics</span>, a leading journal in medical imaging and radiation therapy.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary-600">
              <p className="text-sm text-gray-600 mb-2">Citation:</p>
              <p className="text-sm text-gray-800 font-mono leading-relaxed">
                Huang, B., Luo, Y., Wei, G., He, S., Shao, Y., Zeng, X., & Zhang, Q. (2025).
                Deep learning model for coronary artery segmentation and quantitative stenosis detection in angiographic images.
                <span className="italic"> Medical Physics, 52</span>(7), e17970.
                <a href="https://doi.org/10.1002/mp.17970" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">
                  https://doi.org/10.1002/mp.17970
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Impact and Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Clinical Decision Support</h3>
              <p className="text-sm text-gray-600">
                Assists physicians in accurate diagnosis and treatment planning
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Research Tool</h3>
              <p className="text-sm text-gray-600">
                Enables large-scale analysis of coronary artery datasets
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Educational Resource</h3>
              <p className="text-sm text-gray-600">
                Valuable for training medical professionals and students
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
