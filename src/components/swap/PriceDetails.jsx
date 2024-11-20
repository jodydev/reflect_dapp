import { Loader2 } from "lucide-react";

const PriceDetails = ({ priceDetails }) => {
    const { price, minReceived, priceImpact, isLoading } = priceDetails;
  
    return (
      <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl mt-4 text-sm">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Price:</span>
          <span>
            {isLoading ? <Loader2 className="spin w-4 h-4 inline text-primary" /> : price ? `${price} per token` : "-"}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Min Received:</span>
          <span>
            {isLoading ? <Loader2 className="spin w-4 h-4 inline text-primary" /> : minReceived || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Price Impact:</span>
          <span className={priceImpact > 0 ? "text-green-500" : "text-dark"}>
            {isLoading ? <Loader2 className="spin w-4 h-4 inline text-primary" /> : priceImpact ? `${priceImpact}%` : "-"}
          </span>
        </div>
      </div>
    );
  };
  
  export default PriceDetails;
  