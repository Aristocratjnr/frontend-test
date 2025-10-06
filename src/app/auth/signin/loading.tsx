export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side - Image skeleton */}
      <div className="relative w-full md:w-1/2 lg:w-1/2 h-1/2 md:h-full">
        <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        <div className="absolute left-4 top-4 md:left-6 md:top-6">
          <div className="h-8 bg-gray-300 rounded w-16 animate-pulse"></div>
        </div>
      </div>

      {/* Right side - Form skeleton */}
      <div className="flex w-full md:w-1/2 lg:w-1/2 items-center justify-center bg-[#fafafa] h-1/2 md:h-full md:ml-0">
        <div className="w-full max-w-sm px-4 sm:px-6 md:px-8">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-8 animate-pulse"></div>

          {/* Form skeleton */}
          <div className="space-y-6">
            {/* Username field skeleton */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded w-full animate-pulse"></div>
            </div>

            {/* Password field skeleton */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
              <div className="relative">
                <div className="h-12 bg-gray-100 rounded w-full pr-10 animate-pulse"></div>
                <div className="absolute right-3 top-3 w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Button skeleton */}
            <div className="h-12 bg-gray-200 rounded-full w-full mt-6 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
