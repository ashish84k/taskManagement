
const ButtonLoader = ({ size = "sm", color = "white" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4", 
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const colorClasses = {
    white: "border-white/30 border-t-white",
    blue: "border-blue-200 border-t-blue-600",
    gray: "border-gray-300 border-t-gray-600"
  };

  return (
    <div className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`}></div>
  );
};

export default ButtonLoader;