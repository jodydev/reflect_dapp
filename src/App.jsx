import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Swap from './pages/Swap';
import Mint from './pages/Mint';
import Stake from './pages/Stake';
import Liquidity from './pages/Liquidity';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-orange-50">
        <Sidebar />
        <main className="flex-1 p-8 bg-main w-1/3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/liquidity" element={<Liquidity />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
