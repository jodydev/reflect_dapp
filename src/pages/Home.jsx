import Header from "../components/Header";
import AccountBalance from "../components/AccountBalance";
import StatCards from "../components/home/StatCards";
import TrendingTokens from "../components/home/TrendingTokens";
import NewsCard from "../components/home/NewsCard";
import Charts from "../components/home/Charts";

const Home = () => {
  return (
    <div className="space-y-6">
      <Header />

      {/* Main Content */}
      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:space-x-10 mb-10">
          <div className="flex flex-col lg:w-2/3 space-y-8">
            <StatCards />

            <Charts />
          </div>

          <div className="relative flex flex-col lg:w-1/3 items-center justify-center space-y-10 mt-10 lg:mt-0">
            <AccountBalance />

            <NewsCard />
          </div>
        </div>

        <TrendingTokens />
      </div>
    </div>
  );
};

export default Home;
