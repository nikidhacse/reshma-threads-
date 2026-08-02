import React from 'react'
import { MessageCircle, Sparkles, Heart, Crown, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export const OwnerStoryShowcase = () => {
  const { trackWhatsAppClick } = useStore()
  const WHATSAPP_NUMBER = '7708521531'

  const handleWhatsAppCustom = (modelName, details) => {
    trackWhatsAppClick(`Founder Model: ${modelName}`)
    const text = encodeURIComponent(
      `Hi Reshma Threads Studio! 🌸\n\nI was looking at your Story section and loved the design worn by your owner:\n✨ *${modelName}*\n\n${details}\n\nI would like to discuss creating/customising this model for myself!`
    )
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${text}`, '_blank')
  }

  const models = [
    {
      id: 'founder-magenta-lehenga',
      title: 'Royal Magenta Zardozi Lehenga',
      subtitle: 'Founder\'s Signature Bridal & Festive Outfit',
      tag: 'Owner\'s Choice 👑',
      image: '/special_magenta_lehenga.jpg',
      badgeColor: 'bg-pink-900/80 text-pink-200 border-pink-500/30',
      description:
        'A magnificent deep magenta silk-velvet lehenga set featuring intricate hand-embroidered floral zardozi work, gold zari borders, and a custom fitted blouse worn personally by our studio founder.',
      highlights: [
        'Pure Hand-Crafted Zardozi & Threadwork',
        'Custom Tailored to Any Measurement',
        'Available in Custom Colors (Red, Purple, Bottle Green)',
        'Full Dupatta & Blouse Customization'
      ],
      whatsappDetails: 'Model: Royal Magenta Zardozi Lehenga set worn by the owner.'
    },
    {
      id: 'founder-crimson-halfsaree',
      title: 'Royal Crimson & Gold Half-Saree',
      subtitle: 'Traditional Heritage Drape Styled by Our Owner',
      tag: 'Founder\'s Edition ✨',
      image: '/special_crimson_halfsaree.jpg',
      badgeColor: 'bg-amber-900/80 text-amber-200 border-amber-500/30',
      description:
        'A regal South Indian crimson silk half-saree featuring rich Kanjivaram zari borders, heavy Aari hand-embroidered sleeve details, and traditional waist accent styled by our owner.',
      highlights: [
        'Pure Kanjivaram Silk & Zari Weave',
        'Intricate Aari Work Blouse Included',
        'Custom Pre-Pleated Option Available',
        'Personalized Color Palette Matching'
      ],
      whatsappDetails: 'Model: Royal Crimson & Gold Half-Saree set worn by the owner.'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-[#111111] via-[#1a1714] to-[#0f0e0c] text-pearl rounded-3xl p-6 sm:p-12 my-12 border border-gold/30 shadow-2xl relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-rose-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-gold bg-gold/10 border border-gold/30 shadow-inner">
            <Crown className="w-3.5 h-3.5" />
            Worn & Styled by Our Owner
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-amber-200">
            Meet Our Founder's Signature Models
          </h2>
          <p className="text-sm text-gray-300 font-light leading-relaxed">
            Every signature design at Reshma Threads is personally tried, tested, and styled by our founder. Below are her favorite personal creations — <strong className="text-gold font-medium">and yes, if you like them, we can recreate or customize these exact models specifically for you!</strong>
          </p>
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {models.map((model) => (
            <div
              key={model.id}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-gold/20 overflow-hidden hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 group flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-black/40">
                <img
                  src={model.image}
                  alt={model.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-lg ${model.badgeColor}`}>
                    {model.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1">
                  <span className="text-[11px] font-semibold tracking-widest text-gold uppercase">{model.subtitle}</span>
                  <h3 className="font-serif text-2xl font-bold text-white drop-shadow-md">{model.title}</h3>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {model.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-bold text-gold uppercase tracking-wider block">Customization Features:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {model.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button for this model */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleWhatsAppCustom(model.title, model.whatsappDetails)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 group/btn"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-200 group-hover/btn:scale-110 transition-transform" />
                    <span>Chat on WhatsApp to Create This Model</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-gold/10 via-amber-500/10 to-gold/10 border border-gold/40 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 text-gold mb-1">
            <Heart className="w-5 h-5 fill-gold/30" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Have a Dream Design in Mind?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Whether you want these exact models worn by our owner or wish to bring your own custom bridal vision to life, we are just a WhatsApp message away! Send us your measurements, preferred fabric, or reference images.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleWhatsAppCustom('Custom Owner Design Request', 'General inquiry about founder models')}
              className="inline-flex items-center gap-2.5 bg-gold hover:bg-gold-light text-ebony font-bold px-8 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-xl hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss Custom Models on WhatsApp (+91 7708521531)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
