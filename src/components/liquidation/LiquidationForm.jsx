import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import BitcoinLogo from "../../assets/images/bitcoin.webp";

export default function LiquidationForm() {
  const liquidationData = [
    {
      asset: {
        name: "BTC",
        icon: BitcoinLogo,
      },
      value: 0.0001,
      discountValue: 0.0001,
      discountRate: 0.0001,
      expires: "1h 30m",
    },
    {
      asset: {
        name: "BTC",
        icon: BitcoinLogo,
      },
      value: 0.0001,
      discountValue: 0.0001,
      discountRate: 0.0001,
      expires: "1h 30m",
    },
    {
      asset: {
        name: "BTC",
        icon: BitcoinLogo,
      },
      value: 0.0001,
      discountValue: 0.0001,
      discountRate: 0.0001,
      expires: "1h 30m",
    },
    {
      asset: {
        name: "BTC",
        icon: BitcoinLogo,
      },
      value: 0.0001,
      discountValue: 0.0001,
      discountRate: 0.0001,
      expires: "1h 30m",
    },
    {
      asset: {
        name: "BTC",
        icon: BitcoinLogo,
      },
      value: 0.0001,
      discountValue: 0.0001,
      discountRate: 0.0001,
      expires: "1h 30m",
    },
    {
        asset: {
          name: "BTC",
          icon: BitcoinLogo,
        },
        value: 0.0001,
        discountValue: 0.0001,
        discountRate: 0.0001,
        expires: "1h 30m",
      },
      {
        asset: {
          name: "BTC",
          icon: BitcoinLogo,
        },
        value: 0.0001,
        discountValue: 0.0001,
        discountRate: 0.0001,
        expires: "1h 30m",
      },

  ];

  const [transactions, setTransactions] = useState([]);

  const { address, isConnected, connector } = useAccount();
  const { data, isError, isLoading, refetch } = useBalance({
    address,
    watch: true,
  });

  const getTransactionHistory = async (address) => {
    const apiKey = "7KPEXDEQ39XVBDJ89MX8PT1V3VMIHMWJCG";
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=0xA0Cf798816D4b9b9866b5330EEa46a18382f251e&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (data.status === "1") {
      return data.result;
    } else {
      throw new Error("Errore nel recuperare le transazioni");
    }
  };

  useEffect(() => {
    if (address) {
      const fetchTransactions = async () => {
        try {
          const txs = await getTransactionHistory(address);
          setTransactions(txs);
        } catch (err) {
          console.error(err);
        }
      };

      fetchTransactions();
    }
  }, [address]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full bg-white/30 rounded-3xl p-4 backdrop-blur-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-dark">
          <thead className="text-xl text-dark">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap text-left text-sm 2xl:text-base">Asset</th>
              <th className="px-4 py-2 whitespace-nowrap text-left text-sm 2xl:text-base">Value</th>
              <th className="px-4 py-2 whitespace-nowrap text-left text-sm 2xl:text-base">
                Discount value
              </th>
              <th className="px-4 py-2 whitespace-nowrap text-left text-sm 2xl:text-base">
                Discount rate
              </th>
              <th className="px-4 py-2 whitespace-nowrap text-left text-sm 2xl:text-base">
                Expires in
              </th>
              <th className="px-4 py-2 whitespace-nowrap text-left text-sm 2xl:text-base">
                Buy discount
              </th>
            </tr>
          </thead>
          <tbody>
            {liquidationData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-dark">
                  Nessuna operazione di liquidazione disponibile
                </td>
              </tr>
            ) : (
              liquidationData.map((lq) => (
                <tr >
                  <td className="px-4 py-4 text-sm 2xl:text-lg">
                    <img src={BitcoinLogo} alt="" className="w-10 " />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm 2xl:text-lg">
                    {lq.value}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm 2xl:text-lg">
                    {lq.discountValue}
                  </td>
                  <td className="px-4 py-4">{lq.discountRate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm 2xl:text-lg">
                    {lq.expires}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm 2xl:text-lg">
                    <button className="text-white bg-primary px-6 py-2 rounded-3xl">
                      Buy Now
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
