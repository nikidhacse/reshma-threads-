import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { Heart, MessageCircle, ChevronLeft, ChevronRight, ZoomIn, Star, CheckCircle, Sparkles, ArrowRight } from 'lucide-react'
import { storeService } from '../services/storeService'

// The centrepiece of the boutique — a full-bleed, editorial collection showcase
export const CollectionShowcase = ({ product }) => {
  const { toggleWishlist, isWishlisted, settings, setIsWishlistOpen, trackWhatsAppClick } = useStore()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })

  if (!product) return null

  const images = product.images || []
  const wishlisted = isWishlisted(product.id)

  // angle labels for each photo
  const angleLabels = [
    'Complete Set',
    'Back Neck Detail',
    'Sleeve Cuff Work',
    'Sleeve Close-Up',
    'Pre-Pleated Saree',
  ]

  const prev = () => setActiveIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setActiveIndex(i => (i + 1) % images.length)

  const handleMouseMove = (e) => {
    if (!isZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  const handleWhatsApp = () => {
    trackWhatsAppClick('Flagship Collection Showcase', product.name)
    const link = storeService.generateWhatsAppLink(settings.whatsapp_number, product, {
      angle: angleLabels[activeIndex] || 'Full View'
    })
    window.open(link, '_blank')
  }

  const features = [
    'Fully Custom-Stitched to Your Measurements',
    'Pre-Pleated Kanjivaram Silk Saree',
    'Hand Aari Pearl & Mirror Embroidery',
    'Silver Brocade Sleeve Cuffs',
    'Pan India Courier Available',
  ]

  return (
    <section className="w-full bg-pearl">

      {/* ── EDITORIAL HERO BANNER ── */}
      <div className="relative overflow-hidden bg-[#1A0A2E] min-h-[92vh] flex items-center">
        
        {/* Decorative ambient layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(123,94,167,0.35),transparent)]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-0 w-64 h-64 bg-purple-800/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Copy */}
          <div className="text-pearl space-y-7 animate-fade-slide-up order-2 lg:order-1">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-gold border border-gold/40 bg-gold/10">
                <Sparkles className="w-3 h-3" />
                Flagship Collection · Now Live
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight text-shadow-gold">
              Royal Lavender <br />
              <span className="gold-gradient-text italic font-light">Signature Boutique Set</span>
            </h1>

            <p className="text-pearl/75 text-base leading-relaxed max-w-lg">
              A bespoke 2-piece luxury creation — a <strong className="text-pearl">pre-pleated Kanjivaram silk saree</strong> with heavy silver zari woven pallu, paired with a handcrafted raw silk blouse featuring sweetheart cut-work, pearl-mirror embroidery, and silver brocade cuffs.
            </p>

            {/* Features */}
            <ul className="space-y-2">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-pearl/80">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Price Enquiry Badge */}
            <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-2xl px-4 py-2.5 w-fit">
              <span className="text-xs font-semibold text-gold tracking-wide">
                💬 Chat on WhatsApp to get exact price & customization options
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-2xl text-sm flex items-center gap-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Inquire Price on WhatsApp
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`px-5 py-3.5 rounded-2xl text-sm font-semibold flex items-center gap-2 border transition-all ${
                  wishlisted
                    ? 'bg-red-500/20 border-red-400 text-red-300'
                    : 'bg-pearl/10 border-pearl/20 text-pearl hover:border-gold hover:text-gold'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                {wishlisted ? 'Saved' : 'Save'}
              </button>
            </div>

            <p className="text-[11px] text-pearl/40 tracking-wide">
              Design Code: <span className="text-gold font-mono">{product.sku}</span> · 
              Category: {product.category_name}
            </p>
          </div>

          {/* RIGHT: Image Viewer */}
          <div className="order-1 lg:order-2 relative flex flex-col gap-4">

            {/* Main image canvas */}
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold/25 shadow-[0_32px_80px_rgba(0,0,0,0.5)] cursor-zoom-in group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={images[activeIndex]}
                alt={`${product.name} - ${angleLabels[activeIndex]}`}
                className="w-full h-full object-cover"
                style={isZoomed ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: 'scale(1.8)',
                  transition: 'transform 0s'
                } : {
                  transition: 'transform 0.5s ease'
                }}
              />

              {/* Image nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ebony/70 text-pearl flex items-center justify-center hover:bg-gold hover:text-ebony transition-all z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ebony/70 text-pearl flex items-center justify-center hover:bg-gold hover:text-ebony transition-all z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 bg-ebony/70 text-pearl text-[9px] px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3 h-3" />
                Hover to zoom
              </div>

              {/* Angle badge */}
              <div className="absolute top-3 left-3 bg-ebony/80 backdrop-blur text-pearl text-[10px] font-semibold px-3 py-1.5 rounded-full border border-gold/30">
                {angleLabels[activeIndex] || `View ${activeIndex + 1}`}
              </div>

              {/* Featured badge */}
              {product.is_featured && (
                <div className="absolute top-3 right-3 bg-gold text-ebony text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`collection-thumbnail shrink-0 w-16 h-20 ${activeIndex === idx ? 'active' : ''}`}
                >
                  <img src={img} alt={angleLabels[idx]} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Dot indicator */}
            <div className="flex items-center justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-full transition-all ${
                    activeIndex === idx ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-pearl/30 hover:bg-gold/50'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pearl/40 text-[10px] uppercase tracking-widest animate-float">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </div>

    </section>
  )
}
