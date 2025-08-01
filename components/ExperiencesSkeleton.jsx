// /components/skeletons/ExperienceSkeleton.js

const ExperienceItemSkeleton = () => (
  <div className='border-b border-gray-200 pb-10 animate-pulse'>
    <div className="pb-8">
      <div className="h-10 w-1/2 bg-gray-200 rounded mb-3"></div>
      <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
    </div>
    <div className="space-y-4">
      <div className="h-5 w-full bg-gray-200 rounded"></div>
      <div className="h-5 w-full bg-gray-200 rounded"></div>
      <div className="h-5 w-5/6 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default function ExperienceSkeleton({ count = 2 }) {
  return (
    <div className="space-y-20">
      {/* Create an array of a specific length and map over it to render multiple skeletons */}
      {[...Array(count)].map((_, index) => (
        <ExperienceItemSkeleton key={index} />
      ))}
    </div>
  );
}