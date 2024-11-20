import EthereumLogo from "../assets/images/ethereum.png";
import BitcoinLogo from "../assets/images/bitcoin.webp";
import TetherLogo from "../assets/images/tether.png";

const tokens = [
  {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    logoURI: EthereumLogo,
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    logoURI: TetherLogo,
  },
  {
    address: "0x1A1A1A1A1A1A1A1A1A1A1A1A1A1A1A1A1A1A1A1A",
    symbol: "BTC",
    name: "Bitcoin",
    decimals: 8,
    logoURI: BitcoinLogo,
  },
];

export default tokens;
