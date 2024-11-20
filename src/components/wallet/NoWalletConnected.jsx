import { Wallet } from "lucide-react";

export default function NoWalletConnected() {
  return (
    <div className="w-full bg-white bg-white/30 backdrop-blur-sm relative z-10 flex flex-col items-center justify-center rounded-3xl  p-8 shadow-sm ">
      <div className="rounded-full w-18 h-18 bg-white/60 p-4 mb-4">
      <Wallet className="w-10 h-10 text-dark" />

      </div>
      <h1 className="text-2xl font-bold mb-3 text-gray-800">
        Wallet Connection
      </h1>
      <p className="text-gray-600 text-center">
        Connect your wallet to view your balance and manage your assets
      </p>
    </div>
  );
}
