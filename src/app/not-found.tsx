"use client"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/auth/signin"
            className="inline-block w-full bg-[#0DD983] hover:bg-[#0DD983] text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            Go to Login
          </a>

          <button
            onClick={() => window.history.back()}
            className="inline-block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors"
          >
            Go Back
          </button>
        </div>

      
      </div>
    </div>
  )
}
