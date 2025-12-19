'use client'

import { Search, Bell, LogOut, Settings, User } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-eduaitutors.png"
                alt="EduAiTutors"
                width={150}
                height={50}
                className="object-contain"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 w-80 transition"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition">
                <Settings className="w-5 h-5" />
              </button>
              <button className="relative p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>

            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
              <div className="hidden text-right md:block">
                <p className="text-sm font-bold text-gray-900">Kavi</p>
                <p className="text-xs text-gray-500">Student Account</p>
              </div>
              <div className="relative group">
                <button className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform group-hover:scale-110 transition cursor-pointer">
                  K
                </button>
              </div>
              <Link
                href="/"
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition group"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

