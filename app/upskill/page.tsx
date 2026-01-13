'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import {
  Rocket,
  Map as MapIcon,
  Plus,
  ChevronRight,
  Star,
  Sparkles,
  Search,
  BookOpen,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function UpskillPage() {
  const [activeCategory, setActiveCategory] = useState('My Goals')

  const categories = ['My Goals', 'Roadmaps', 'Exploration', 'Certifications']

  const upskillGoals = [
    { title: 'Master Quantum Physics', level: 'Intermediate', progress: 45, icon: '🌌', color: 'from-indigo-500 to-purple-600' },
    { title: 'Advanced Calculus', level: 'Beginner', progress: 10, icon: '📐', color: 'from-orange-400 to-red-600' },
    { title: 'Organic Chemistry Lab', level: 'Expert', progress: 85, icon: '🧪', color: 'from-emerald-400 to-teal-600' },
  ]

  const recommendedRoadmaps = [
    {
      title: 'Engineering Foundation',
      description: 'The ultimate path for future engineers, focusing on advanced mechanics and calculus.',
      modules: 12,
      duration: '6 Months',
      enrolled: true,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Medical Sciences Prep',
      description: 'Deep dive into human biology, organic chemistry and entrance exam logic.',
      modules: 15,
      duration: '8 Months',
      enrolled: false,
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-3">
                  Upskill Planner <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
                </h1>
                <p className="text-slate-500 font-medium text-lg">Design your path to academic excellence beyond the classroom.</p>
              </div>
              <button className="px-8 py-4 bg-primary-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition shadow-xl shadow-primary-600/20 active:scale-95 flex items-center gap-3">
                <Plus className="w-5 h-5" /> Start New Goal
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-8 mb-10 border-b border-slate-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-4 px-2 font-black text-sm uppercase tracking-widest transition-all relative ${activeCategory === cat ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-12">
                {/* Active Goals Section */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-slate-900">Active Goals</h2>
                    <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-full">3 Goals In Progress</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upskillGoals.map((goal, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden group"
                      >
                        <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${goal.color}`} />
                        <div className="flex items-start justify-between mb-6">
                          <span className="text-4xl">{goal.icon}</span>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Level</p>
                            <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black rounded-full border border-slate-100">{goal.level}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-primary-600 transition-colors">{goal.title}</h3>

                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px] font-black uppercase text-slate-400">
                            <span>Milestones</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${goal.progress}%` }}
                              className={`h-full bg-slate-900 group-hover:bg-primary-600 transition-colors duration-500`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-primary-200 transition group">
                      <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition">
                        <Plus className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Add New Goal</span>
                    </button>
                  </div>
                </section>

                {/* Roadmaps Explorer */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Recommended Roadmaps</h2>
                    <button className="text-primary-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {recommendedRoadmaps.map((map, idx) => (
                      <div key={idx} className="bg-white rounded-[3rem] p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 group overflow-hidden">
                        <div className="w-full md:w-64 h-48 rounded-[2.5rem] overflow-hidden">
                          <img src={map.image} alt={map.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="flex-1 py-4 pr-6 flex flex-col">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="bg-amber-50 text-amber-600 p-1 rounded-md"><Star className="w-3 h-3 fill-current" /></span>
                            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Top Rated Pathway</span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 mb-2">{map.title}</h3>
                          <p className="text-slate-500 font-medium text-sm mb-6 line-clamp-2">{map.description}</p>

                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex gap-6">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Modules</span>
                                <span className="font-bold text-slate-700">{map.modules} Units</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Time</span>
                                <span className="font-bold text-slate-700">{map.duration}</span>
                              </div>
                            </div>
                            {map.enrolled ? (
                              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                                <CheckCircle2 className="w-4 h-4" /> Enrolled
                              </div>
                            ) : (
                              <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase hover:bg-black transition shadow-lg">
                                View Roadmap
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Learning Insights Sidebar */}
              <div className="space-y-10">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                  <h2 className="text-xl font-black text-slate-900 mb-6">Learning Insights</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Rocket className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">Fastest Learner in Physics</p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">Global Top 5%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">Resource Mastery</p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">45 Materials Read</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">Daily Streak</p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">12 Days Consistency</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <MapIcon className="w-10 h-10 text-primary-500 mb-4 group-hover:rotate-12 transition-transform" />
                    <h3 className="text-2xl font-black mb-2 leading-tight">AI Personalized <br />Roadmap</h3>
                    <p className="text-slate-400 font-bold text-xs mb-8 leading-relaxed">
                      Let our AI analyze your progress and generate a unique upskilling path tailored to your college goals.
                    </p>
                    <button className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-600/20 hover:bg-primary-500 transition active:scale-[0.98]">
                      Generate Roadmap
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary-600/5 rounded-full -mr-24 -mt-24 blur-3xl" />
                </div>

                <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Upcoming Milestones</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-bold text-slate-600">Calculus Exam</span>
                      <span className="text-[10px] font-black text-primary-600 uppercase bg-primary-50 px-2 py-1 rounded">2 Days</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-bold text-slate-600">Physics Module 4</span>
                      <span className="text-[10px] font-black text-amber-600 uppercase bg-amber-50 px-2 py-1 rounded">Tomorrow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
