'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, BookOpen, Clock, PlayCircle, MoreVertical } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CoursesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeFilter, setActiveFilter] = useState('Active Subjects')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      // Check for subjects in any possible format (array or comma string)
      if (typeof parsed.subjects === 'string') {
        parsed.subjectList = parsed.subjects.split(',').map((s: string) => s.trim())
      } else if (Array.isArray(parsed.subjects)) {
        parsed.subjectList = parsed.subjects
      } else {
        // Fallback mock subjects if none found
        parsed.subjectList = ['Physics', 'Chemistry', 'Mathematics', 'Biology']
      }
      setUser(parsed)
    }
  }, [])

  const dropdownOptions = ['Active Subjects', 'Completed Subjects', 'Archived']

  const filteredSubjects = user?.subjectList?.filter((s: string) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-2xl font-black text-[#1E293B] group"
              >
                {activeFilter} ({filteredSubjects.length})
                <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20"
                    >
                      {dropdownOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setActiveFilter(opt)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${activeFilter === opt ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium text-slate-700 shadow-sm"
              />
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSubjects.map((subject: string, idx: number) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative cursor-pointer"
                onClick={() => router.push(`/courses/${encodeURIComponent(subject)}`)}
              >
                {/* Stacked Effect */}
                <div className="absolute inset-x-4 -bottom-2 h-4 bg-white/50 border border-slate-200 rounded-3xl -z-10 transform scale-x-95 translate-y-1" />
                <div className="absolute inset-x-8 -bottom-4 h-4 bg-white/30 border border-slate-200 rounded-3xl -z-20 transform scale-x-90 translate-y-2" />

                <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                  {/* Subject Image Placeholder / Gradient */}
                  <div className={`h-40 relative flex items-center justify-center overflow-hidden bg-gradient-to-br transition-all duration-500 ${subject === 'Physics' ? 'from-blue-500 to-indigo-600' :
                    subject === 'Chemistry' ? 'from-emerald-400 to-teal-600' :
                      subject === 'Mathematics' ? 'from-orange-500 to-red-600' :
                        'from-purple-500 to-pink-600'
                    }`}>
                    <BookOpen className="w-16 h-16 text-white opacity-20 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                        {user?.package || 'Standard Plan'}
                      </span>
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition shadow-lg">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors">
                      {subject} Mastery: {user?.grade ? `Grade ${user.grade}` : 'Advanced Level'}
                    </h3>

                    <div className="mt-auto space-y-4">
                      {/* Progress Section */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                          <span className="text-sm font-bold text-slate-900">0%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '0%' }}
                            className="h-full bg-primary-500 rounded-full shadow-lg shadow-primary-500/20"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-[11px] font-bold">Expires 31 Jan 2026</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                          <PlayCircle className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {!filteredSubjects.length && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No subjects found</h3>
              <p className="text-slate-500">Try searching with a different keyword </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
