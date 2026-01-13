'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import QuizProgress from '@/components/QuizProgress'
import LearningProgress from '@/components/LearningProgress'
import RightPanel from '@/components/RightPanel'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser')
    if (!loggedInUser) {
      router.push('/login')
    } else {
      setUser(JSON.parse(loggedInUser))
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left/Middle Column - Content */}
            <div className="flex-1">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative z-10">
                  <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome Back, {user.name}! 🚀</h1>
                  <h3 className="text-xl text-gray-500 font-medium">Continue your learning journey and achieve your goals today.</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <QuizProgress />
                <LearningProgress />
              </div>

              <WhyChooseUs />
              <div className="mt-8">
                <Testimonials />
              </div>
            </div>

            {/* Right Side Section - Analytics & Schedule */}
            <div className="w-full lg:w-96 space-y-8">
              <RightPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

