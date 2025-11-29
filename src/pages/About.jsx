import { Award, Users, Target, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('About', '关于')} <span className="text-gradient">SAM-VMNet</span>
          </h1>
          <p className="text-xl text-gray-600">
            {t('A breakthrough in medical image analysis combining state-of-the-art deep learning architectures', '结合最先进深度学习架构的医学图像分析突破')}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('The Challenge', '挑战')}</h2>
          <p className="text-lg text-gray-600 mb-4">
            {t('Coronary artery disease is one of the leading causes of mortality worldwide. Accurate segmentation of coronary arteries and detection of stenosis (vessel narrowing) in angiographic images is critical for diagnosis and treatment planning. However, manual analysis is time-consuming and subject to inter-observer variability.', '冠状动脉疾病是全球主要的死亡原因之一。在血管造影图像中准确分割冠状动脉和检测狭窄（血管变窄）对于诊断和治疗计划至关重要。然而，人工分析耗时且受观察者间差异的影响。')}
          </p>
          <p className="text-lg text-gray-600">
            {t('Traditional automated methods often struggle with the complex vessel structures, varying image quality, and the need for precise quantitative measurements required in clinical settings.', '传统的自动化方法往往难以处理复杂的血管结构、不同的图像质量以及临床环境中所需的精确定量测量。')}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('Our Solution', '我们的解决方案')}</h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('SAM-VMNet introduces a novel two-branch architecture that combines the strengths of Vision Mamba (VMamba) and the Segment Anything Model (SAM) to achieve unprecedented accuracy in coronary artery segmentation and stenosis detection.', 'SAM-VMNet 引入了一种新颖的双分支架构，结合了 Vision Mamba (VMamba) 和 Segment Anything Model (SAM) 的优势，在冠状动脉分割和狭窄检测中实现了前所未有的准确性。')}
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <img
              src="/samvm-net.jpg"
              alt="SAM-VMNet Architecture Diagram"
              className="w-full rounded-lg"
            />
            <p className="text-center text-sm text-gray-600 mt-4">
              {t('Figure: Two-branch architecture of SAM-VMNet combining Vision Mamba UNet with SAM', '图：SAM-VMNet 的双分支架构，结合 Vision Mamba UNet 和 SAM')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('Branch 1: VM-UNet', '分支 1：VM-UNet')}</h3>
              <p className="text-gray-600">
                {t('Leverages Vision Mamba for efficient long-range dependency modeling in medical images, providing initial high-quality segmentation.', '利用 Vision Mamba 在医学图像中进行高效的长距离依赖建模，提供初始的高质量分割。')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('Branch 2: SAM Integration', '分支 2：SAM 集成')}</h3>
              <p className="text-gray-600">
                {t("Integrates SAM's powerful segmentation capabilities with Branch 1 outputs to refine boundaries and improve overall accuracy.", '将 SAM 强大的分割能力与分支 1 的输出相结合，以精化边界并提高整体准确性。')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('Stenosis Detection Module', '狭窄检测模块')}</h2>
          <p className="text-lg text-gray-600 mb-6">
            {t('Beyond segmentation, SAM-VMNet includes a comprehensive MATLAB-based module for quantitative stenosis detection that provides:', '除了分割功能，SAM-VMNet 还包含一个基于 MATLAB 的全面定量狭窄检测模块，提供：')}
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('Centerline Extraction', '中心线提取')}</h4>
                <p className="text-gray-600">{t('Precise skeletonization to identify vessel centerlines', '精确的骨架化以识别血管中心线')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('Radius Calculation', '半径计算')}</h4>
                <p className="text-gray-600">{t('Method of Moments for accurate vessel radius measurement at each point', '使用矩法精确测量每个点的血管半径')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('Stenosis Quantification', '狭窄量化')}</h4>
                <p className="text-gray-600">{t('Automatic detection and severity classification of stenotic regions', '狭窄区域的自动检测和严重程度分类')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t('Color-Coded Visualization', '彩色可视化')}</h4>
                <p className="text-gray-600">{t('Intuitive visualization with severity-based color coding (red: severe, green: moderate, blue: mild)', '基于严重程度的直观彩色编码可视化（红色：严重，绿色：中度，蓝色：轻度）')}</p>
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
              <h2 className="text-3xl font-bold text-gray-900">{t('Publication', '发表')}</h2>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              {t('This work has been accepted and published in', '这项工作已被接受并发表于')} <span className="font-semibold text-primary-600">Medical Physics</span>{t(', a leading journal in medical imaging and radiation therapy.', '，医学成像和放射治疗领域的顶级期刊。')}
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary-600">
              <p className="text-sm text-gray-600 mb-2">{t('Citation:', '引用：')}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{t('Impact and Applications', '影响与应用')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('Clinical Decision Support', '临床决策支持')}</h3>
              <p className="text-sm text-gray-600">
                {t('Assists physicians in accurate diagnosis and treatment planning', '帮助医生进行准确诊断和治疗计划')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('Research Tool', '研究工具')}</h3>
              <p className="text-sm text-gray-600">
                {t('Enables large-scale analysis of coronary artery datasets', '实现冠状动脉数据集的大规模分析')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('Educational Resource', '教育资源')}</h3>
              <p className="text-sm text-gray-600">
                {t('Valuable for training medical professionals and students', '对医学专业人员和学生的培训非常有价值')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
