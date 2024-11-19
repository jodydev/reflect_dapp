import SwapForm from "../components/SwapForm";
import AccountBalance from "../components/AccountBalance";

export default function Swap() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/3 w-full pt-10">
        <SwapForm />
      </div>
      <div className="md:w-1/3 w-full pt-10">
        <AccountBalance />
      </div>
    </div>
  );
};
