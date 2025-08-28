import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Result } from './pages/Result';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BuyCredit } from './pages/BuyCredit';

export const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>
      <Footer/>
    </div>
  );
};