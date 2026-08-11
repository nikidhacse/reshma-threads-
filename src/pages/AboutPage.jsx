import React from 'react'
import { useStore } from '../context/StoreContext'
import { Sparkles, Award, Heart, Shield, ArrowRight } from 'lucide-react'
import { OwnerStoryShowcase } from '../components/OwnerStoryShowcase'

export const AboutPage = () => {
  const { navigateTo } = useStore()

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16">
      
      {/* Hero Banner */}
      <div className="bg-sand-light rounded-3xl p-8 sm:p-14 border border-sand-dark/50 text-center space-y-4 relative overflow-hidden">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-gold/50 shadow-2xl mx-auto ring-4 ring-gold/10 hover:scale-105 transition-transform duration-300">
          <img src="/logo.jpg" alt="Reshma Threads Studio Emblem" className="w-full h-full object-cover" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-gold block">Our Craftsmanship & Heritage</span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ebony">Reshma Threads Studio</h1>
        <p className="text-sm text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
          Creating timeless luxury couture designed to celebrate India’s rich textile heritage, regal silhouettes, and bespoke elegance.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">The Vision</span>
          <h2 className="font-serif text-3xl font-bold text-ebony">A Symphony of Silk & Gold</h2>
          <p className="text-sm text-gray-600 font-light leading-relaxed">
            Founded with a vision to preserve ancestral handloom techniques while reimagining luxury fashion for the modern woman, Reshma Threads Studio brings together master weavers and embroidery artisans from across India.
          </p>
          <p className="text-sm text-gray-600 font-light leading-relaxed">
            Every thread is selected for its purity and texture, every motif drawn from regal archives, and every stitch tailored to perfection.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-2xl border border-sand-dark/50">
              <Award className="w-6 h-6 text-gold mb-2" />
              <h4 className="font-serif font-bold text-sm text-ebony">Pure Heritage</h4>
              <p className="text-xs text-gray-500 font-light">Authentic Kanjivaram, Banarasi & Chanderi weaves.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-sand-dark/50">
              <Heart className="w-6 h-6 text-gold mb-2" />
              <h4 className="font-serif font-bold text-sm text-ebony">Bespoke Fit</h4>
              <p className="text-xs text-gray-500 font-light">Tailored measurements for every unique silhouette.</p>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-gold/30">
          <img
            src="/special_magenta_lehenga.jpg"
            alt="Studio Founder Signature Model"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-ebony/90 backdrop-blur-md p-3.5 rounded-2xl border border-gold/30 text-white text-xs">
            <p className="font-serif font-bold text-gold">👑 Owner's Signature Model</p>
            <p className="text-[11px] text-gray-300 font-light">Hand-embroidered zardozi lehenga set worn by our studio founder.</p>
          </div>
        </div>
      </div>

      {/* Owner Story Showcase Component */}
      <OwnerStoryShowcase />

      {/* CTA Box */}
      <div className="bg-ebony text-pearl rounded-3xl p-10 text-center space-y-4 border border-gold/30">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold">Ready to Experience Bespoke Luxury?</h3>
        <p className="text-xs text-gray-300 max-w-lg mx-auto font-light">
          Browse our boutique collections or connect directly with our studio consultants for custom bridal and festive orders.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-gold hover:bg-gold-light text-ebony text-xs font-bold py-3.5 px-8 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
        >
          <span>Explore Boutique Shop</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}

