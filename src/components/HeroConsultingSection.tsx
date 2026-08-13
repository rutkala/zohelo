import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Building, MessageSquare, Award, Clock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { consultantProfile } from '../data/consultantData';

interface HeroConsultingSectionProps {
  onSubmitSuccess?: () => void;
}

export const HeroConsultingSection: React.FC<HeroConsultingSectionProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#3B8B94', '#3A6FA4', '#10B981', '#F59E0B']
      });

      if (onSubmitSuccess) onSubmitSuccess();
    }, 600);
  };

  return (
    <section id="consulting" className="w-full pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Mockup: "THE HERO SECTION" */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500">
              The Hero Section
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Client Acquisition & Strategic Advisory Gateway
            </p>
          </div>
          <span className="text-xs font-semibold text-[#3B8B94]">
            10+ Years Dedicated Analytics Experience
          </span>
        </div>

        {/* Consulting Gateway Container matching exact Mockup Layout */}
        <div className="zohelo-card p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN (Cols 1-7): Profile & Timeline */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              
              {/* Header Profile Block matching Mockup */}
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#3B8B94] tracking-wide mb-1">
                  <span>Premium B2B consulting gateway</span>
                </div>

                <div className="flex items-start space-x-4">
                  {/* Portrait Avatar */}
                  <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#3B8B94] to-[#3A6FA4] p-0.5 shadow-md">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      {/* Styled avatar representing Radosław Utkała */}
                      <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-700">
                        <User className="w-8 h-8 sm:w-10 sm:h-10 text-slate-500 mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Name matching Mockup */}
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#24292E] tracking-tight leading-tight">
                      Analytics Solutions & Consulting
                    </h3>
                    <div className="text-lg sm:text-xl font-bold text-[#3B8B94] mt-0.5 font-serif-heading">
                      {consultantProfile.name}
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {consultantProfile.title}
                    </div>
                  </div>
                </div>

                {/* Bio text matching Mockup */}
                <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed max-w-xl">
                  {consultantProfile.bio}
                </p>
              </div>

              {/* Career Timeline (2014, 2017, 2020, 2024) matching exact Mockup */}
              <div className="pt-2">
                
                {/* Horizontal Timeline Bar */}
                <div className="relative pt-6 pb-2">
                  
                  {/* Background Connecting Line */}
                  <div className="absolute top-8 left-4 right-4 h-0.5 bg-slate-200" />
                  
                  <div className="grid grid-cols-4 gap-2 relative z-10">
                    {consultantProfile.timeline.map((item, index) => {
                      const isActive = activeTimelineIndex === index;
                      return (
                        <div
                          key={item.year}
                          onClick={() => setActiveTimelineIndex(index)}
                          className="flex flex-col items-center text-center group cursor-pointer"
                        >
                          {/* Dot on Line */}
                          <div
                            className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                              isActive
                                ? 'bg-[#3B8B94] border-[#3B8B94] scale-125 shadow-xs'
                                : 'bg-white border-slate-300 group-hover:border-[#3B8B94]'
                            }`}
                          >
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>

                          {/* Year */}
                          <span className={`text-xs sm:text-sm font-extrabold font-mono-code mt-3 transition-colors ${
                            isActive ? 'text-[#3B8B94]' : 'text-slate-700 group-hover:text-slate-900'
                          }`}>
                            {item.year}
                          </span>

                          {/* Role Label */}
                          <span className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-tight line-clamp-2">
                            {item.role}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Active Milestone Card */}
                <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs">
                  <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                    <Award className="w-3.5 h-3.5 text-[#3B8B94]" />
                    <span>{consultantProfile.timeline[activeTimelineIndex].year} Milestone:</span>
                  </div>
                  <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                    {consultantProfile.timeline[activeTimelineIndex].description}
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN (Cols 8-12): Contact Form matching Mockup */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight pb-1">
                    Request Strategy Consultation
                  </h4>

                  {/* Full Name Input */}
                  <div>
                    <label htmlFor="fullName" className="sr-only">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#3B8B94] focus:ring-1 focus:ring-[#3B8B94] transition-all"
                    />
                  </div>

                  {/* Email Address Input */}
                  <div>
                    <label htmlFor="email" className="sr-only">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#3B8B94] focus:ring-1 focus:ring-[#3B8B94] transition-all"
                    />
                  </div>

                  {/* Company/Organization Input */}
                  <div>
                    <label htmlFor="company" className="sr-only">Company/Organization</label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Company/Organization"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#3B8B94] focus:ring-1 focus:ring-[#3B8B94] transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Message (e.g. Polish data pipeline, municipal audit, custom BI dashboard)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#3B8B94] focus:ring-1 focus:ring-[#3B8B94] transition-all resize-none"
                    />
                  </div>

                  {/* Send Message Button matching Mockup's solid Teal button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-[#3B8B94] hover:bg-[#2C6E76] text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center pt-1">
                    Direct confidential reply within 24 business hours.
                  </p>
                </form>
              ) : (
                <div className="py-6 flex flex-col items-center text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Consultation Request Sent
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs">
                    Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Radosław Utkała has received your inquiry and will reach out via <span className="font-mono-code text-[#3B8B94]">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: '', email: '', company: '', message: '' });
                    }}
                    className="mt-3 text-xs text-[#3B8B94] font-semibold underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
