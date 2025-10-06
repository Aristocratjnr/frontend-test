export default function Loading() {
  return (
    <div className="p-8">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-9 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
        </div>
      </div>

      {/* Products grid skeleton - matches the actual layout */}
      <div className="grid grid-cols-3 gap-6">
        {Array(9).fill(0).map((_, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 animate-pulse">
            {/* Image skeleton - exact dimensions as real images */}
            <div className="w-full h-40 bg-gray-200"></div>

            {/* Content skeleton - matches real product card layout */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Product name skeleton */}
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  {/* Price skeleton */}
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
                {/* Rating skeleton */}
                <div className="flex items-center gap-1 ml-4">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
