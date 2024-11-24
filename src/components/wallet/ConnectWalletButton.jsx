import { useAccount, useDisconnect } from "wagmi";
import WalletOptions from "./WalletOptions";

export default function ConnectWalletButton() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <>
      {!isConnected ? (
        <WalletOptions isHeaderButton={true} />
      ) : (
        <button
          onClick={disconnect}
          className="text-nowrap py-2 px-6 bg-dark text-white rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95 flex items-center justify-center w-full md:w-auto"
        >
          Disconnect Wallet
        </button>
      )}
    </>
  );
}
