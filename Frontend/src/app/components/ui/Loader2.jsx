import React from "react";

const Loader2 = () => {
  return (
    <div
      style={{ zIndex: "1000" }}
      className="fixed inset-0 bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center z-50"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 scale-150 animate-pulse"></div>

        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>

          <div
            className="absolute inset-2 border-3 border-transparent border-t-purple-400 border-l-pink-400 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>

          <div
            className="absolute inset-4 border-2 border-transparent border-b-cyan-400 border-r-blue-400 rounded-full animate-spin"
            style={{ animationDuration: "2s" }}
          ></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>

        <div className="absolute -inset-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce opacity-60"
              style={{
                top: `${20 + Math.sin((i * Math.PI) / 4) * 30}%`,
                left: `${50 + Math.cos((i * Math.PI) / 4) * 40}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1.5 + (i % 3) * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 w-32 h-32 -m-4">
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s" }}
          >
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform -translate-x-1/2 shadow-lg"></div>
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transform -translate-x-1/2 shadow-lg"></div>
          </div>

          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "4s", animationDirection: "reverse" }}
          >
            <div className="absolute top-1/2 right-0 w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full transform -translate-y-1/2 shadow-lg"></div>
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transform -translate-y-1/2 shadow-lg"></div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border border-blue-300 rounded-full animate-ping opacity-30"></div>
          <div
            className="absolute w-20 h-20 border border-purple-300 rounded-full animate-ping opacity-20"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute w-24 h-24 border border-pink-300 rounded-full animate-ping opacity-10"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-red-600 font-medium text-lg mb-2 animate-pulse">
          Please Wait
        </p>
        <p className="text-green-500 text-sm mb-1">Security Checking...</p>
        <p className="text-green-500 text-sm">
          Authorization Authentication in progress...
        </p>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-cyan-200/25 to-blue-200/25 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
};

export default Loader2;
