"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SentIcon,
  Mail01Icon,
  CallIcon,
  Location01Icon,
  UserIcon,
  Message01Icon,
  Clock01Icon,
  ArrowRight01Icon,
  Calendar01Icon,
} from "@hugeicons/react";

export default function SimplifiedContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950 font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* 1. CLEAN HERO SECTION */}
      <section className="pt-40 pb-20 bg-[#f8fafc] border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 font-black tracking-[0.2em] uppercase text-xs mb-4 block">
              Contact Us
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-tight tracking-tighter mb-6">
              Let's Start a <span className="text-blue-600">Conversation.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Have a question or a project in mind? Reach out to us and let's
              explore how we can build the future together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE SECTION (Form + Cards) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left Side: Simple Form with Colored Borders */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-slate-500 font-medium">
                  We usually respond within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <UserIcon
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border-2 border-blue-100 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail01Icon
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"
                      size={20}
                    />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border-2 border-blue-100 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Message
                  </label>
                  <div className="relative">
                    <Message01Icon
                      className="absolute left-5 top-6 text-slate-300"
                      size={20}
                    />
                    <textarea
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border-2 border-blue-100 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium resize-none"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
                >
                  SEND MESSAGE <SentIcon size={22} />
                </motion.button>
              </form>
            </motion.div>

            {/* Right Side: Simple & Clean Contact Cards */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-900 mb-8">
                Reach us directly
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <ContactCard
                  icon={<Location01Icon size={24} />}
                  title="Visit Us"
                  details="Silicon Oasis, Digital Park, Dubai, UAE"
                />
                <ContactCard
                  icon={<Mail01Icon size={24} />}
                  title="Email Us"
                  details="hello@aashita.ai"
                />
                <ContactCard
                  icon={<CallIcon size={24} />}
                  title="Call Us"
                  details="+91 92160 63146"
                />
              </div>

              {/* 3. AVAILABILITY SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Calendar01Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Office Hours
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-500">Monday — Friday</span>
                    <span className="text-slate-900 font-bold">
                      09:00 AM — 06:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-500">Saturday</span>
                    <span className="text-slate-900 font-bold">
                      10:00 AM — 02:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium border-t border-slate-200 pt-3">
                    <span className="text-slate-400">Sunday</span>
                    <span className="text-blue-500 font-black uppercase tracking-widest text-[10px]">
                      Closed (Available for Emergencies)
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  details,
}: {
  icon: React.ReactNode;
  title: string;
  details: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all flex items-start gap-6 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-black text-slate-900 mb-1 tracking-tight">
          {title}
        </h4>
        <p className="text-slate-500 font-medium leading-relaxed">{details}</p>
      </div>
    </motion.div>
  );
}
