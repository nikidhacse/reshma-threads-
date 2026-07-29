import React from 'react'
import { X, Trash2, MessageCircle, Heart, ArrowRight, Sparkles } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export const WishlistDrawer = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    products, 
    toggleWishlist,
    setQuickViewProduct,
    settings 
  } = useStore()

  if (!isWishlistOpen) return null

  const savedProducts = products.filter(p => wishlist.includes(p.id))

  const handleBulkInquiry = () => {
    const rawNumber = (settings.whatsapp_number || '+919003539707').replace(/[^0-9]/g, '')
    
    let msg = `Hi Reshma Threads Studio! 👋\n\nI have saved these designs on your website inspiration board and would like to get a quote/consultation:\n\n`
    savedProducts.forEach((p, idx) => {
      msg += `${idx + 1}. *${p.name}* (#${p.sku || p.id})\n`
    })

    msg += `\nPlease let me know how we can proceed with customizing these for my sarees!`

    const link = `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`
    window.open(link, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ebony/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-pearl shadow-2xl border-l border-gold/20 flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-sand-dark flex items-center justify-between bg-pearl-dark/30">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <h2 className="font-serif text-lg font-bold text-ebony">Saved Inspiration</h2>
              <span className="bg-gold text-ebony text-xs font-bold px-2 py-0.5 rounded-full">
                {savedProducts.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-ebony hover:text-gold transition-colors rounded-full hover:bg-sand"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-sand mx-auto flex items-center justify-center text-brown">
                  <Heart className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-lg font-bold text-ebony">Your Inspiration Board is Empty</h3>
                <p className="text-ebony/70 text-xs max-w-xs mx-auto">
                  Browse our portfolio gallery and tap the ❤️ icon on any blouse design to save your favorite ideas here.
                </p>
              </div>
            ) : (
              savedProducts.map((product) => {
                const img = product.images && product.images.length > 0 ? product.images[0] : '/insta_purple_backneck.jpg'
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 bg-pearl rounded-2xl p-3 border border-gold/20 shadow-sm hover:border-gold/50 transition-all group"
                  >
                    <img
                      src={img}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-gold/20 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-extrabold text-brown tracking-wider block">
                        #{product.sku || 'RTS-DES'}
                      </span>
                      <h4 
                        onClick={() => {
                          setIsWishlistOpen(false)
                          setQuickViewProduct(product)
                        }}
                        className="font-serif text-xs font-bold text-ebony truncate cursor-pointer hover:text-gold transition-colors"
                      >
                        {product.name}
                      </h4>
                      <p className="text-[11px] font-bold text-gold mt-0.5">
                        Est. ₹{Number(product.price).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 text-ebony/40 hover:text-red-500 transition-colors"
                      title="Remove design"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )
              })
            )}
          </div>

          {/* Drawer Footer */}
          {savedProducts.length > 0 && (
            <div className="p-6 border-t border-sand-dark bg-pearl-dark/30 space-y-3">
              <button
                onClick={handleBulkInquiry}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire Saved Board on WhatsApp ({savedProducts.length})</span>
              </button>
              <p className="text-[10px] text-center text-ebony/60">
                Sends all {savedProducts.length} saved design codes in a single WhatsApp message.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
