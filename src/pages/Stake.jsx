import AccountBalance from "../components/AccountBalance";
import StakeForm from "../components/StakeForm";
import ConnectWalletButton from "../components/wallet/ConnectWalletButton";

export default function Stake() {
  return (
    <div className="space-y-6 px-4">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col lg:w-2/3">
            <div className="ms-2 mb-12">
              <h2 className="text-5xl font-bold">
                Swap
                <span className="text-primary">rAssets</span>
              </h2>
              <p className="mt-2">Effortlessy exchange unique assets with minimal fees.</p>
            </div>

            <StakeForm />
          </div>

          <div className="relative flex flex-col gap-10 lg:w-1/3 items-center justify-start mt-10 lg:mt-32">
            <AccountBalance />
          </div>
        </div>
      </div>
      <div className="absolute top-24 right-12 md:top-3 md:right-5">
        <ConnectWalletButton />
      </div>
    </div>
  );
}
