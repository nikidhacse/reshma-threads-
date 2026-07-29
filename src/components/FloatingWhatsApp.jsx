import React from 'react'
import { MessageCircle } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export const FloatingWhatsApp = () => {
  const { settings } = useStore()
  const rawNumber = (settings.whatsapp_number || '+919003539707').replace(/[^0-9]/g, '')
  const defaultMsg = encodeURIComponent(
    "Hi Reshma Threads Studio! 👋 I'm browsing your online portfolio and would like to inquire about getting a custom blouse stitched. Could you please share details?"
  )
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${defaultMsg}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip Badge */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center gap-2 bg-ebony/95 text-pearl text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl border border-gold/30 backdrop-blur-md hover:border-gold transition-all duration-300 transform hover:-translate-y-0.5 group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Chat with Reshma on WhatsApp</span>
      </a>

      {/* Main Floating Trigger Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white p-4 rounded-full shadow-gold-glow flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 group"
        aria-label="Direct WhatsApp Consultation"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current text-white" />
        <span className="absolute -top-1 -right-1 bg-gold text-ebony text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
          Live
        </span>
      </a>
    </div>
  )
}
