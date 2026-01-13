"use client"

import { useEffect, useState } from 'react'
import PublicHeader from '@/components/PublicHeader'
import PublicFooter from '@/components/PublicFooter'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import PackagesSection from '@/components/PackagesSection'

export default function PackagesPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // If user is logged in, show the Dashboard layout
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 px-8 py-8">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Packages</h1>
              <p className="text-slate-500 font-medium text-lg">Your active subscription details.</p>
            </div>

            <PackagesSection variant="full" onlySubscribed={true} />
          </main>
        </div>
      </div>
    )
  }

  // Otherwise, show the Public layout
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="pt-8">
        <PackagesSection variant="full" />
      </main>
      <PublicFooter />
    </div>
  )
}
