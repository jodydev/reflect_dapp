import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { FaDiscord, FaMedium } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Home from "../assets/icons/home.png";
import Swap from "../assets/icons/swap.png";
import Mint from "../assets/icons/mint.png";
import Pool from "../assets/icons/pool.png";
import Stake from "../assets/icons/stake.png";
import Liquidation from "../assets/icons/liquidation.png";
import MyReflect from "../assets/icons/my-reflect.png";
import Logo from "../assets/images/logo_black.webp";
import Logo2 from "../assets/images/logo.webp";

function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Swap", path: "/swap", icon: Swap },
    { name: "Mint", path: "/mint", icon: Mint },
    { name: "Stake", path: "/stake", icon: Stake },
    { name: "Pool", path: "/pool", icon: Pool },
    { name: "Liquidation", path: "/liquidation", icon: Liquidation },
    { name: "My Reflect", path: "/my-reflect", icon: MyReflect },
  ];

  return (
    <div
      className={`relative bg-transparent shadow-md min-h-screen transition-all ease-in-out ${
        isExpanded ? "w-48" : "w-20"
      }`}
    >
      <div className="flex flex-col items-center py-10 space-y-5">
        {/* Logo */}
        <div className="mb-8">
          <img
            src={isExpanded ? Logo : Logo2}
            alt="Logo"
            className={`${
              isExpanded ? "w-32" : "w-8"
            }`}
          />
        </div>

        {/* Navigazione */}
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-4 p-3 rounded-xl transition-all ease-in-out ${
              location.pathname === item.path
                ? "bg-primary text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200"
            }
            ${isExpanded ? "w-[80%]" : ""}`}
          >
            {/* Icona */}
            <img src={item.icon} className="w-5" />
            {/* Testo visibile solo se espansa */}
            {isExpanded && (
              <span className="text-sm font-bold text-dark">
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Pulsante per espandere/restringere */}
      <button
        onClick={toggleSidebar}
        className="absolute top-24 -right-11 transform -translate-x-1/2 bg-white/60 rounded-full px-3 py-2 hover:bg-white transition-all"
      >
        {isExpanded ? (
          <IoArrowUndo className="text-xl" />
        ) : (
          <IoArrowRedo className="text-xl" />
        )}
      </button>

      {/* Sezione social in fondo alla sidebar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div
          className={isExpanded ? "flex flex-row  space-x-4" : "flex flex-col space-y-4"}
        >
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord className="text-4xl text-dark shadow-sm hover:scale-110 translate-y-1 transition bg-primary rounded-full p-2" />
          </a>
          <a
            href="https://medium.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMedium className="text-4xl text-dark shadow-sm hover:scale-110 translate-y-1 transition bg-primary rounded-full p-2" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-4xl text-dark shadow-sm hover:scale-110 translate-y-1 transition bg-primary rounded-full p-2" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
