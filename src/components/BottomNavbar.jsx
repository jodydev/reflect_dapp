import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Home from "../assets/icons/home.png";
import Swap from "../assets/icons/swap.png";
import Mint from "../assets/icons/mint.png";
import Pool from "../assets/icons/pool.png";
import Stake from "../assets/icons/stake.png";
import Liquidation from "../assets/icons/liquidation.png";
import MyReflect from "../assets/icons/my-reflect.png";

const BottomNavbar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/swap":
        setValue(1);
        break;
      case "/mint":
        setValue(2);
        break;
      case "/stake":
        setValue(3);
        break;
      case "/liquidation":
        setValue(4);
        break;
      case "/pool":
        setValue(5);
        break;
      case "/my-reflect":
        setValue(6);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const handleNavigation = (index) => {
    setValue(index);
    switch (index) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/swap");
        break;
      case 2:
        navigate("/mint");
        break;
      case 3:
        navigate("/stake");
        break;
      case 4:
        navigate("/liquidation");
        break;
      case 5:
        navigate("/pool");
        break;
      case 6:
        navigate("/my-reflect");
        break;

      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => handleNavigation(newValue)}
      showLabels
      className="rounded-3xl shadow-lg fixed bottom-5 left-3 right-3 z-50"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<img src={Home} alt="Home" className="w-6 h-6" />}
        style={{ color: value === 0 ? "black" : "black" }}
        sx={{
          backgroundColor: value === 0 ? "#FFBF55" : "transparent",
          borderRadius: "12px",
        }}
      />
      <BottomNavigationAction
        label="Swap"
        icon={<img src={Swap} alt="Swap" className="w-6 h-6" />}
        style={{ color: value === 1 ? "black" : "black" }}
        sx={{
          backgroundColor: value === 1 ? "#FFBF55" : "transparent",
          borderRadius: "12px",
        }}
      />
      <BottomNavigationAction
        label="Mint"
        icon={<img src={Mint} alt="Mint" className="w-6 h-6" />}
        style={{ color: value === 2 ? "black" : "black" }}
        sx={{
          backgroundColor: value === 2 ? "#FFBF55" : "transparent",
          borderRadius: "12px",
        }}
      />
      <BottomNavigationAction
        label="Stake"
        icon={<img src={Stake} alt="Stake" className="w-6 h-6" />}
        style={{ color: value === 3 ? "black" : "black" }}
        sx={{
          backgroundColor: value === 3 ? "#FFBF55" : "transparent",
          borderRadius: "12px",
        }}
      />
      <BottomNavigationAction
        label="Liquidation"
        icon={<img src={Liquidation} alt="Liquidation" className="w-6 h-6" />}
        style={{ color: value === 4 ? "black" : "black" }}
        sx={{
          backgroundColor: value === 4 ? "#FFBF55" : "transparent",
          borderRadius: "12px",
        }}
      />
      <BottomNavigationAction
        label="Pool"
        icon={<img src={Pool} alt="Pool" className="w-6 h-6" />}
        style={{ color: value === 5 ? "black" : "black" }}
        sx={{
          backgroundColor: value === 5 ? "#FFBF55" : "transparent",
          borderRadius: "12px",
        }}
      />
      <BottomNavigationAction
        label="My Reflect"
        icon={<img src={MyReflect} alt="My Reflect" className="w-6 h-6" />}
        style={{ color: value === 6 ? "black" : "black" }}
        sx={{
          backgroundColor: value === 6 ? "#FFBF55" : "transparent",
          borderRadius: "12px",
        }}
      />
    </BottomNavigation>
  );
};

export default BottomNavbar;
