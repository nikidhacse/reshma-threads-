import React, { useState, useEffect } from 'react'
import { useStore } from '../context/StoreContext'
import { storeService } from '../services/storeService'
import { ProductCard } from '../components/ProductCard'
import { Heart, MessageCircle, ShieldCheck, Sparkles, Check, ArrowLeft, Send, X, Phone, User, Mail, FileText } from 'lucide-react'

export const ProductDetailPage = () => {
  const { 
    selectedProductSlug, 
    products, 
    navigateTo, 
    toggleWishlist, 
    isWishlisted, 
    settings, 
    submitOrder, 
    showToast 
  } = useStore()

  const product = products.find(p => p.slug === selectedProductSlug || p.id === selectedProductSlug) || products[0]

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)

  // Enquiry Form State
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (product) {
      if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0])
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0])
      setActiveImageIndex(0)
    }
  }, [selectedProductSlug, product])

  if (!product) return null

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop']

  const sizes = product.sizes || ['Free Size', 'Custom Fit']
  const colors = product.colors || ['Gold', 'Ivory']

  const formattedPrice = Number(product.price).toLocaleString('en-IN')
  const formattedOrigPrice = product.original_price ? Number(product.original_price).toLocaleString('en-IN') : null

  // WhatsApp Order Handler
  const handleWhatsAppOrder = () => {
    // Log enquiry record automatically in database as well for Admin tracking!
    submitOrder({
      customer_name: 'WhatsApp Customer',
      customer_phone: settings.whatsapp_number || 'Direct WhatsApp Click',
      customer_email: 'via WhatsApp',
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      selected_size: selectedSize || sizes[0],
      selected_color: selectedColor || colors[0],
      notes: 'Initiated order via WhatsApp click',
      channel: 'WhatsApp'
    })

    const link = storeService.generateWhatsAppLink(
      settings.whatsapp_number,
      product,
      selectedSize || sizes[0],
      selectedColor || colors[0]
    )
    window.open(link, '_blank')
  }

  // Enquiry Submission Handler
  const handleEnquirySubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await submitOrder({
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        selected_size: selectedSize || sizes[0],
        selected_color: selectedColor || colors[0],
        notes: orderNotes,
        channel: 'Website Form'
      })
      showToast('Enquiry received! Our studio consultant will contact you shortly.', 'success')
      setIsEnquiryModalOpen(false)
      setCustomerName('')
      setCustomerPhone('')
      setCustomerEmail('')
      setOrderNotes('')
    } catch (err) {
      console.error(err)
      showToast('Failed to submit enquiry', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category_name === product.category_name || p.category_id === product.category_id))
    .slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-16">
      
      {/* Back Button */}
      <button
        onClick={() => navigateTo('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-ebony hover:text-gold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </button>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-sand-light border border-sand-dark/50 shadow-md">
            <img
              src={images[activeImageIndex] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-all duration-500"
            />
            {product.is_featured && (
              <span className="absolute top-4 left-4 bg-gold text-ebony text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Featured Couture
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all ${
                isWishlisted(product.id)
                  ? 'bg-rose-50 text-rose-600 scale-110'
                  : 'bg-white/80 backdrop-blur-md text-ebony hover:text-gold'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-gold scale-105 shadow-md' : 'border-sand-dark opacity-75'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Ordering */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-brown">
                {product.category_name || 'Boutique Collection'}
              </span>
              <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/20">
                SKU: {product.sku || product.id}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ebony leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-sm font-bold text-gold bg-gold/10 border border-gold/30 px-3.5 py-1.5 rounded-full">
                💬 Inquire Price on WhatsApp
              </span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                Made to Order (10-14 days)
              </span>
            </div>

            <p className="text-sm text-gray-600 font-light leading-relaxed pt-2 border-t border-sand-dark">
              {product.description}
            </p>

            {/* Fabric & Craft Details */}
            {product.fabric_info && (
              <div className="bg-sand-light p-4 rounded-2xl border border-sand-dark/50 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ebony flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Fabric & Weave Specifications</span>
                </h4>
                <p className="text-xs text-gray-600 font-light">{product.fabric_info}</p>
                {product.care_instructions && (
                  <p className="text-[11px] text-brown italic pt-1">Care: {product.care_instructions}</p>
                )}
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold uppercase tracking-wider text-ebony">Select Size</label>
                <span className="text-brown font-medium">Bespoke Alteration Available</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSize === sz
                        ? 'bg-ebony text-gold border-gold shadow-md'
                        : 'bg-white text-ebony border-sand-dark hover:border-gold'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-ebony">Shade / Color</label>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedColor === c
                        ? 'bg-gold text-ebony border-gold shadow-md'
                        : 'bg-white text-ebony border-sand-dark hover:border-gold'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-sand-dark">
            
            {/* Primary CTA: Order on WhatsApp */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-500/20 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Order on WhatsApp</span>
            </button>

            {/* Secondary CTA: Submit Order Request Form */}
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full bg-ebony hover:bg-ebony-soft text-gold font-semibold py-3.5 px-6 rounded-2xl border border-gold/30 flex items-center justify-center gap-2 transition-all text-xs"
            >
              <Send className="w-4 h-4" />
              <span>Submit Direct Order Request Form</span>
            </button>

            {/* Studio Guarantee */}
            <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-brown font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-gold" />
                100% Quality Assured
              </span>
              <span>•</span>
              <span>Personalized Consultation</span>
            </div>
          </div>

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-sand-dark space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-ebony">You May Also Admire</h2>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-semibold text-gold hover:underline"
            >
              Explore All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ORDER ENQUIRY MODAL */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-ebony/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-pearl max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-gold/30 p-6 md:p-8 relative">
            
            <button
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-sand hover:bg-sand-dark text-ebony transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest">Reshma Threads Studio</span>
              <h3 className="font-serif text-2xl font-bold text-ebony">Order Enquiry Request</h3>
              <p className="text-xs text-gray-500 font-light">
                Requesting: <strong className="text-ebony">{product.name}</strong> ({selectedSize}, {selectedColor})
              </p>
            </div>

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Your Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full bg-white border border-sand-dark rounded-xl pl-9 pr-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">WhatsApp / Phone Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-white border border-sand-dark rounded-xl pl-9 pr-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Email Address (Optional)</label>
                <div className="relative">
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. ananya@example.com"
                    className="w-full bg-white border border-sand-dark rounded-xl pl-9 pr-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Special Requirements / Notes</label>
                <div className="relative">
                  <textarea
                    rows="3"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Mention custom fitting, delivery deadline, or color preferences..."
                    className="w-full bg-white border border-sand-dark rounded-xl p-3 text-xs text-ebony focus:outline-none focus:border-gold"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-light text-ebony text-xs font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Send Order Enquiry'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}
