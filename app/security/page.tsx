'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Lock, ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SecurityPage() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const passwordRequirements = [
    { label: 'At least 8 characters long', met: passwords.new.length >= 8 },
    { label: 'Include an uppercase letter', met: /[A-Z]/.test(passwords.new) },
    { label: 'Include a number or symbol', met: /[0-9!@#$%^&*]/.test(passwords.new) }
  ]

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Security Settings</h1>
              <p className="text-slate-500 font-medium text-lg">Manage your account security and authentication preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Update Password Form */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-900">Change Password</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Update your login credentials</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleUpdate} className="p-8 space-y-6">
                    {/* Current Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Current Password</label>
                      <div className="relative group">
                        <input
                          type={showCurrent ? 'text' : 'password'}
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white transition-all font-bold text-slate-700"
                          placeholder="••••••••••••"
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                        <button
                          type="button"
                          onClick={() => setShowCurrent(!showCurrent)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* New Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">New Password</label>
                        <div className="relative group">
                          <input
                            type={showNew ? 'text' : 'password'}
                            value={passwords.new}
                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white transition-all font-bold text-slate-700"
                            placeholder="New password"
                          />
                          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                          <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Confirm Password</label>
                        <div className="relative group">
                          <input
                            type={showConfirm ? 'text' : 'password'}
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white transition-all font-bold text-slate-700"
                            placeholder="Confirm password"
                          />
                          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={status === 'loading' || !passwords.new || passwords.new !== passwords.confirm}
                        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${status === 'success' ? 'bg-green-500 text-white' : 'bg-secondary-900 text-white hover:bg-black shadow-xl shadow-slate-900/20 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none'
                          }`}
                      >
                        {status === 'loading' ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : status === 'success' ? (
                          <>
                            <CheckCircle2 className="w-5 h-5" /> Password Updated
                          </>
                        ) : (
                          'Update Password'
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>

                {/* Account Activity Section Placeholder */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900">Login Activity</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent sessions and security events</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 font-bold text-sm text-center py-12">
                    No suspicious activity detected in the last 30 days.
                  </div>
                </div>
              </div>

              {/* Right Column - Requirements & Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Password Requirements</h3>
                  <div className="space-y-4">
                    {passwordRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${req.met ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-300'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-sm font-bold ${req.met ? 'text-slate-700' : 'text-slate-400'}`}>{req.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-primary-50 rounded-2xl border border-primary-100">
                    <p className="text-xs font-bold text-primary-700 leading-relaxed">
                      Security Tip: Avoid using common words or personal information in your password. A strong password helps protect your student data.
                    </p>
                  </div>
                </div>

                <div className="bg-secondary-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <ShieldCheck className="w-10 h-10 text-primary-500 mb-4" />
                    <h3 className="text-lg font-black mb-2">Two-Factor Auth</h3>
                    <p className="text-slate-400 text-xs font-bold mb-6 leading-relaxed">Add an extra layer of security to your account by enabling 2FA.</p>
                    <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                      Enable Now
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
