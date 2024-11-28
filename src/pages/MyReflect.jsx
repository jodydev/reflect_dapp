import AccountBalance from "../components/AccountBalance";
import MintForm from "../components/mint/MintForm";
import ConnectWalletButton from "../components/wallet/ConnectWalletButton";

export default function MyReflect() {
  return (
    <div className="space-y-6 px-4">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col lg:w-2/3">
            <div className="ms-2 mb-12">
              <h2 className="text-5xl font-bold">In development</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
