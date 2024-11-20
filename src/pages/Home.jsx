import Header from "../components/Header";
import StatCards from "../components/StatCards";
import TreadingCards from "../components/TreadingCards";
import AccountBalance from "../components/AccountBalance";
import NewsCard from "../components/NewsCard";
import Chart from "../components/Chart";

const Home = () => {
  return (
    <div className="space-y-6">
      <Header />

      {/* Main Content */}
      <div className="w-full">
        <div className="flex flex-row space-x-10 mb-10">
          <div className="flex flex-col w-2/3 space-y-8">
            {/* <h2 className="text-4xl font-bold mb-8 ms-2">
              Create and trade{" "}
              <span className="text-primary">crypto assets</span>
            </h2>
             */}

            <StatCards />

            <Chart />
          </div>

          <div className="relative flex flex-col w-1/3 items-center justify-center space-y-10">
            <AccountBalance />

            <NewsCard />
          </div>
        </div>

        <TreadingCards />
      </div>
    </div>
  );
};

export default Home;
