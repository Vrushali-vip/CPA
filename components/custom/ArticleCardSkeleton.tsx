import React from "react";

const ArticleCardSkeleton = () => {
  return (
    <div className="space-y-4 w-[100%] max-w-2xl">
      {/* Text above the skeleton */}
      <div className="font-bold text-xl text-center">These might help</div>

      {/* Skeleton Loader */}
      <div className="border p-4 rounded-lg shadow-sm bg-white animate-pulse">
        {/* Placeholder for title */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>

        {/* Placeholder for icon and small text */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Placeholder for heading */}
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>

        {/* Placeholder for paragraph */}
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>

        {/* Placeholder for tags */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
