"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronDown, X, Package } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

type Props = {
  variant?: 'full' | 'compact'
  onLinkClick?: () => void
  onlySubscribed?: boolean
}

const packagesData = [
  { title: 'Foundation Builder', subtitle: 'Strengthens core concepts through structured lessons and step-by-step learning to build confidence and consistency.', file: 'foundation1.jpeg', price: 4999 },
  { title: 'Mastery Accelerator', subtitle: 'Balances concept clarity, practice, and skill refinement to deepen understanding and improve academic performance.', file: 'mastery.png', price: 7499 },
  { title: 'Excellence Pro', subtitle: 'Accelerated learning, advanced topics, and critical-thinking challenges to maximize potential and competitive readiness.', file: 'excellence.png', price: 9999 },
  { title: 'Revision Before Board Exam', subtitle: 'Intensive, results-driven revision program focused on high-yield topics and exam patterns.', file: 'revision board.png', price: 5999 },
  { title: 'Revision Before Final Exam', subtitle: 'Structured revision to reinforce concepts and improve retention.', file: 'revision final exam.png', price: 4999 },
  { title: 'Live Classes', subtitle: 'Real-time learning with expert educators with instant doubt clearing and flexible scheduling.', file: 'live class.png', price: 5499 },
]

export default function PackagesSection({ variant = 'full', onLinkClick, onlySubscribed = false }: Props) {
  const router = useRouter()
  const [selectedPkg, setSelectedPkg] = React.useState<any>(null)
  const [grade, setGrade] = React.useState('')
  const [board, setBoard] = React.useState('')
  const [subjects, setSubjects] = React.useState<string[]>([])
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const displayPackages = React.useMemo(() => {
    if (onlySubscribed && user?.package) {
      return packagesData.filter(pkg => pkg.title === user.package)
    }
    return packagesData
  }, [onlySubscribed, user?.package])

  const handleEnrollClick = (pkg: any) => {
    setSelectedPkg(pkg)
  }

  const handleProceed = () => {
    if (!grade || !board || subjects.length === 0) return
    const url = `/login?mode=signup&package=${encodeURIComponent(selectedPkg.title)}&price=${selectedPkg.price}&grade=${grade}&board=${board}&subjects=${encodeURIComponent(subjects.join(','))}`
    if (onLinkClick) onLinkClick()
    router.push(url)
    setSelectedPkg(null)
    setSubjects([])
  }

  if (variant === 'compact') {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPackages.slice(0, 3).map((pkg, idx) => (
            <div
              key={idx}
              className={`group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 cursor-pointer relative ${user?.package === pkg.title ? 'border-primary-600 scale-[1.02] shadow-primary-600/10' : 'border-gray-100'}`}
              onClick={() => {
                if (user?.package !== pkg.title) handleEnrollClick(pkg)
              }}
            >
              <div className="h-48 bg-amber-50 overflow-hidden relative">
                <img
                  src={`/Packages/${encodeURIComponent(pkg.file)}`}
                  alt={pkg.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{pkg.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-2">{pkg.subtitle}</p>

                <div className="mt-4 flex flex-col items-center">
                  {user?.package === pkg.title ? (
                    <div className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest border border-green-100">
                      <CheckCircle2 className="w-3 h-3" /> Subscribed
                    </div>
                  ) : (
                    <button
                      className="w-full flex items-center justify-center text-primary-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                    >
                      Explore Plan <ArrowRight className="ml-2 w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <AnimatePresence>
          {selectedPkg && (
            <PackageModal
              pkg={selectedPkg}
              onClose={() => setSelectedPkg(null)}
              grade={grade}
              setGrade={setGrade}
              board={board}
              setBoard={setBoard}
              subjects={subjects}
              setSubjects={setSubjects}
              onProceed={handleProceed}
            />
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <section id="packages" className={`relative ${onlySubscribed ? 'py-0' : 'py-20'} bg-gray-50/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!onlySubscribed && (
          <div className="relative overflow-hidden bg-secondary-900 rounded-[3rem] p-12 text-center text-white shadow-2xl mb-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full -ml-32 -mb-32 blur-3xl" />
            <h2 className="relative z-10 text-4xl md:text-5xl font-black mb-4">
              Grade <span className="text-primary-500">1 to 12</span> Packages
            </h2>
            <p className="relative z-10 text-xl text-gray-400 max-w-2xl mx-auto">
              Scientifically designed learning pathways to unlock your child's highest potential.
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayPackages.map((pkg, idx) => (
            <div key={idx} className={`group bg-white rounded-[2.5rem] p-8 pb-12 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 flex flex-col relative ${user?.package === pkg.title ? 'border-primary-600 ring-4 ring-primary-50' : 'border-transparent hover:border-primary-100'}`}>
              {user?.package === pkg.title && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-600/30 z-10 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3" /> Your Active Plan
                </div>
              )}
              <div className="w-full h-56 bg-white rounded-[2rem] mb-6 overflow-hidden shadow-inner relative">
                <img
                  src={`/Packages/${encodeURIComponent(pkg.file)}`}
                  alt={pkg.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{pkg.title}</h3>
              <p className="text-primary-600 font-bold text-lg mb-3">₹{pkg.price.toLocaleString()}</p>
              <p className="text-gray-600 mb-10 text-sm leading-relaxed">{pkg.subtitle}</p>
              <div className="relative mt-auto">
                {user?.package === pkg.title ? (
                  <div className="w-full inline-flex items-center justify-center gap-3 bg-primary-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary-600/20">
                    <CheckCircle2 className="w-5 h-5" /> Enrolled & Active
                  </div>
                ) : (
                  <button
                    onClick={() => handleEnrollClick(pkg)}
                    className="w-full inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-600/20 active:scale-95"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {!onlySubscribed && (
          <div className="mt-32">
            <div className="bg-gradient-to-br from-primary-600 to-secondary-900 p-12 md:p-16 rounded-[4rem] text-white shadow-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    Master the <br />
                    <span className="text-amber-400">Competitive Edge</span>
                  </h2>
                  <p className="text-xl text-white/80 mb-8 leading-relaxed">
                    Join India's most intensive preparation modules for medical and engineering entrance exams.
                  </p>
                  <div className="space-y-4">
                    {['Expert-led LIVE modules', 'Daily Practice Problems', 'All India Mock Series'].map((text) => (
                      <div key={text} className="flex items-center gap-3">
                        <CheckCircle2 className="text-amber-400 w-6 h-6" />
                        <span className="font-semibold">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`bg-white rounded-[3rem] p-2 shadow-2xl flex flex-col h-full group/card overflow-hidden border-4 relative ${user?.package === 'JEE Mastery' ? 'border-amber-400' : 'border-transparent'}`}>
                    {user?.package === 'JEE Mastery' && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-secondary-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-20 shadow-lg">
                        ACTIVE PLAN
                      </div>
                    )}
                    <div className="h-48 overflow-hidden rounded-[2.5rem]">
                      <img src={`/Packages/${encodeURIComponent('jee.png')}`} alt="JEE" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-110" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">JEE Mastery</h3>
                      <p className="text-primary-600 font-bold mb-3">₹14,999</p>
                      {user?.package === 'JEE Mastery' ? (
                        <div className="inline-block bg-amber-400 text-secondary-900 px-6 py-2 rounded-xl font-bold">Enrolled</div>
                      ) : (
                        <Link href={`/login?mode=signup&package=JEE%20Mastery&price=14999`} onClick={onLinkClick} className="inline-block bg-primary-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-600/20">Enroll Now</Link>
                      )}
                    </div>
                  </div>

                  <div className={`bg-white rounded-[3rem] p-2 shadow-2xl flex flex-col h-full group/card overflow-hidden border-4 relative ${user?.package === 'NEET Prep' ? 'border-amber-400' : 'border-transparent'}`}>
                    {user?.package === 'NEET Prep' && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-secondary-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-20 shadow-lg">
                        ACTIVE PLAN
                      </div>
                    )}
                    <div className="h-48 overflow-hidden rounded-[2.5rem]">
                      <img src={`/Packages/${encodeURIComponent('neet.png')}`} alt="NEET" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-110" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">NEET Prep</h3>
                      <p className="text-primary-600 font-bold mb-3">₹14,999</p>
                      {user?.package === 'NEET Prep' ? (
                        <div className="inline-block bg-amber-400 text-secondary-900 px-6 py-2 rounded-xl font-bold">Enrolled</div>
                      ) : (
                        <Link href={`/login?mode=signup&package=NEET%20Prep&price=14999`} onClick={onLinkClick} className="inline-block bg-primary-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-600/20">Enroll Now</Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPkg && (
          <PackageModal
            pkg={selectedPkg}
            onClose={() => setSelectedPkg(null)}
            grade={grade}
            setGrade={setGrade}
            board={board}
            setBoard={setBoard}
            subjects={subjects}
            setSubjects={setSubjects}
            onProceed={handleProceed}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function PackageModal({ pkg, onClose, grade, setGrade, board, setBoard, subjects, setSubjects, onProceed }: any) {
  const availableSubjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics']

  const toggleSubject = (s: string) => {
    if (subjects.includes(s)) {
      setSubjects(subjects.filter((item: string) => item !== s))
    } else {
      setSubjects([...subjects, s])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full text-primary-600 text-xs font-bold uppercase tracking-wider mb-3">
            Configure Enrollment
          </div>
          <h3 className="text-3xl font-black text-gray-900 leading-tight">{pkg.title}</h3>
          <p className="text-gray-500 mt-2">Almost there! Select student preferences to proceed.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-wider">Select Grade</label>
            <div className="relative group">
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none font-bold text-base cursor-pointer"
              >
                <option value="">Choose Grade</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-wider">Select Subjects</label>
            <div className="grid grid-cols-2 gap-3">
              {availableSubjects.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSubject(s)}
                  className={`py-3 px-4 rounded-2xl font-bold text-sm transition-all border-2 flex items-center justify-between ${subjects.includes(s)
                    ? 'bg-primary-50 border-primary-600 text-primary-600 shadow-sm'
                    : 'bg-white border-gray-100 text-gray-500 hover:border-primary-100 hover:bg-primary-50/30'
                    }`}
                >
                  {s}
                  {subjects.includes(s) && <CheckCircle2 className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-wider">Select Board</label>
            <div className="grid grid-cols-2 gap-4">
              {['CBSE', 'ICSE'].map((b) => (
                <button
                  key={b}
                  onClick={() => setBoard(b)}
                  className={`py-4 rounded-2xl font-bold text-base transition-all border-2 ${board === b
                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/20'
                    : 'bg-white border-gray-100 text-gray-500 hover:border-primary-100 hover:bg-primary-50/30'
                    }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!grade || !board || subjects.length === 0}
            onClick={onProceed}
            className="w-full py-5 bg-secondary-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none mt-2"
          >
            Confirm & Proceed
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
