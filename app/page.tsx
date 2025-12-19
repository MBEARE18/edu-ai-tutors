'use client'

import { useState } from 'react'
import Link from 'next/link'
import PublicHeader from '@/components/PublicHeader'
import PublicFooter from '@/components/PublicFooter'
import HeroSlider from '@/components/HeroSlider'
import CoursesSection from '@/components/CoursesSection'
import EnrollmentForm from '@/components/EnrollmentForm'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [selectedBoard, setSelectedBoard] = useState('cbse')
  const [selectedSubjects, setSelectedSubjects] = useState<any[]>([])
  const [showEnrollForm, setShowEnrollForm] = useState(false)

  const updateSelectedSubjects = (subjects: any[]) => {
    setSelectedSubjects(subjects)
  }

  const openEnrollForm = () => {
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject before enrolling!')
      return
    }
    setShowEnrollForm(true)
  }

  const closeEnrollForm = () => {
    setShowEnrollForm(false)
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  }

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <HeroSlider>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold mb-6 leading-tight drop-shadow-lg"
          >
            Smart Learning. Powered by AI. Designed for Your Success.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow"
          >
            Find the right learning pathway for your goals with expert-led courses, interactive classes, and personalized support.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#courses"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl inline-flex items-center justify-center transform hover:scale-105 active:scale-95"
            >
              Find a course
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </HeroSlider>

      {/* Study Locations/Boards Section */}
      <motion.section
        {...fadeIn}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Study Boards</motion.h2>
            <motion.p {...fadeIn} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover where learning can take you. Whether you are pursuing academic excellence or exploring career opportunities, our board options offer the ideal environment to grow and thrive.
            </motion.p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {[
              { name: 'CBSE', desc: 'Central Board of Secondary Education', link: '#courses', image: '📚' },
              { name: 'ICSE', desc: 'Indian Certificate of Secondary Education', link: '#courses', image: '🎓' },
            ].map((board, idx) => (
              <motion.a
                key={idx}
                href={board.link}
                variants={cardVariants}
                className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-primary-500 hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{board.image}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                  {board.name}
                </h3>
                <p className="text-gray-600 mb-4">{board.desc}</p>
                <span className="text-primary-600 font-semibold inline-flex items-center">
                  Explore courses
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Subject Areas Section */}
      <motion.section
        {...fadeIn}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Study Your Favorite Subject</motion.h2>
            <motion.p {...fadeIn} className="text-xl text-gray-600">
              Whether you are passionate about science, mathematics, or languages, find the right path to meet your chosen goals.
            </motion.p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {[
              { name: 'Mathematics', icon: '🔢', color: 'from-blue-500 to-blue-600' },
              { name: 'Physics', icon: '⚛️', color: 'from-purple-500 to-purple-600' },
              { name: 'Chemistry', icon: '🧪', color: 'from-green-500 to-green-600' },
              { name: 'Biology', icon: '🧬', color: 'from-pink-500 to-pink-600' },
              { name: 'English', icon: '📝', color: 'from-orange-500 to-orange-600' },
            ].map((subject, idx) => (
              <motion.a
                key={idx}
                href="#courses"
                variants={cardVariants}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition text-center group transform hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br ${subject.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform duration-300`}>
                  {subject.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-wider text-sm">{subject.name}</h3>
              </motion.a>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <motion.a
              {...fadeIn}
              href="#courses"
              className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center group"
            >
              View all subjects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Courses Section - RESTORED FUNCTIONALITY */}
      <CoursesSection
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
        onSubjectChange={updateSelectedSubjects}
        onEnrollClick={openEnrollForm}
      />

      {/* Why Study With Us */}
      <motion.section
        {...fadeIn}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Study With Us</motion.h2>
            <motion.p {...fadeIn} className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re a new-age learning platform built around AI models and AI-trained tutors to make concepts clear, fast and engaging.
            </motion.p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { title: 'AI-Powered Learning', desc: 'Every course is designed around smart AI models that personalise practice, explain doubts and adapt to how you learn.', label: 'AI' },
              { title: 'AI-Trained Tutors', desc: 'Human tutors are trained to work with AI tools, so you get both expert guidance and instant AI support in every session.', label: '1:1' },
              { title: 'Always-On Help', desc: 'Ask questions any time, get AI-powered explanations in seconds, and use our practice tools whenever you want to study.', label: '24/7' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="text-center p-6 rounded-2xl hover:bg-primary-50 transition-colors duration-300 group"
              >
                <div className="text-5xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">{item.label}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{item.title}</div>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Student Testimonials removed as per request */}

      {/* Enrollment Form - RESTORED */}
      {showEnrollForm && (
        <EnrollmentForm
          selectedSubjects={selectedSubjects}
          onClose={closeEnrollForm}
        />
      )}

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-primary-600 to-secondary-900 text-white relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Making Quality Education Accessible to All</h2>
          <p className="text-xl text-gray-200 mb-8">
            We aim to deliver life-enhancing experiences to help students worldwide develop personally and professionally, enriching their future opportunities.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition shadow-lg transform hover:scale-105 active:scale-95"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>

        {/* Subtle background circles for extra "premium" feel */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/10 rounded-full -ml-32 -mb-32 blur-3xl" />
      </motion.section>

      <PublicFooter />
    </div>
  )
}
