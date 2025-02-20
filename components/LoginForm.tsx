"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempted with:", { email, password })
  }

  return (
    <div className="relative z-10 w-full max-w-sm p-8 rounded-xl bg-[#0B0E14] bg-opacity-95 shadow-2xl border border-[#1a1f2e]">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-400">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#151820] text-white border-[#2a2f3e] focus:border-[#3b4058] focus:ring-1 focus:ring-[#3b4058] placeholder:text-gray-500"
          />
        </div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#151820] text-white border-[#2a2f3e] focus:border-[#3b4058] focus:ring-1 focus:ring-[#3b4058] placeholder:text-gray-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4169E1] hover:bg-[#3154c4] text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
        >
          Sign In
        </Button>
      </form>
      <div className="mt-6 text-center">
        <a href="#" className="text-sm text-gray-400 hover:text-gray-300">
          Don't have an account? Sign up
        </a>
      </div>
    </div>
  )
}

