import React, { useState, useEffect } from "react";

const AdvancedLoader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 15;
      });
    }, 2000);

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading";
        return prev + ".";
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div
      style={{ zIndex: "1000" }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse scale-150"></div>

        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 border-r-pink-400 animate-spin"></div>

            <div
              className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-400 border-l-cyan-400 animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>

            <div
              className="absolute inset-4 rounded-full border-4 border-transparent border-b-green-400 border-r-yellow-400 animate-spin"
              style={{ animationDuration: "2s" }}
            ></div>

            <div className="absolute inset-1/2 w-6 h-6 md:w-8 md:h-8 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg"></div>

            <div
              className="absolute -top-2 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-1/2 -right-2 w-2 h-2 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute -bottom-2 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="absolute top-1/2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>

          <div className="w-full max-w-xs mx-auto mb-6">
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-pulse">
              {loadingText}
            </h2>
            <p className="text-white/60 text-sm md:text-base">
              Please wait while we prepare everything for you
            </p>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: "1s",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-ping"></div>
        <div
          className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <style jsx="true">{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <div>
      {showLoader ? (
        <AdvancedLoader />
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Content Loaded!
            </h1>
            <button
              onClick={() => setShowLoader(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Show Loader Again
            </button>
          </div>
        </div>
      )}

      {showLoader && (
        <button
          onClick={() => setShowLoader(false)}
          className="fixed top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/30 hover:bg-white/30 transition-all z-50"
        >
          Skip Loading
        </button>
      )}
    </div>
  );
};

export default Loader;
