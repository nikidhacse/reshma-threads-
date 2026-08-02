import React, { useState } from 'react'
import { MessageSquare, Send, CheckCircle2, HelpCircle, User, MessageCircle, Sparkles } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export const CustomerInquiriesSection = () => {
  const { comments, postComment, settings } = useStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    design_code: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.message.trim()) return

    setSubmitting(true)
    await postComment(formData)
    setSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', design_code: '', message: '' })

    setTimeout(() => setSubmitted(false), 5000)
  }

  const rawNumber = (settings.whatsapp_number || '+917708521531').replace(/[^0-9]/g, '')

  return (
    <section className="py-20 bg-pearl relative overflow-hidden border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gold bg-ebony border border-gold/30 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            Client Questions & Inquiry Board
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ebony tracking-tight">
            Have a Question About Our Collections?
          </h2>
          <p className="text-ebony/65 text-sm sm:text-base mt-3 leading-relaxed">
            Ask us about custom blouse necklines, saree pre-pleating, outstation delivery, or fabric matching. Post your question below or chat with us directly on WhatsApp!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT FORM: Post a Question / Comment */}
          <div className="lg:col-span-5 bg-white border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-xl relative">
            <div className="flex items-center gap-3 mb-6 border-b border-sand-dark pb-4">
              <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-bold">
                <HelpCircle className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-ebony">Ask a Question</h3>
                <p className="text-xs text-ebony/50">Our studio answers every query directly</p>
              </div>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-start gap-2.5 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-sm">Question Submitted!</strong>
                  Your question has been posted to our board. We'll respond shortly!
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ebony/80 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-sand/30 border border-gold/20 rounded-xl px-4 py-2.5 text-xs text-ebony placeholder:text-ebony/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ebony/80 mb-1">Email / Phone (Optional)</label>
                  <input
                    type="text"
                    placeholder="For direct reply"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-sand/30 border border-gold/20 rounded-xl px-4 py-2.5 text-xs text-ebony placeholder:text-ebony/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ebony/80 mb-1">Design Code (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. RTS-SIG-001"
                    value={formData.design_code}
                    onChange={e => setFormData({ ...formData, design_code: e.target.value })}
                    className="w-full bg-sand/30 border border-gold/20 rounded-xl px-4 py-2.5 text-xs text-ebony placeholder:text-ebony/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ebony/80 mb-1">Your Question or Comment *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ask about measurements, neck cut-work, delivery timelines, saree pleating..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-sand/30 border border-gold/20 rounded-xl p-4 text-xs text-ebony placeholder:text-ebony/40 focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-ebony hover:bg-gold text-gold hover:text-ebony font-bold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md border border-gold/30 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Question to Studio</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-ebony/50">Need instant answers?</span>{' '}
                <a
                  href={`https://wa.me/${rawNumber}?text=${encodeURIComponent('Hi Reshma! I have a question about custom tailoring.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-bold text-xs hover:underline inline-flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  Chat Live on WhatsApp
                </a>
              </div>
            </form>
          </div>

          {/* RIGHT DISPLAY: Submitted Questions & Studio Responses */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-gold/20 pb-3">
              <h3 className="font-serif text-2xl font-bold text-ebony">Recent Questions & Discussions</h3>
              <span className="text-xs font-semibold text-gold bg-ebony px-3 py-1 rounded-full">
                {comments.length} Posted
              </span>
            </div>

            {comments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-gold/20 p-8">
                <MessageSquare className="w-10 h-10 text-gold/40 mx-auto mb-3" />
                <p className="text-sm font-semibold text-ebony">No questions posted yet</p>
                <p className="text-xs text-ebony/60 mt-1">Be the first to ask a question using the form!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[560px] overflow-y-auto pr-2 scrollbar-none">
                {comments.map((comm) => (
                  <div
                    key={comm.id}
                    className="bg-white border border-gold/20 rounded-2xl p-5 shadow-sm space-y-3 hover:border-gold/50 transition-colors"
                  >
                    {/* User Question */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-xs">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-ebony text-sm">{comm.name}</h4>
                          <span className="text-[10px] text-ebony/40">
                            {new Date(comm.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {comm.design_code && (
                        <span className="bg-sand text-brown font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gold/20 shrink-0">
                          #{comm.design_code}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-ebony/80 leading-relaxed bg-sand/20 p-3 rounded-xl border border-sand-dark/40">
                      "{comm.message}"
                    </p>

                    {/* Studio Reply if exists */}
                    {comm.reply ? (
                      <div className="ml-4 pl-4 border-l-2 border-gold space-y-1 bg-gold/5 p-3 rounded-r-xl">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gold">
                          <Sparkles className="w-3.5 h-3.5 text-gold" />
                          <span>Reshma Threads Studio Response:</span>
                        </div>
                        <p className="text-xs text-ebony/90 italic leading-relaxed">
                          {comm.reply}
                        </p>
                      </div>
                    ) : (
                      <div className="text-[11px] text-brown italic flex items-center gap-1.5 pt-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span>Awaiting studio response — Usually answered within 2 hours</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
