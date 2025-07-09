const LoadingWisataCard = () => {
  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden">
      <div className="w-full h-60 md:h-[450px] bg-gray-100 animate-pulse"></div>
    
      <div className="p-6">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingWisataCard;
