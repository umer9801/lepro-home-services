"use client"

import { motion } from "framer-motion"
import { ScheduleForm } from "@/components/schedule-form"

export default function SchedulePage() {
  return (
    <motion.div
      className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated Gradient Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Schedule Service Online
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        className="text-center text-gray-600 mt-3 text-lg max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Choose your service, date, and time. We’ll send a confirmation to your email and can follow up by phone or
        WhatsApp if you prefer. Available across Canada.
      </motion.p>

      {/* Form Animation */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <ScheduleForm />
      </motion.div>
    </motion.div>
  )
}
