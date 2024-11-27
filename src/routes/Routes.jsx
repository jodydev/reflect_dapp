import Home from '../pages/Home';
import Swap from '../pages/Swap';
import Mint from '../pages/Mint';
import Stake from '../pages/Stake';
import Pool from '../pages/Pool';
import Liquidation from '../pages/Liquidation';
import MyReflect from '../pages/MyReflect';

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/swap', element: <Swap /> },
  { path: '/mint', element: <Mint /> },
  { path: '/stake', element: <Stake /> },
  { path: '/pool', element: <Pool /> },
  { path: '/liquidation', element: <Liquidation /> },
  { path: '/my-reflect', element: <MyReflect /> },
];
