import React, { useState } from 'react'
import { X, Heart, MessageCircle, Sparkles, Check, Info } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { storeService } from '../services/storeService'

export const QuickViewModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    toggleWishlist, 
    isWishlisted,
    settings 
  } = useStore()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [customNotes, setCustomNotes] = useState('')

  if (!quickViewProduct) return null

  const wishlisted = isWishlisted(quickViewProduct.id)
  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : ['/insta_purple_backneck.jpg']

  const activeImage = images[selectedImageIndex] || images[0]

  const handleWhatsAppClick = () => {
    const link = storeService.generateWhatsAppLink(settings.whatsapp_number, quickViewProduct, {
      notes: customNotes
    })
    window.open(link, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ebony/70 backdrop-blur-md animate-fade-in">
      <div className="bg-pearl w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gold/30 flex flex-col md:flex-row max-h-[90vh] relative">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 bg-ebony/80 hover:bg-ebony text-gold p-2 rounded-full transition-colors border border-gold/30"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Preview Gallery */}
        <div className="md:w-1/2 bg-sand/60 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gold/20">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-ebony shadow-inner border border-gold/20">
            <img
              src={activeImage}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-ebony/90 text-gold text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-gold/30">
              #{quickViewProduct.sku || 'RTS-DES'}
            </span>
          </div>

          {/* Thumbnails list */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx ? 'border-gold shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Design Info & Customization */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest font-bold text-brown">
                  {quickViewProduct.category_name || 'Custom Craft'}
                </span>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-all border ${
                    wishlisted 
                      ? 'bg-red-50 text-red-600 border-red-200' 
                      : 'bg-sand text-ebony hover:text-gold border-gold/20'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
                  <span>{wishlisted ? 'Saved ❤️' : 'Save Inspiration'}</span>
                </button>
              </div>

              <h2 className="font-serif text-2xl font-bold text-ebony">
                {quickViewProduct.name}
              </h2>

              <p className="text-xs font-semibold text-gold mt-1 flex items-center gap-1.5">
                <span>✦ Bespoke Custom Order</span>
                <span className="text-ebony/40">•</span>
                <span className="text-ebony/70">Inquire price on WhatsApp</span>
              </p>
            </div>

            {/* Bespoke Notice */}
            <div className="bg-sand/60 p-3.5 rounded-2xl border border-gold/20 text-xs text-ebony/80 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>
                <strong>Bespoke Notice:</strong> This design is a previous creation. You can replicate it as-is or customize necklines, sleeve length, and thread colors.
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-ebony/80 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Fabric & Care Details */}
            {quickViewProduct.fabric_info && (
              <div className="text-xs space-y-1 bg-pearl p-3 rounded-xl border border-sand-dark">
                <p className="font-semibold text-ebony">Fabric & Work Details:</p>
                <p className="text-ebony/70">{quickViewProduct.fabric_info}</p>
              </div>
            )}

            {/* Optional Custom Notes Input */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-ebony flex items-center justify-between">
                <span>Add Customization Note (Optional):</span>
                <span className="text-[10px] text-brown">e.g. Deep U-neck, elbow sleeve</span>
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Mention specific neckline preferences, saree colors, or function date..."
                rows={2}
                className="w-full text-xs p-3 rounded-xl border border-gold/30 bg-pearl focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

          </div>

          {/* Action Trigger */}
          <div className="pt-6 border-t border-sand-dark mt-6 space-y-2">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Request Design on WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-ebony/60">
              Opens WhatsApp with pre-filled design code #{quickViewProduct.sku || 'RTS-DES'}.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}
