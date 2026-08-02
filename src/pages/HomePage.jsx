import React from 'react'
import { useStore } from '../context/StoreContext'
import { CollectionShowcase } from '../components/CollectionShowcase'
import { AllCollectionsGallery } from '../components/AllCollectionsGallery'
import { SketchToFinishSection } from '../components/SketchToFinishSection'
import { FAQSection } from '../components/FAQSection'
import { CustomerInquiriesSection } from '../components/CustomerInquiriesSection'
import { FloatingWhatsApp } from '../components/FloatingWhatsApp'
import { OwnerStoryShowcase } from '../components/OwnerStoryShowcase'
import { MessageCircle, Sparkles, Clock, Truck, Scissors, Instagram } from 'lucide-react'

export const HomePage = () => {
  const { products, settings, trackWhatsAppClick } = useStore()

  // Flagship Collection is Royal Lavender Signature Set (prod-sig-001)
  const flagship = products.find(p => p.id === 'prod-sig-001') || products[0] || null

  const handleWhatsApp = () => {
    trackWhatsAppClick('HomePage Banner')
    const rawNumber = (settings.whatsapp_number || '+917708521531').replace(/[^0-9]/g, '')
    const msg = encodeURIComponent(
      "Hi Reshma Threads Studio! 👋 I saw your boutique collection and I'd love to discuss a custom order. Can you guide me?"
    )
    window.open(`https://wa.me/${rawNumber}?text=${msg}`, '_blank')
  }

  return (
    <div className="relative">

      {/* ══════════════════════════════════════
          1. FLAGSHIP COLLECTION HERO
      ══════════════════════════════════════ */}
      {flagship && <CollectionShowcase product={flagship} />}

      {/* ══════════════════════════════════════
          2. MARQUEE ANNOUNCEMENT BAR
      ══════════════════════════════════════ */}
      <div className="bg-ebony text-gold py-3 overflow-hidden border-y border-gold/30">
        <div className="flex animate-marquee space-x-8">
          {[1, 2, 3, 4].map((group) => (
            <div key={group} className="flex space-x-8 shrink-0">
              {[
                '✦ 100% Hand-Tailored Bespoke Couture',
                '✦ Worldwide Shipping & Express Delivery',
                '✦ Signature Aari & Zardozi Craftsmanship',
                '✦ Direct WhatsApp Studio Consultation (+91 7708521531)',
                '✦ Custom Consultation',
              ].map((text, i) => (
                <span key={i} className="text-gold text-xs font-semibold tracking-widest uppercase px-8 whitespace-nowrap">
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          3. ABOUT THE BOUTIQUE & OUR STORY
      ══════════════════════════════════════ */}
      <section className="py-20 bg-pearl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Stacked owner image collage */}
            <div className="relative h-[500px]">
              <div className="absolute top-4 left-4 w-[60%] h-[80%] rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 rotate-[-3deg] z-10">
                <img src="/special_magenta_lehenga.jpg" alt="Founder wearing Royal Magenta Lehenga" className="w-full h-full object-cover object-top" />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-gold px-3 py-1 rounded-xl text-[10px] font-bold">
                  👑 Founder in Royal Magenta
                </div>
              </div>
              <div className="absolute bottom-2 right-4 w-[60%] h-[78%] rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/60 rotate-[3deg] z-20">
                <img src="/special_crimson_halfsaree.jpg" alt="Founder wearing Crimson Half Saree" className="w-full h-full object-cover object-top" />
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-amber-300 px-3 py-1 rounded-xl text-[10px] font-bold">
                  ✨ Owner in Crimson Half-Saree
                </div>
              </div>
              <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 z-30 bg-gold text-ebony px-4 py-2 rounded-2xl text-xs font-bold shadow-xl border border-gold/30 rotate-[-1deg] whitespace-nowrap">
                ✦ Styled & Worn by Our Owner
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <div className="luxury-divider">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Our Atelier & Founder Story</span>
              </div>

              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-ebony leading-tight">
                Where Every Thread <br />
                <span className="italic font-light text-gold">Tells Our Story</span>
              </h2>

              <p className="text-ebony/75 text-base leading-relaxed">
                Reshma Threads Studio is an exclusive <strong>couture atelier</strong> based in Chennai. Every outfit created here — including the signature models worn by our founder above — is designed to perfection.
              </p>

              <p className="text-ebony/65 text-sm leading-relaxed">
                <strong>Loved what you see on our founder?</strong> We can recreate these exact designs or tailor them to your personal measurements, preferred colors, and custom embroidery.
              </p>

              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 bg-ebony hover:bg-gold text-gold hover:text-ebony font-bold px-7 py-3.5 rounded-2xl text-sm transition-all duration-300 shadow-lg border border-gold/30"
              >
                <MessageCircle className="w-4 h-4" />
                Start a Custom Conversation
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. DETAIL PHOTO GRID — FLAGSHIP ANGLES
      ══════════════════════════════════════ */}
      {flagship && (
        <section className="py-16 bg-[#F7F4EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gold bg-ebony border border-gold/30 mb-3">
                <Sparkles className="w-3 h-3" />
                Collection Detail Shots
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ebony">Every Angle, Every Detail</h2>
              <p className="text-ebony/60 text-sm mt-2 max-w-xl mx-auto">Hover over each photo to inspect the craftsmanship up close.</p>
            </div>

            {/* 5-photo masonry grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="boutique-card col-span-2 md:col-span-1 row-span-2">
                <div className="reveal-image aspect-[3/4] overflow-hidden">
                  <img src="/lavender_collection_set.jpg" alt="Complete Set" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-brown mb-1">Complete Set</p>
                  <h3 className="font-serif font-bold text-ebony text-sm">Blouse + Saree Together</h3>
                </div>
              </div>

              <div className="boutique-card">
                <div className="reveal-image aspect-square overflow-hidden">
                  <img src="/lavender_blouse_backneck.jpg" alt="Back Neck" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-brown mb-1">Blouse</p>
                  <h3 className="font-serif font-bold text-ebony text-sm">Sweetheart Cut-Work Back Neck</h3>
                </div>
              </div>

              <div className="boutique-card">
                <div className="reveal-image aspect-square overflow-hidden">
                  <img src="/lavender_pleated_saree.jpg" alt="Pre-Pleated Saree" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-brown mb-1">Saree</p>
                  <h3 className="font-serif font-bold text-ebony text-sm">Pre-Pleated Kanjivaram Silk</h3>
                </div>
              </div>

              <div className="boutique-card">
                <div className="reveal-image aspect-square overflow-hidden">
                  <img src="/lavender_sleeve_cuff.jpg" alt="Sleeve Cuff" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-brown mb-1">Embroidery</p>
                  <h3 className="font-serif font-bold text-ebony text-sm">Silver Brocade Sleeve Cuff</h3>
                </div>
              </div>

              <div className="boutique-card">
                <div className="reveal-image aspect-square overflow-hidden">
                  <img src="/lavender_sleeve_detail.jpg" alt="Sleeve Detail" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-brown mb-1">Detail</p>
                  <h3 className="font-serif font-bold text-ebony text-sm">Pearl & Mirror Aari Work</h3>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm shadow-lg transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                I want this set — Order on WhatsApp
              </button>
            </div>

          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          5. HOW IT WORKS — 4 STEPS
      ══════════════════════════════════════ */}
      <section className="py-20 bg-ebony text-pearl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(123,94,167,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gold bg-gold/15 border border-gold/30 mb-3">
              <Scissors className="w-3 h-3" />
              The Bespoke Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold">How Your Order Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', icon: MessageCircle, title: 'Chat Consultation', desc: 'Share your saree color, occasion date, preferred neck style, and sleeve preference on WhatsApp.' },
              { num: '02', icon: Scissors, title: 'Custom Design', desc: 'We sketch and plan your unique blouse design — mix elements, add your inspiration, or trust us fully.' },
              { num: '03', icon: Clock, title: 'Handcrafted in 10–15 Days', desc: 'Every bead, thread, and cut-work is done by skilled artisans over 10–15 working days.' },
              { num: '04', icon: Truck, title: 'Delivered to You', desc: 'Your bespoke creation is securely packaged and couriered pan India with tracking.' },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="bg-pearl/8 border border-gold/20 rounded-3xl p-6 hover:border-gold/50 transition-all duration-300 hover:bg-gold/5 group">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-serif text-5xl font-bold text-gold/25 group-hover:text-gold/50 transition-colors">{step.num}</span>
                    <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-ebony transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-pearl mb-2">{step.title}</h3>
                  <p className="text-pearl/60 text-xs leading-relaxed">{step.desc}</p>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          6. SKETCH-TO-FINISH
      ══════════════════════════════════════ */}
      <SketchToFinishSection />

      {/* ══════════════════════════════════════
          7. ALL COLLECTIONS GALLERY
             (Admin adds more → shows here)
      ══════════════════════════════════════ */}
      <AllCollectionsGallery />

      {/* ══════════════════════════════════════
          8. FAQ
      ══════════════════════════════════════ */}
      <FAQSection />

      {/* ══════════════════════════════════════
          9. CUSTOMER QUESTIONS & INQUIRY BOARD
             (Real form — no fake testimonials)
      ══════════════════════════════════════ */}
      <CustomerInquiriesSection />

      {/* ══════════════════════════════════════
          10. INSTAGRAM FOLLOW STRIP
      ══════════════════════════════════════ */}
      <section className="py-14 bg-ebony border-t border-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <div className="w-14 h-14 rounded-3xl mx-auto flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-amber-500 shadow-xl">
            <Instagram className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-pearl">
            Follow Our Studio on Instagram
          </h2>
          <p className="text-pearl/60 text-sm max-w-lg mx-auto">
            Stay updated with latest WIP shots, new collection previews, and behind-the-scenes moments from our atelier.
          </p>
          <a
            href={`https://www.instagram.com/${settings.instagram_handle || 'reshma_threads_studio'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white font-bold px-8 py-3.5 rounded-2xl text-sm shadow-lg hover:opacity-95 transition-all hover:-translate-y-0.5"
          >
            <Instagram className="w-4 h-4" />
            @{settings.instagram_handle || 'reshma_threads_studio'}
          </a>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

    </div>
  )
}
