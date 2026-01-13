'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { CheckCircle2, Clock, Trophy, Play } from 'lucide-react'

export default function QuizPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const quizData: Record<string, any> = {
    'Physics': [
      {
        title: 'Newton\'s Laws of Motion',
        description: 'Test your understanding of the three fundamental laws that govern motion.',
        questions: 15,
        duration: '20 mins',
        difficulty: 'Medium',
        status: 'not-attempted'
      },
      {
        title: 'Work, Energy & Power',
        description: 'Challenge yourself with questions on work, energy conservation, and power calculations.',
        questions: 12,
        duration: '15 mins',
        difficulty: 'Hard',
        status: 'not-attempted'
      }
    ],
    'Chemistry': [
      {
        title: 'Periodic Table & Elements',
        description: 'Assess your knowledge of periodic trends, element properties, and chemical families.',
        questions: 20,
        duration: '25 mins',
        difficulty: 'Easy',
        status: 'not-attempted'
      },
      {
        title: 'Chemical Bonding',
        description: 'Explore ionic, covalent, and metallic bonds through this comprehensive quiz.',
        questions: 18,
        duration: '22 mins',
        difficulty: 'Medium',
        status: 'not-attempted'
      }
    ],
    'Biology': [
      {
        title: 'Cell Structure & Function',
        description: 'Test your understanding of organelles, cell types, and cellular processes.',
        questions: 16,
        duration: '18 mins',
        difficulty: 'Medium',
        status: 'not-attempted'
      },
      {
        title: 'Photosynthesis & Respiration',
        description: 'Deep dive into the energy conversion processes in living organisms.',
        questions: 14,
        duration: '20 mins',
        difficulty: 'Hard',
        status: 'not-attempted'
      }
    ],
    'Mathematics': [
      {
        title: 'Algebra Fundamentals',
        description: 'Practice solving equations, inequalities, and algebraic expressions.',
        questions: 25,
        duration: '30 mins',
        difficulty: 'Easy',
        status: 'not-attempted'
      },
      {
        title: 'Trigonometry Basics',
        description: 'Master sine, cosine, tangent, and their applications in problem-solving.',
        questions: 20,
        duration: '28 mins',
        difficulty: 'Medium',
        status: 'not-attempted'
      }
    ]
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 mt-16 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Quiz Center</h1>
            <p className="text-slate-500 font-medium text-lg">Test your knowledge and track your progress</p>
          </div>

          {user && user.subjects && user.subjects.length > 0 ? (
            <div className="space-y-8">
              {user.subjects.map((subject: string) => {
                const quizzes = quizData[subject]
                if (!quizzes) return null

                return (
                  <div key={subject} className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{subject} Quizzes</h2>
                        <p className="text-slate-500 mt-1">Complete these quizzes to master the concepts</p>
                      </div>
                      <div className="bg-primary-50 px-4 py-2 rounded-xl">
                        <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                          {quizzes.length} Available
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {quizzes.map((quiz: any, idx: number) => (
                        <div key={idx} className="group bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-primary-200 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-black text-lg text-slate-900 mb-2">{quiz.title}</h3>
                              <p className="text-sm text-slate-600 mb-4">{quiz.description}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(quiz.difficulty)}`}>
                              {quiz.difficulty}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {quiz.duration}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              {quiz.questions} Questions
                            </span>
                          </div>

                          <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 group-hover:shadow-xl">
                            <Play className="w-4 h-4" />
                            Start Quiz
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Quiz Stats Summary */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-xl">
                  <Trophy className="w-10 h-10 mb-4 opacity-80" />
                  <p className="text-3xl font-black mb-1">0</p>
                  <p className="text-primary-100 text-sm font-medium">Quizzes Completed</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl">
                  <CheckCircle2 className="w-10 h-10 mb-4 opacity-80" />
                  <p className="text-3xl font-black mb-1">0%</p>
                  <p className="text-green-100 text-sm font-medium">Average Score</p>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
                  <Clock className="w-10 h-10 mb-4 opacity-80" />
                  <p className="text-3xl font-black mb-1">0h</p>
                  <p className="text-slate-300 text-sm font-medium">Time Spent</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-16 text-center shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Trophy className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">No Subjects Selected</h2>
              <p className="text-slate-500 mb-8 font-medium">Please select subjects in your subscription to access quizzes.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
