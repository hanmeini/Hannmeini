// /components/skeletons/ProjectListSkeleton.js

// This component represents a single placeholder item.
const SingleProjectSkeleton = ({ reverse = false }) => {
  const imageColumn = <div className="w-full h-80 bg-gray-200 rounded-lg shadow-md"></div>;

  const textColumn = (
    <div className="flex flex-col justify-center">
      {/* Category placeholder */}
      <div className="w-1/4 h-5 bg-gray-200 rounded mb-4"></div>
      {/* Title placeholder */}
      <div className="w-3/4 h-9 bg-gray-200 rounded mb-6"></div>
      {/* Description placeholders */}
      <div className="space-y-3 mb-8">
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
      </div>
      {/* Tech stack tags placeholders */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="w-20 h-7 bg-gray-200 rounded-full"></div>
        <div className="w-24 h-7 bg-gray-200 rounded-full"></div>
        <div className="w-16 h-7 bg-gray-200 rounded-full"></div>
      </div>
      {/* Button placeholders */}
      <div className="flex gap-4">
        <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Logic to alternate layout */}
      <div className={reverse ? 'lg:order-last' : ''}>
        {imageColumn}
      </div>
      <div>
        {textColumn}
      </div>
    </div>
  );
};


// This is the main export that creates a list of placeholders.
export default function ProjectListSkeleton({ count = 2 }) {
  return (
    <div className="space-y-24 animate-pulse">
      {[...Array(count)].map((_, index) => (
        // The `reverse` prop is alternated based on the item's index
        <SingleProjectSkeleton key={index} reverse={index % 2 !== 0} />
      ))}
    </div>
  );
}