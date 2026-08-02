import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { FloatingWhatsApp } from '../components/FloatingWhatsApp'
import { storeService } from '../services/storeService'
import { MessageCircle, Heart, ZoomIn, Star, ChevronLeft, ChevronRight, Sparkles, Package } from 'lucide-react'

export const ShopPage = () => {
  const { products, settings, toggleWishlist, isWishlisted, setQuickViewProduct, trackWhatsAppClick, trackProductView } = useStore()

  return (
    <div className="py-12 bg-pearl min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gold bg-ebony border border-gold/30 mb-3">
            <Package className="w-3 h-3" />
            Portfolio Gallery
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ebony tracking-tight mb-3">
            Our Boutique Collections
          </h1>
          <p className="text-ebony/65 text-sm sm:text-base leading-relaxed">
            Browse handcrafted previous creations. Each can be recreated or fully customized. More collections added regularly by our admin.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-sand/30 rounded-3xl border border-gold/15">
            <Sparkles className="w-12 h-12 text-gold/30 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-ebony mb-2">New Collections Coming Soon</h3>
            <p className="text-ebony/60 text-sm max-w-sm mx-auto mb-6">
              Our admin is curating exclusive new designs. Check back soon or contact us for a custom creation!
            </p>
            <a
              href={`https://wa.me/${(settings.whatsapp_number || '+917708521531').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Reshma! I want a custom blouse. Can you help?')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('Portfolio Gallery Empty State')}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Request Custom Design
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <GalleryCard
                key={product.id}
                product={product}
                settings={settings}
                toggleWishlist={toggleWishlist}
                isWishlisted={isWishlisted}
                trackWhatsAppClick={trackWhatsAppClick}
                trackProductView={trackProductView}
                onQuickView={(p) => {
                  trackProductView(p.id)
                  setQuickViewProduct(p)
                }}
              />
            ))}
          </div>
        )}

      </div>
      <FloatingWhatsApp />
    </div>
  )
}

const GalleryCard = ({ product, settings, toggleWishlist, isWishlisted, trackWhatsAppClick, onQuickView }) => {
  const [activeImg, setActiveImg] = useState(0)
  const images = product.images || []
  const wishlisted = isWishlisted(product.id)

  const handleWA = (e) => {
    e.stopPropagation()
    trackWhatsAppClick('Portfolio Gallery Item', product.name)
    const link = storeService.generateWhatsAppLink(settings.whatsapp_number, product)
    window.open(link, '_blank')
  }

  return (
    <div className="boutique-card group cursor-pointer" onClick={() => onQuickView(product)}>

      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-sand/30">
        <img
          src={images[activeImg] || images[0]}
          alt={product.name}
          className="card-img w-full h-full object-cover"
        />

        {/* Nav dots if multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setActiveImg(i) }}
                className={`rounded-full transition-all ${activeImg === i ? 'w-5 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-pearl/60'}`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="bg-ebony/85 text-gold text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            #{product.sku}
          </span>
          {product.is_new_arrival && (
            <span className="bg-gold text-ebony text-[9px] font-bold px-2.5 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product.id) }}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all ${
            wishlisted ? 'bg-red-500 text-white' : 'bg-pearl/80 text-ebony hover:bg-gold hover:text-ebony'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ebony/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={e => { e.stopPropagation(); onQuickView(product) }}
            className="bg-pearl text-ebony font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 hover:bg-gold transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
            Inspect Design
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-brown">{product.category_name}</span>
          <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">Bespoke</span>
        </div>
        <h3 className="font-serif text-base font-bold text-ebony line-clamp-2 mb-3 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <button
          onClick={handleWA}
          className="w-full bg-ebony hover:bg-emerald-700 text-gold hover:text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-gold/30"
        >
          <MessageCircle className="w-4 h-4" />
          Inquire Price on WhatsApp
        </button>
      </div>

    </div>
  )
}
