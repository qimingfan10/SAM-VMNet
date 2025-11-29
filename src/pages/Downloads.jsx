import { Download, ExternalLink, Package, Database, FileCode } from 'lucide-react';

const Downloads = () => {
  const modelWeights = [
    {
      name: 'VMamba Small (Backbone)',
      file: 'vmamba_small_e238_ema.pth',
      size: '~100 MB',
      description: 'Vision Mamba backbone pretrained weights',
      link: 'https://drive.google.com/file/d/1XL7JuacjoZCr8w2b0c8CaQn8b0hREblk/view?usp=drive_link',
    },
    {
      name: 'Branch 1 Model',
      file: 'best-epoch142-loss0.3230.pth',
      size: '~200 MB',
      description: 'Trained VM-UNet (Branch 1) weights',
      link: 'https://drive.google.com/file/d/1jsZKakA4FrYaMXNp6qkVtxXwwcJQKrW4/view?usp=drive_link',
    },
    {
      name: 'Branch 2 Model',
      file: 'best-epoch142-loss0.3488.pth',
      size: '~250 MB',
      description: 'Trained SAM-VMNet (Branch 2) weights',
      link: 'https://drive.google.com/file/d/1OKIzUM_L6FeEqyuIsAMn4x-FHptizTkG/view?usp=drive_link',
    },
    {
      name: 'MedSAM Model',
      file: 'MedSAM_model.pth',
      size: '~400 MB',
      description: 'Medical SAM pretrained weights',
      link: 'https://drive.google.com/file/d/1O5IVkcVxd2RtOcZEKuTR3WkOBiosHBfz/view?usp=drive_link',
    },
  ];

  const datasets = [
    {
      name: 'ARCADE Dataset',
      description: 'Annotated coronary artery dataset for training and evaluation',
      link: 'https://zenodo.org/records/12345678',
      type: 'Medical Imaging',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-gradient">Downloads</span>
          </h1>
          <p className="text-xl text-gray-600">
            Pre-trained models, datasets, and additional resources
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Package className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Pre-trained Model Weights</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Download the pre-trained weights and place them in the <code className="bg-gray-100 px-2 py-1 rounded">./pre_trained_weights</code> directory.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modelWeights.map((model, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{model.name}</h3>
                      <p className="text-sm text-gray-500">{model.size}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileCode className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{model.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <code className="text-sm text-gray-700 break-all">{model.file}</code>
                  </div>
                  <a
                    href={model.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors w-full justify-center"
                  >
                    <Download className="w-5 h-5" />
                    <span className="font-medium">Download from Google Drive</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">i</span>
              <span>Installation Instructions</span>
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>1. Download all four model weight files</p>
              <p>2. Create a directory: <code className="bg-blue-100 px-2 py-1 rounded">mkdir -p pre_trained_weights</code></p>
              <p>3. Move all downloaded .pth files to the <code className="bg-blue-100 px-2 py-1 rounded">pre_trained_weights</code> directory</p>
              <p>4. Verify the files are in place before training or testing</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Datasets</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Access publicly available datasets for training and evaluation.
            </p>

            <div className="space-y-6">
              {datasets.map((dataset, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{dataset.name}</h3>
                      <p className="text-gray-600 mb-2">{dataset.description}</p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {dataset.type}
                      </span>
                    </div>
                    <a
                      href={dataset.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                    >
                      <Download className="w-5 h-5" />
                      <span className="font-medium">Download</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Structure</h2>
            <p className="text-gray-600 mb-4">
              After downloading the dataset, organize your data in the following structure:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <code className="text-gray-100 text-sm">
                SAM-VMNet/<br />
                ├── data/<br />
                │&nbsp;&nbsp;&nbsp;└── vessel/<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── train/<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── images/<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── image1.png<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── image2.png<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── masks/<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── mask1.png<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── mask2.png<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── val/<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── images/<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── masks/<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── test/<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── images/<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── masks/<br />
                └── pre_trained_weights/<br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── vmamba_small_e238_ema.pth<br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── best-epoch142-loss0.3230.pth<br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── best-epoch142-loss0.3488.pth<br />
                &nbsp;&nbsp;&nbsp;&nbsp;└── MedSAM_model.pth
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://github.com/qimingfan10/SAM-VMNet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">GitHub Repository</h3>
              <p className="text-sm text-gray-600">Source code and issue tracking</p>
            </a>

            <a
              href="https://huggingface.co/ly17/SAM-VMNet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤗</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hugging Face</h3>
              <p className="text-sm text-gray-600">Model hub and demos</p>
            </a>

            <a
              href="https://doi.org/10.1002/mp.17970"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileCode className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Research Paper</h3>
              <p className="text-sm text-gray-600">Published in Medical Physics</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;
