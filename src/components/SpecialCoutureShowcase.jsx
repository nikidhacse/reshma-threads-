import React from 'react'
import { useStore } from '../context/StoreContext'
import { Sparkles, MessageCircle, Heart, ZoomIn, Crown, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react'
import { storeService } from '../services/storeService'

export const SpecialCoutureShowcase = () => {
  const { products, toggleWishlist, isWishlisted, setQuickViewProduct, settings, trackWhatsAppClick, trackProductView } = useStore()

  // Filter special edition items
  const specialProducts = products.filter(p => p.is_special_edition || p.sku?.includes('RTS-SPEC'))

  if (specialProducts.length === 0) return null

  const handleWhatsApp = (product) => {
    trackWhatsAppClick('Special Edition Masterpiece Showcase', product.name)
    const link = storeService.generateWhatsAppLink(settings.whatsapp_number, product, {
      notes: `Hi Reshma! I fell in love with your special signature creation "${product.name}". I'd like to consult for custom tailoring!`
    })
    window.open(link, '_blank')
  }

  const handleInspect = (product) => {
    trackProductView(product.id)
    setQuickViewProduct(product)
  }

  return (
    <section className="py-24 bg-[#140722] text-pearl relative overflow-hidden border-y border-gold/30">
      
      {/* Opulent Ambient Radial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(212,175,55,0.08),transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold bg-gold/10 border border-gold/40 shadow-luxury">
            <Crown className="w-4 h-4 text-gold animate-bounce" />
            <span>Signature Atelier Masterpieces</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Special Edition <br />
            <span className="gold-gradient-text italic font-light">Bespoke Couture Collections</span>
          </h2>

          <p className="text-pearl/75 text-sm sm:text-base leading-relaxed">
            Crafted for moments that demand perfection. Hand-embroidered sequin lattice work, pure silk organza flares, and heritage South Indian brocade langa voni sets — stitched exclusively to your measurements.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {specialProducts.map((product) => {
            const wishlisted = isWishlisted(product.id)
            const mainImg = product.images?.[0]

            return (
              <div 
                key={product.id}
                className="group relative bg-pearl/5 backdrop-blur-xl border border-gold/30 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-gold/70 transition-all duration-500 flex flex-col justify-between"
              >
                
                {/* Top Image Display */}
                <div className="relative aspect-[4/5] sm:aspect-[4/4.5] overflow-hidden bg-ebony cursor-pointer" onClick={() => handleInspect(product)}>
                  <img
                    src={mainImg}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 transform group-hover:scale-105"
                  />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="bg-ebony/90 backdrop-blur-md text-gold text-[10px] font-extrabold px-3 py-1.5 rounded-full border border-gold/40 flex items-center gap-1.5 shadow-lg uppercase tracking-wider">
                      <Crown className="w-3.5 h-3.5 fill-gold" />
                      Studio Signature
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      className={`p-3 rounded-full backdrop-blur-md transition-all shadow-lg ${
                        wishlisted ? 'bg-red-500 text-white' : 'bg-ebony/80 text-pearl hover:bg-gold hover:text-ebony'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Inspect Overlay Trigger */}
                  <div className="absolute inset-0 bg-ebony/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleInspect(product)
                      }}
                      className="bg-gold text-ebony font-extrabold px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-2xl hover:bg-gold-light transition-all transform hover:scale-105"
                    >
                      <ZoomIn className="w-4 h-4" />
                      Inspect Craftsmanship
                    </button>
                  </div>
                </div>

                {/* Bottom Info Section */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-gold/80 font-bold">Ref: #{product.sku}</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Custom Tailored
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-pearl/70 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  <div className="bg-gold/10 border border-gold/20 rounded-2xl p-3.5 text-xs text-gold/90 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Fabric: <strong>{product.fabric_info}</strong></span>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleWhatsApp(product)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp</span>
                    </button>

                    <button
                      onClick={() => handleInspect(product)}
                      className="bg-pearl/10 hover:bg-gold hover:text-ebony text-pearl font-semibold py-3.5 px-5 rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5 border border-pearl/20 hover:border-gold"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Footnote Notice */}
        <div className="mt-14 text-center">
          <p className="text-xs text-pearl/50 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gold" />
            Every Special Edition piece can be customized in your choice of shade, neck depth, sleeve length, and waist size.
          </p>
        </div>

      </div>
    </section>
  )
}
