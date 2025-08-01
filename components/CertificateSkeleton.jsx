// /components/skeletons/CertificateSkeleton.js

export default function CertificateSkeleton() {
  return (
    <>
      {/* DESKTOP SKELETON */}
      <div className="hidden lg:grid grid-cols-2 gap-12 min-h-[500px] animate-pulse">
        {/* Left Side: Image Placeholder */}
        <div className="relative h-full flex justify-center items-center">
          <div className="w-96 h-64 bg-gray-200 rounded-lg shadow-2xl"></div>
        </div>

        {/* Right Side: Text Placeholders */}
        <div className="relative flex flex-col justify-center h-full">
          <div className="w-3/4 h-8 bg-gray-200 rounded mb-4"></div>
          <div className="w-full h-5 bg-gray-200 rounded mb-2"></div>
          <div className="w-full h-5 bg-gray-200 rounded mb-2"></div>
          <div className="w-5/6 h-5 bg-gray-200 rounded"></div>
          
          {/* Button Placeholders */}
          <div className="mt-6 flex gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* MOBILE SKELETON */}
      <div className="lg:hidden flex flex-col items-center space-y-8 animate-pulse">
        <div className="w-full max-w-sm h-56 sm:h-64 bg-gray-200 rounded-lg shadow-2xl"></div>
        <div className="w-full text-center px-4 space-y-3">
          <div className="h-6 w-3/4 mx-auto bg-gray-200 rounded"></div>
          <div className="h-4 w-full mx-auto bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 mx-auto bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </>
  );
}