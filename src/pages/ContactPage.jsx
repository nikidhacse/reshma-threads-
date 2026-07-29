import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { FloatingWhatsApp } from '../components/FloatingWhatsApp'
import { MessageCircle, Phone, Mail, MapPin, Instagram, Sparkles, Send, CheckCircle2 } from 'lucide-react'

export const ContactPage = () => {
  const { settings, submitOrder, showToast } = useStore()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    sareeType: '',
    functionDate: '',
    notes: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      showToast('Please provide your name and phone number', 'error')
      return
    }

    try {
      await submitOrder({
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        product_name: `Custom Blouse Consultation (${formData.sareeType || 'General'})`,
        product_price: 2500,
        notes: `Function Date: ${formData.functionDate || 'N/A'} | Saree: ${formData.sareeType || 'N/A'} | Note: ${formData.notes}`,
        channel: 'Studio Contact Form'
      })

      setSubmitted(true)
      showToast('Inquiry sent successfully! We will contact you on WhatsApp.', 'success')

      // Also trigger WhatsApp link for user convenience
      const rawNumber = (settings.whatsapp_number || '+919003539707').replace(/[^0-9]/g, '')
      const msg = encodeURIComponent(
        `Hi Reshma Threads Studio! 👋\n\nI just submitted a consultation request on your website:\n\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n🥻 *Saree Type:* ${formData.sareeType || 'Custom'}\n📅 *Function Date:* ${formData.functionDate || 'N/A'}\n📝 *Notes:* ${formData.notes}`
      )
      window.open(`https://wa.me/${rawNumber}?text=${msg}`, '_blank')
    } catch (err) {
      showToast('Failed to submit inquiry', 'error')
    }
  }

  const rawNumber = (settings.whatsapp_number || '+919003539707').replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent("Hi Reshma! I'd like to book a custom blouse stitching consultation.")}`

  return (
    <div className="py-12 bg-pearl min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold bg-sand border border-gold/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Connect With Our Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ebony tracking-tight mb-3">
            Studio & Consultation Contact
          </h1>
          <p className="text-ebony/75 text-sm sm:text-base leading-relaxed">
            Have a custom blouse idea, a wedding trousseau requirement, or an outstation courier inquiry? We'd love to craft something unique for you.
          </p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & WhatsApp Prompt */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Highlight Box */}
            <div className="bg-gradient-to-br from-ebony to-ebony-soft p-8 rounded-3xl text-pearl border border-gold/30 shadow-luxury space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-gold">Fastest Response</h3>
                  <p className="text-xs text-pearl/70">Direct WhatsApp Consultation</p>
                </div>
              </div>

              <p className="text-xs text-pearl/80 leading-relaxed">
                For instant assistance with fabric choices, measurements, sample blouse couriering, or quick price quotes, chat directly with Reshma on WhatsApp.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp ({settings.whatsapp_number || '+91 90035 39707'})</span>
              </a>
            </div>

            {/* Studio Info List */}
            <div className="bg-sand/60 p-6 rounded-3xl border border-gold/20 space-y-4">
              <h4 className="font-serif text-lg font-bold text-ebony mb-2">Studio Details</h4>

              <div className="flex items-start gap-3.5 text-xs text-ebony">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Phone / Call</p>
                  <p className="text-ebony/70">{settings.studio_phone || '+91 90035 39707'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-ebony">
                <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-ebony/70">{settings.studio_email || 'reshmathreadsstudio@gmail.com'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-ebony">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Studio Location</p>
                  <p className="text-ebony/70">{settings.studio_address || 'Chennai, Tamil Nadu, India — DM for studio appointment'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-ebony">
                <Instagram className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Instagram Handle</p>
                  <a 
                    href="https://www.instagram.com/reshma_threads_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brown hover:text-gold font-semibold underline"
                  >
                    @{settings.instagram_handle || 'reshma_threads_studio'}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Custom Consultation Form */}
          <div className="lg:col-span-7 bg-pearl p-8 rounded-3xl border border-gold/20 shadow-luxury">
            <h3 className="font-serif text-2xl font-bold text-ebony mb-2">
              Request a Custom Consultation
            </h3>
            <p className="text-xs text-ebony/70 mb-6">
              Fill in your details below and we will get back to you with design recommendations and pricing.
            </p>

            {submitted ? (
              <div className="bg-sand p-8 rounded-2xl text-center space-y-4 border border-gold/30">
                <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                <h4 className="font-serif text-xl font-bold text-ebony">Thank You!</h4>
                <p className="text-xs text-ebony/80 max-w-sm mx-auto">
                  Your consultation request has been submitted. Reshma will contact you shortly on WhatsApp to discuss your blouse design details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-gold underline hover:text-brown"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ebony">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kavitha Sundaram"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-gold/30 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ebony">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-gold/30 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ebony">Saree Fabric / Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Kanjivaram Silk, Georgette, Organza"
                      value={formData.sareeType}
                      onChange={(e) => setFormData({ ...formData, sareeType: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-gold/30 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ebony">Function / Delivery Date</label>
                    <input
                      type="text"
                      placeholder="e.g. August 25th"
                      value={formData.functionDate}
                      onChange={(e) => setFormData({ ...formData, functionDate: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-gold/30 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ebony">Design Ideas / Neckline Preference</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're looking for (e.g., cut-work back neck, heavy Aari sleeve cuffs, tassel detailing)..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gold/30 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-ebony hover:bg-gold text-gold hover:text-ebony font-bold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit & Connect on WhatsApp</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

      <FloatingWhatsApp />
    </div>
  )
}
