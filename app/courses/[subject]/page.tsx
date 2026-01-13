'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import {
    ChevronDown,
    ChevronUp,
    Play,
    FileText,
    CheckCircle2,
    Maximize2,
    ExternalLink,
    ChevronRight,
    Video,
    FileBox
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CourseConsolePage() {
    const params = useParams()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [expandedSections, setExpandedSections] = useState<number[]>([1])
    const [selectedContent, setSelectedContent] = useState('Introduction to Motion in One Dimension')

    const subject = params.subject as string

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const toggleSection = (id: number) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const courseData = {
        title: 'Class 9 Physics',
        subtitle: 'Foundation for Advanced Mechanics',
        batch: 'Batch - Physics Mastery 2025',
        sections: [
            {
                id: 1,
                title: '1. Describing Motion',
                progress: '0 / 6',
                completed: false,
                items: [
                    { title: 'Introduction to Motion in One Dimension', type: 'VIDEO', completed: false },
                    { title: 'Distance vs Displacement: Explained', type: 'VIDEO', completed: false },
                    { title: 'Motion Dynamics - Chapter 1 Summary', type: 'PDF', completed: false },
                    { title: 'Problem Set: Calculating Speed and Velocity', type: 'Assignment', completed: false }
                ]
            },
            {
                id: 2,
                title: '2. Force and Laws of Motion',
                progress: '0 / 5',
                completed: false,
                items: [
                    { title: 'Newton\'s First Law: Concept of Inertia', type: 'VIDEO', completed: false },
                    { title: 'Momentum and Newton\'s Second Law', type: 'VIDEO', completed: false },
                    { title: 'Force Calculation Worksheet', type: 'PDF', completed: false }
                ]
            },
            {
                id: 3,
                title: '3. Gravitation',
                progress: '0 / 4',
                completed: false,
                items: [
                    { title: 'Universal Law of Gravitation', type: 'VIDEO', completed: false },
                    { title: 'Acceleration due to Gravity', type: 'VIDEO', completed: false }
                ]
            }
        ]
    }



    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-64 mt-16 p-0 flex h-[calc(100vh-64px)] overflow-hidden">

                    {/* COURSE CONSOLE SIDEBAR */}
                    <div className="w-[380px] bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
                        <div className="p-6 border-b border-slate-100">
                            <h1 className="text-xl font-black text-[#1E293B] leading-tight mb-1">
                                {courseData.title}: {courseData.subtitle}
                            </h1>
                            <p className="text-xs font-bold text-slate-500 mb-6">{courseData.batch}</p>

                            <div className="mb-6">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Select Subject</label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm text-[#334155] outline-none focus:ring-2 focus:ring-primary-500 transition-all cursor-pointer"
                                        defaultValue={decodeURIComponent(subject)}
                                    >
                                        <option>{decodeURIComponent(subject)}</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">0% Complete</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-500 w-[0%] rounded-full shadow-lg shadow-primary-500/20" />
                                </div>
                            </div>
                        </div>

                        {/* CONTENTS LIST */}
                        <div className="flex-1">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                                <h2 className="text-sm font-black text-[#1E293B] uppercase tracking-wider">Contents</h2>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {courseData.sections.map((section) => (
                                    <div key={section.id} className="bg-white">
                                        <button
                                            onClick={() => toggleSection(section.id)}
                                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${section.completed ? 'bg-green-500 border-green-500' : 'border-slate-200 group-hover:border-primary-400'}`}>
                                                    {section.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                </div>
                                                <span className="text-sm font-bold text-[#334155]">{section.title}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400">{section.progress}</span>
                                                {expandedSections.includes(section.id) ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {expandedSections.includes(section.id) && (
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: 'auto' }}
                                                    exit={{ height: 0 }}
                                                    className="overflow-hidden bg-[#F8FAFC]"
                                                >
                                                    {section.items.map((item, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setSelectedContent(item.title)}
                                                            className={`w-full text-left px-12 py-4 border-l-4 transition-all ${selectedContent === item.title
                                                                ? 'bg-white border-primary-500 shadow-sm'
                                                                : 'border-transparent hover:bg-slate-100'
                                                                }`}
                                                        >
                                                            <p className="text-sm font-semibold text-[#475569] mb-1">{item.title}</p>
                                                            <div className="flex items-center gap-2">
                                                                {item.type === 'VIDEO' && <Video className="w-3.5 h-3.5 text-primary-500" />}
                                                                {item.type === 'PDF' && <FileText className="w-3.5 h-3.5 text-red-500" />}
                                                                {item.type.includes('Assignment') && <FileBox className="w-3.5 h-3.5 text-amber-500" />}
                                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.type}</span>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* MAIN PLAYER AREA */}
                    <div className="flex-1 flex flex-col bg-white">


                        {/* PLAYER HEADER */}
                        <div className="p-8 flex items-center justify-between">
                            <h2 className="text-lg font-black text-[#1E293B]">{selectedContent}</h2>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1E293B] hover:bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-slate-900/20 active:scale-95">
                                    Complete & Continue
                                </button>
                                <button className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                                    <Maximize2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* PLAYER CONTENT */}
                        <div className="flex-1 p-8 pt-0">
                            <div className="w-full h-full bg-[#0F172A] rounded-[2rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                                    <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center mb-6 cursor-pointer transform transition-all group-hover:scale-110 shadow-3xl shadow-primary-600/40">
                                        <Play className="w-10 h-10 text-white ml-1" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2">{selectedContent}</h3>
                                    <p className="text-slate-400 font-medium">Click to start this lesson module</p>
                                </div>

                                {/* Player Skeleton UI */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-6">
                                        <Play className="w-5 h-5 text-white" />
                                        <div className="w-96 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary-500 w-[30%]" />
                                        </div>
                                        <span className="text-xs font-bold text-white tracking-widest uppercase">12:45 / 35:00</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Maximize2 className="w-5 h-5 text-white" />
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
