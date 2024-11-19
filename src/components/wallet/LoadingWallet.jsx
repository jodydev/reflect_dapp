export default function LoadingWallet() {
  return (
    <div className="w-full bg-white/30 rounded-3xl p-6 flex items-center justify-center">
      <div className="p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-white bg-white/30 backdrop-blur-sm h-16 w-16"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-2"></div>
                <div className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-2"></div>
                <div className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-2"></div>
                <div className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
