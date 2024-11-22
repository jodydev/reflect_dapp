import AccountBalance from "../components/AccountBalance";
import SwapForm from "../components/SwapForm";
import ConnectWalletButton from "../components/wallet/ConnectWalletButton";

export default function Swap() {
  return (
    <div className="space-y-6 px-4">
      <div className="w-full">
        <div className="flex flex-row">
          <div className="flex flex-col w-2/3">
            <div className="ms-2 mb-10">
              <h1 className=" text-5xl font-bold">
                Swap
                <span className="text-primary">rAssets</span>
              </h1>
              <p className="mt-2">Effortlessy exchange unique assets with minamal fees.</p>
            </div>

            <SwapForm />
          </div>

          <div className="relative flex flex-col gap-10 w-1/3 items-center justify-center ">
            <AccountBalance />
          </div>
        </div>
      </div>
      <div className="absolute top-3 right-5 mt-4 mr-4">
        <ConnectWalletButton />
      </div>
    </div>
  );
}
