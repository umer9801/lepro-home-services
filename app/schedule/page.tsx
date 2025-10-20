"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SchedulePage() {
  const { toast } = useToast()
  const [payment, setPayment] = useState("EFT")

  const handleSuccess = () => {
    toast({
      title: "Booking submitted successfully!",
      description:
        "We've received your booking request. Please check your email for confirmation.",
    })
  }

  const handleError = (message: string) => {
    toast({
      title: "Booking failed",
      description: message || "Something went wrong. Please try again.",
      variant: "destructive",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      handleSuccess()
    } catch {
      handleError("Failed to submit booking.")
    }
  }

  return (
    <div className="bg-gray-50">
      {/* 🌟 HERO SECTION */}
      <section
        className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage: "url('/schero.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center text-white px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Professional Cleaning Services
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6">
            Bringing spotless spaces and sparkling results to homes, offices, and commercial properties across Canada.
          </p>
          <p className="text-base md:text-lg max-w-xl mx-auto text-gray-200">
            Whether it’s a deep clean, routine maintenance, or window cleaning — our experienced team is ready to make
            your space shine. Reliable service, flexible scheduling, and satisfaction guaranteed.
          </p>
        </motion.div>
      </section>

      {/* FORM SECTION */}
      <motion.div
        id="schedule-form"
        className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 🧭 Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Schedule Service Online
        </motion.h1>

        {/* 💬 Subtitle */}
        <motion.p
          className="text-center text-gray-600 mt-3 text-lg max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Choose your service, date, and time. We’ll send a confirmation to your email and can follow up by phone or
          WhatsApp if you prefer. Available across Canada.
        </motion.p>

        {/* 📅 Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-10 bg-white p-8 rounded-2xl shadow-xl space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {/* 🧍 Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              placeholder="Enter your name"
            />
          </div>

          {/* 📞 Phone Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* 📧 Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              placeholder="you@example.com"
            />
          </div>

          {/* 📍 Service Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Service Location</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              placeholder="Enter your address or area"
            />
          </div>

          {/* 🧰 Select Service */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Select Service</label>
            <select
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              <option value="">Select...</option>
              <option value="indoor">Indoor Cleaning</option>
              <option value="outdoor">Outdoor Cleaning</option>
              <option value="residential">Residential Cleaning</option>
              <option value="commercial">Commercial Cleaning</option>
              <option value="window">Window Cleaning</option>
            </select>
          </div>

          {/* 📅 Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date</label>
            <input
              type="date"
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>

          {/* ⏰ Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Time</label>
            <input
              type="time"
              required
              className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>

          {/* 💳 Payment Method */}
          <div className="space-y-3">
            <label className="block text-gray-700 font-semibold">Payment Method</label>
            <div className="flex gap-6">
              {["EFT", "Card", "Cash"].map((method) => (
                <label key={method} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={payment === method}
                    onChange={() => setPayment(method)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 🟩 Book Now Button */}
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300 cursor-pointer hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </motion.form>

        {/* 💚 WhatsApp Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link
            href="https://wa.me/16137161606"
            target="_blank"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-5 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.8)]"
          >
            <FaWhatsapp className="text-2xl" />
            Chat on WhatsApp
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
