// In app/projects/[id]/loading.js

// A reusable skeleton for the info boxes
function InfoBoxSkeleton() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="w-6 h-6 bg-gray-200 rounded-md mt-1"></div>
        <div className="w-full">
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// A special skeleton for the 'Stack' box
function StackBoxSkeleton() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="w-6 h-6 bg-gray-200 rounded-md mt-1"></div>
        <div>
          <h3 className="h-4 w-16 bg-gray-200 rounded mb-3"></h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-7 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-7 w-16 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function ProjectDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32 animate-pulse">
      <main>
        {/* Top Section Skeleton: Image & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Placeholder */}
          <div className="w-full h-80 lg:h-[450px] bg-gray-200 rounded-xl"></div>

          {/* Description Placeholder */}
          <div className="flex flex-col justify-center">
            <div className="h-10 md:h-12 w-3/4 bg-gray-200 rounded-lg"></div>
            <div className="mt-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            
            <div className="mt-8 h-6 w-1/3 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Bottom Section Skeleton: Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 lg:mt-24">
          <InfoBoxSkeleton />
          <InfoBoxSkeleton />
          <StackBoxSkeleton />
          <InfoBoxSkeleton />
        </div>
      </main>
    </div>
  );
}