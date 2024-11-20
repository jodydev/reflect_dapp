// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import Home from '../assets/icons/home.png';
import Swap from '../assets/icons/swap.png';
import Mint from '../assets/icons/mint.png';
import Stake from '../assets/icons/stake.png';
import Liquidity from '../assets/icons/liquidity.png';
import Logo from '../assets/images/logo.webp';

function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Swap', path: '/swap', icon: Swap },
    { name: 'Mint', path: '/mint', icon: Mint },
    { name: 'Stake', path: '/stake', icon: Stake },
    { name: 'Liquidity', path: '/liquidity', icon: Liquidity },
  ];

  return (
    <div className="w-20 bg-trasparent shadow-md">
      <div className="flex flex-col items-center py-8 space-y-8 w-20">
        <div className="mb-8">
          <img src={Logo} alt="Logo" className="w-6" />
        </div>
        
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`p-3 rounded-xl transition-colors ${
              location.pathname === item.path
                ? 'bg-primary text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <img src={item.icon} className="w-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;