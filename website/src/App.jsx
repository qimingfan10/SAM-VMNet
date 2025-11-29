import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Demo from './pages/Demo';
import Documentation from './pages/Documentation';
import Downloads from './pages/Downloads';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/downloads" element={<Downloads />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
