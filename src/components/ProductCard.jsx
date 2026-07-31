import React from 'react'
import { Heart, Eye, MessageCircle, Sparkles } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { storeService } from '../services/storeService'

export const ProductCard = ({ product }) => {
  const { 
    setQuickViewProduct, 
    toggleWishlist, 
    isWishlisted,
    settings 
  } = useStore()

  const wishlisted = isWishlisted(product.id)
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : '/insta_purple_backneck.jpg'

  const handleWhatsAppInquiry = (e) => {
    e.stopPropagation()
    const link = storeService.generateWhatsAppLink(settings.whatsapp_number, product)
    window.open(link, '_blank')
  }

  const handleQuickView = (e) => {
    e.stopPropagation()
    setQuickViewProduct(product)
  }

  return (
    <div 
      onClick={handleQuickView}
      className="group bg-pearl rounded-3xl overflow-hidden border border-gold/20 shadow-luxury hover:shadow-card-hover transition-all duration-500 flex flex-col justify-between cursor-pointer"
    >
      {/* Image Showcase & Overlays */}
      <div className="relative aspect-[4/5] overflow-hidden bg-sand/50">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="bg-ebony/90 text-gold text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-gold/30 backdrop-blur-md shadow-sm">
              #{product.sku || 'RTS-DES'}
            </span>
            {product.is_featured && (
              <span className="bg-gold text-ebony text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 fill-current" />
                Featured
              </span>
            )}
          </div>

          {/* Wishlist / Save Inspiration Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product.id)
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              wishlisted 
                ? 'bg-red-500 text-white shadow-md' 
                : 'bg-pearl/80 text-ebony hover:bg-gold hover:text-ebony'
            }`}
            title={wishlisted ? "Remove from inspiration board" : "Save to inspiration board"}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 bg-ebony/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            onClick={handleQuickView}
            className="bg-pearl text-ebony font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 border border-gold/30 hover:bg-gold hover:text-ebony"
          >
            <Eye className="w-4 h-4" />
            <span>Inspect Design Details</span>
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-pearl">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-brown">
              {product.category_name || 'Bespoke Design'}
            </span>
            <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
              Custom Order
            </span>
          </div>

          <h3 className="font-serif text-base font-bold text-ebony group-hover:text-gold transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>

          <p className="text-ebony/70 text-xs line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-sand-dark/60">
          <button
            onClick={handleWhatsAppInquiry}
            className="w-full bg-ebony hover:bg-emerald-700 text-gold hover:text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm border border-gold/30 group-hover:border-emerald-600"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Inquire Price on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  )
}
