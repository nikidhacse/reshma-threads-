import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { storeService } from '../services/storeService'
import { Heart, MessageCircle, ZoomIn, Star, Sparkles, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

/**
 * AllCollectionsGallery
 * Beautifully displays every collection the admin has added.
 * Automatically updates as new products are published.
 */
export const AllCollectionsGallery = () => {
  const { products, settings, toggleWishlist, isWishlisted, setQuickViewProduct, navigateTo } = useStore()

  if (!products || products.length === 0) {
    return (
      <section className="py-20 bg-[#F7F4EF] border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gold bg-ebony border border-gold/30 mb-6">
            <Sparkles className="w-3 h-3" />
            Boutique Collections
          </span>
          <h2 className="font-serif text-4xl font-bold text-ebony mb-4">
            More Collections Coming Soon
          </h2>
          <p className="text-ebony/60 text-base max-w-lg mx-auto mb-8">
            Our admin is adding exclusive new designs regularly. Check back soon — or reach out to request a completely custom creation!
          </p>
          <button
            onClick={() => {
              const rawNumber = (settings.whatsapp_number || '+919003539707').replace(/[^0-9]/g, '')
              window.open(`https://wa.me/${rawNumber}?text=${encodeURIComponent('Hi Reshma! I want a custom design. Can you help me?')}`, '_blank')
            }}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-2xl text-sm shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Request a Custom Design
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-[#F7F4EF] border-t border-gold/20" id="collections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gold bg-ebony border border-gold/30 mb-3">
            <Sparkles className="w-3 h-3" />
            Boutique Collections
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ebony tracking-tight">
            All Our Designs
          </h2>
          <p className="text-ebony/65 text-sm sm:text-base mt-3 leading-relaxed">
            Every piece is handcrafted and can be recreated or customised exclusively for you.
            <span className="block mt-1 font-semibold text-gold">Admin adds new collections — they appear here instantly.</span>
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className={`grid gap-6 ${
          products.length === 1
            ? 'grid-cols-1 max-w-2xl mx-auto'
            : products.length === 2
            ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {products.map((product) => (
            <CollectionCard
              key={product.id}
              product={product}
              settings={settings}
              toggleWishlist={toggleWishlist}
              isWishlisted={isWishlisted}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-ebony/60 text-sm mb-4">Don't see what you're looking for? We create anything from scratch!</p>
          <button
            onClick={() => {
              const rawNumber = (settings.whatsapp_number || '+919003539707').replace(/[^0-9]/g, '')
              window.open(`https://wa.me/${rawNumber}?text=${encodeURIComponent('Hi Reshma Threads Studio! I have my own design idea and would love to discuss it with you.')}`, '_blank')
            }}
            className="inline-flex items-center gap-2 bg-ebony hover:bg-gold text-gold hover:text-ebony font-bold px-7 py-3.5 rounded-2xl text-sm transition-all duration-300 border border-gold/30 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Request a Brand-New Design
          </button>
        </div>

      </div>
    </section>
  )
}


/* ─── Collection Card ─── */
const CollectionCard = ({ product, settings, toggleWishlist, isWishlisted, onQuickView }) => {
  const [activeImg, setActiveImg] = useState(0)
  const images = Array.isArray(product.images) ? product.images : [product.image_url].filter(Boolean)
  const wishlisted = isWishlisted(product.id)

  const prevImg = (e) => {
    e.stopPropagation()
    setActiveImg(i => (i - 1 + images.length) % images.length)
  }
  const nextImg = (e) => {
    e.stopPropagation()
    setActiveImg(i => (i + 1) % images.length)
  }

  const handleWA = (e) => {
    e.stopPropagation()
    const link = storeService.generateWhatsAppLink(settings.whatsapp_number, product)
    window.open(link, '_blank')
  }

  return (
    <article
      className="boutique-card bg-white cursor-pointer group"
      onClick={() => onQuickView(product)}
      aria-label={`View ${product.name}`}
    >
      {/* ── Image Area ── */}
      <div className="relative overflow-hidden aspect-[4/5] bg-sand/20">
        {images.length > 0 ? (
          <img
            src={images[activeImg]}
            alt={`${product.name} – angle ${activeImg + 1}`}
            className="card-img w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ebony/20">
            <Sparkles className="w-12 h-12" />
          </div>
        )}

        {/* Arrow nav (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ebony/60 text-pearl flex items-center justify-center hover:bg-gold hover:text-ebony transition-all z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ebony/60 text-pearl flex items-center justify-center hover:bg-gold hover:text-ebony transition-all z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image dot indicator */}
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

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="bg-ebony/90 text-gold font-mono text-[9px] font-bold px-2.5 py-1 rounded-full">
            #{product.sku || product.id?.slice(-6)}
          </span>
          {product.is_new_arrival && (
            <span className="bg-gold text-ebony font-bold text-[9px] px-2.5 py-0.5 rounded-full">New</span>
          )}
          {product.is_featured && (
            <span className="bg-lavender text-pearl font-bold text-[9px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-current" />Featured
            </span>
          )}
        </div>

        {/* Top-right: wishlist */}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product.id) }}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all z-10 shadow ${
            wishlisted ? 'bg-red-500 text-white' : 'bg-pearl/90 text-ebony hover:bg-red-500 hover:text-white'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover inspect overlay */}
        <div className="absolute inset-0 bg-ebony/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-pearl text-ebony font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg">
            <ZoomIn className="w-4 h-4" />
            Inspect Design
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider font-bold text-brown/80 mb-0.5">{product.category_name}</p>
            <h3 className="font-serif text-base font-bold text-ebony leading-snug line-clamp-2 group-hover:text-gold transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="font-serif font-bold text-gold text-base">₹{Number(product.price).toLocaleString('en-IN')}</p>
            {product.original_price && (
              <p className="text-ebony/40 line-through text-xs">₹{Number(product.original_price).toLocaleString('en-IN')}</p>
            )}
          </div>
        </div>

        {product.description && (
          <p className="text-xs text-ebony/65 leading-relaxed line-clamp-2">{product.description}</p>
        )}

        <button
          onClick={handleWA}
          className="w-full bg-ebony hover:bg-emerald-700 text-gold hover:text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-gold/30 hover:border-transparent"
        >
          <MessageCircle className="w-4 h-4" />
          Order / Request Similar
        </button>
      </div>
    </article>
  )
}
