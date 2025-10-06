export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Title skeleton */}
          <div className="mb-8">
            <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4 animate-pulse"></div>
            <div className="w-16 h-1 bg-gray-200 rounded mx-auto mb-6 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6 mx-auto animate-pulse"></div>
            </div>
          </div>

          {/* Feature cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 bg-gray-200 rounded-full w-32 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-full w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
