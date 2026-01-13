'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Github, Chrome, ShieldCheck, User, CreditCard, ChevronRight, CheckCircle } from 'lucide-react'
import { toast } from 'react-toastify'

function LoginForm() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const packageName = searchParams.get('package')
  const packagePrice = searchParams.get('price')
  const grade = searchParams.get('grade')
  const board = searchParams.get('board')
  const subjectsStr = searchParams.get('subjects')
  const subjects = subjectsStr ? subjectsStr.split(',') : []

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(mode !== 'signup')
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Details, 2: Payment
  const router = useRouter()

  useEffect(() => {
    // Sync isLogin with mode param if it changes
    setIsLogin(mode !== 'signup')
    setStep(1)
  }, [mode])

  useEffect(() => {
    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('currentUser')
    if (loggedInUser) {
      router.push('/dashboard')
    }
  }, [router])

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      handleAuth()
    } else {
      if (step === 1) {
        setStep(2)
      } else {
        handleAuth()
      }
    }
  }

  const handleAuth = async () => {
    setIsLoading(true)

    // Simulate network delay
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')

      if (isLogin) {
        // Login Logic
        const user = users.find((u: any) => u.email === email && u.password === password)
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          toast.success('Welcome back! Logging you in...')
          setTimeout(() => router.push('/dashboard'), 1000)
        } else {
          toast.error('Invalid email or password')
          setIsLoading(false)
        }
      } else {
        // Registration Logic
        if (users.find((u: any) => u.email === email)) {
          toast.error('Account already exists with this email')
          setIsLoading(false)
          setStep(1)
          return
        }

        const newUser = {
          name,
          email,
          password,
          package: packageName,
          price: packagePrice,
          grade,
          board,
          subjects
        }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))

        toast.success('Registration successful! Confirmation email sent.', {
          icon: <CheckCircle className="text-green-500" />
        })

        // Mocking email sending
        console.log(`Sending confirmation email to ${email}...`)

        setTimeout(() => {
          toast.info('Please login to access your dashboard.', { delay: 500 })
          router.push('/')
        }, 1500)
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white selection:bg-primary-100">
      {/* Left Side: Visual Branding */}
      <div className="hidden lg:relative lg:flex flex-col items-center justify-center p-12 bg-secondary-900 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full -ml-48 -mb-48 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="mb-12">
            <Image
              src="/logo-eduaitutors.png"
              alt="EduAiTutors"
              width={350}
              height={120}
              className="object-contain brightness-0 invert"
            />
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Elevating Education <br />
            <span className="text-primary-500">Powered by AI.</span>
          </h1>

          <div className="space-y-6 text-gray-300 text-lg">
            <p className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary-500">
                <ShieldCheck className="w-5 h-5" />
              </span>
              Personalized Learning Pathways
            </p>
            <p className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary-500">
                <ShieldCheck className="w-5 h-5" />
              </span>
              24/7 AI-Trained Support
            </p>
            <p className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary-500">
                <ShieldCheck className="w-5 h-5" />
              </span>
              Interactive Advanced Curriculum
            </p>
          </div>
        </motion.div>

        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
            alt="Learning"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Side: Login/Signup Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50/50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 block lg:hidden">
            <Link href="/">
              <Image
                src="/logo-eduaitutors.png"
                alt="EduAiTutors"
                width={200}
                height={64}
                className="object-contain"
              />
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors group mb-8"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                  </Link>

                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {isLogin ? 'Welcome Back!' : 'Create Account'}
                  </h2>
                  <p className="text-gray-600">
                    {isLogin
                      ? 'Join thousands of students on their path to success.'
                      : 'Start your smart learning journey today with EduAiTutors.'}
                  </p>

                  {!isLogin && packageName && (
                    <div className="mt-6 p-4 bg-primary-50 rounded-2xl border border-primary-100 flex items-center justify-between mb-2">
                      <div>
                        <p className="text-[10px] text-primary-600 font-black uppercase tracking-[0.2em] mb-1">Selected Plan</p>
                        <h4 className="text-gray-900 font-bold text-base leading-tight">{packageName}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-primary-600 font-black text-xl leading-none">₹{Number(packagePrice).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleNextStep} className="space-y-5">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          required={!isLogin}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg hover:shadow-primary-500/20 disabled:opacity-70 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      isLogin ? 'Sign In' : (packageName ? 'Continue to Payment' : 'Sign Up')
                    )}
                    {!isLogin && packageName && !isLoading && <ChevronRight className="ml-2 w-5 h-5" />}
                  </motion.button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {isLogin ? 'Sign up free' : 'Sign in here'}
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors group mb-8"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Details
                  </button>

                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Secure Payment</h2>
                  <p className="text-gray-600">Complete your enrollment in {packageName}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Order Summary</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 font-medium">{packageName}</span>
                    <span className="text-gray-900 font-bold">₹{Number(packagePrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-gray-900 font-bold">Total Amount</span>
                    <span className="text-primary-600 text-xl font-black">₹{Number(packagePrice).toLocaleString()}</span>
                  </div>
                </div>

                <form onSubmit={handleNextStep} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Holder Name</label>
                    <input
                      type="text"
                      required
                      defaultValue={name}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm"
                      placeholder="Name on card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        maxLength={19}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
                          let matches = v.match(/\d{4,16}/g)
                          let match = matches && matches[0] || ''
                          let parts = []
                          for (let i = 0, len = match.length; i < len; i += 4) {
                            parts.push(match.substring(i, i + 4))
                          }
                          if (parts.length) { e.target.value = parts.join(' ') } else { e.target.value = v }
                        }}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM / YY"
                        maxLength={5}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        placeholder="•••"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm text-center"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-xl shadow-primary-500/30 disabled:opacity-70 flex items-center justify-center mt-4"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      `Pay ₹${Number(packagePrice).toLocaleString()} & Register`
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> SSL Secured & Encrypted Transaction
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
