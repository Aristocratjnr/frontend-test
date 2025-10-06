"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log("Login submitted", { username, password })
    // Redirect to home page after successful login
    router.push("/Syst/home")
  }

  const hasContent = username.trim() !== "" && password.trim() !== ""

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side - Image with logo */}
      <div className="relative w-full md:w-1/2 lg:w-1/2 h-1/2 md:h-full">
        <Image
          src="/images/signin.png"
          alt="Person enjoying food"
          fill
          className="object-cover"
          priority
        />
       
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full md:w-1/2 lg:w-1/2 items-center justify-center bg-[#fafafa] h-1/2 md:h-full md:ml-0">
        <div className="w-full max-w-sm px-4 sm:px-6 md:px-8">
          <h2 className="mt-2 mb-8 text-xl sm:text-2xl md:text-3xl font-semibold text-black text-center lg:text-left">
            Log in to Syst
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-6">
            <div>
              <label htmlFor="username" className="mb-1 block text-sm text-[#666666]">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-0 border-b bg-transparent pb-1 sm:pb-2 text-sm sm:text-base text-black outline-none transition-colors focus:border-b-2 focus:border-[#00d97e]"
                style={{
                  borderBottomColor: "#d0d0d0",
                  borderBottomWidth: "3px",
                }}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm text-[#666666]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-0 border-b bg-transparent pb-1 sm:pb-2 text-sm sm:text-base text-black outline-none transition-colors focus:border-b-2 focus:border-[#00d97e] pr-10"
                  style={{
                    borderBottomColor: "#d0d0d0",
                    borderBottomWidth: "3px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !hasContent}
              className={`mt-4 w-full max-w-md mx-auto rounded-full py-2 sm:py-3 text-sm sm:text-base font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoading || !hasContent
                  ? 'bg-gray-400 cursor-not-allowed'
                  : hasContent
                    ? 'bg-[#0DD983] hover:opacity-90 focus:ring-[#0DD983]'
                    : 'bg-[#0DD9834F] focus:ring-[#0DD9834F]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Log in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
