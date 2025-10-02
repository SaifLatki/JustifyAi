import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Market from './pages/Market';
import Operations from './pages/Operations';
import Timeline from './pages/Timeline';
import ExitStrategy from './pages/ExitStrategy';
import References from './pages/References';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0D1117] text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/market" element={<Market />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/exit" element={<ExitStrategy />} />
            <Route path="/references" element={<References />} />
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
