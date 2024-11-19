import StakeForm from "../components/StakeForm";
import Header from "../components/Header";
import AccountBalance from "../components/AccountBalance";

const Stake = () => {
  return (
    <div className="space-y-6 px-4">
      {/* <Header /> */}

      {/* Main Content */}
      <div className="w-full">
        <div className="flex flex-row">
          <div className="flex flex-col w-2/3">
            <div className="ms-2 mb-10">
              <h1 className=" text-5xl font-bold">
                Stake <span className="text-primary">rAssets</span>
              </h1>
              <p className="mt-2">
                Effortlessy exchange unique assets with minamal fees.
              </p>
            </div>

            <StakeForm />
          </div>

          <div className="relative flex flex-col w-1/3 items-center justify-start ">
            <AccountBalance />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
