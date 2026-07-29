import React from 'react'
import { useStore } from '../context/StoreContext'
import { Instagram, MapPin, Phone, Mail, MessageCircle, Shield, ArrowRight } from 'lucide-react'

export const Footer = () => {
  const { navigateTo, settings, showToast } = useStore()

  const handleSubscribe = (e) => {
    e.preventDefault()
    showToast('Thank you for subscribing to our Studio Newsletter!')
    e.target.reset()
  }

  return (
    <footer className="bg-ebony text-pearl pt-16 pb-8 border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-gold">
                RESHMA THREADS
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-sand-dark">
                Studio • Luxury Boutique
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              Crafting bespoke luxury sarees, handcrafted lehengas, and regal couture designed for life’s grand celebrations.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a 
                href={`https://www.instagram.com/${settings.instagram_handle || 'reshma_threads_studio'}`} 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-gold hover:text-ebony text-gold transition-all duration-300 border border-gold/20"
                title="Instagram Profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={`https://wa.me/${(settings.whatsapp_number || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-emerald-950 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all duration-300 border border-emerald-500/30"
                title="WhatsApp Studio"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold mb-4 tracking-wide">Studio Navigation</h4>
            <ul className="space-y-2.5 text-sm text-gray-300 font-light">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-gold transition-colors">Home Experience</button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-gold transition-colors">Full Shop Catalog</button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-gold transition-colors">Our Heritage & Craft</button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-gold transition-colors">Studio Location & Contact</button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-gold transition-colors flex items-center gap-1.5 text-gold/80">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold mb-4 tracking-wide">Visit Our Studio</h4>
            <ul className="space-y-3 text-sm text-gray-300 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                <span>{settings.studio_address || '102 Luxury Fashion Boulevard, Jubilee Hills, Hyderabad'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>{settings.studio_phone || '+91 98765 43210'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>{settings.studio_email || 'contact@reshmathreads.com'}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold mb-4 tracking-wide">Join The Inner Circle</h4>
            <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
              Subscribe to receive exclusive collection previews and private trunk show invitations.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-gold/30 rounded-xl px-4 py-2.5 text-xs text-pearl placeholder-gray-500 focus:outline-none focus:border-gold transition-all"
              />
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-ebony text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Subscribe Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-light gap-4">
          <p>© {new Date().getFullYear()} Reshma Threads Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('contact')} className="hover:text-gold transition-colors">Privacy Policy</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-gold transition-colors">Terms of Service</button>
            <button onClick={() => navigateTo('admin')} className="hover:text-gold transition-colors text-gold">Admin Portal</button>
          </div>
        </div>

      </div>
    </footer>
  )
}
