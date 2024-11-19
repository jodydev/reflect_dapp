import { AlertTriangle } from "lucide-react";

export default function ErrorWallet() {
  return (
    <div className="w-full  bg-white bg-white/30 backdrop-blur-sm  rounded-3xl p-6 flex items-center">
      <AlertTriangle className="w-10 h-10 text-red-500 mr-4" />
      <div>
        <h2 className="text-lg font-bold text-red-600">Connection Error</h2>
        <p className="text-dark">
          Unable to fetch wallet balance. <br></br>Please try again.
        </p>
      </div>
    </div>
  );
}
