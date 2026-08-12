import React, { useState } from 'react'
import { Sparkles, ArrowRight, CheckCircle2, Scissors, Palette, Layers, Compass } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { storeService } from '../services/storeService'

export const SketchToFinishSection = () => {
  const { settings } = useStore()
  const [activeTab, setActiveTab] = useState('sketch') // 'sketch' or 'finish' or 'split'

  const showcaseItem = {
    sketchTitle: "Hand-Crafted Mint Green Silk & Gold Piping Work",
    finishTitle: "Peacock Blue Zardozi & Hanging Tassel Masterpiece",
    sketchImg: "/mint_green_blouse_back.jpg",
    finishImg: "/peacock_blue_blouse_back.jpg",
    description: "Every bespoke blouse begins as a clean paper sketch & stretched raw fabric on our traditional wooden frame. Our artisans then hand-embroider every bead, zardozi thread, and cut-work detail before final master tailoring."
  }

  const steps = [
    {
      num: "01",
      title: "Design Consultation & Sketch",
      desc: "Share your saree photo, preferred neckline, sleeve length, or inspiration photos via WhatsApp.",
      icon: Compass
    },
    {
      num: "02",
      title: "Handloom Frame Tracing",
      desc: "The fabric is mounted on wooden Aari frames and the intricate embroidery design is traced precisely by hand.",
      icon: Palette
    },
    {
      num: "03",
      title: "Artisanal Aari & Beadwork",
      desc: "Master craftsman hand-stitch every golden thread, Kundan stone, glass bead, and cut-work border.",
      icon: Layers
    },
    {
      num: "04",
      title: "Precision Custom Stitching",
      desc: "Stitched to your exact body measurements with padded cups, heavy lining, and luxury finishing.",
      icon: Scissors
    }
  ]

  const whatsappInquire = () => {
    const link = storeService.generateWhatsAppLink(settings.whatsapp_number, {
      name: "Custom Blouse Sketch-to-Stitch Consultation",
      sku: "SKETCH-CUSTOM",
      price: 2500,
      category_name: "Bespoke Stitching"
    }, { notes: "Hi Reshma! I have my own design idea / saree photo and want to get a custom blouse created." })
    window.open(link, '_blank')
  }

  return (
    <section className="py-20 bg-pearl-dark/40 border-y border-gold/15 relative overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold bg-ebony/90 border border-gold/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
            The Bespoke Craft Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ebony font-bold tracking-tight mb-4">
            From Inspiration Sketch to Finished Blouse
          </h2>
          <p className="text-ebony/75 text-base sm:text-lg leading-relaxed">
            Your blouse is built from scratch. See how raw fabric and handloom embroidery transform into a bespoke luxury creation stitched uniquely for you.
          </p>
        </div>

        {/* Interactive Transformation Card */}
        <div className="bg-pearl rounded-3xl p-6 lg:p-10 border border-gold/20 shadow-luxury mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image Showcase with Toggle Controls */}
            <div className="lg:col-span-7 space-y-4">
              {/* Toggle Buttons */}
              <div className="flex items-center justify-between bg-sand p-1.5 rounded-2xl border border-sand-dark">
                <button
                  onClick={() => setActiveTab('sketch')}
                  className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'sketch'
                      ? 'bg-ebony text-gold shadow-md'
                      : 'text-ebony/70 hover:text-ebony'
                  }`}
                >
                  🪡 1. Mint Green Beadwork
                </button>
                <button
                  onClick={() => setActiveTab('finish')}
                  className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'finish'
                      ? 'bg-ebony text-gold shadow-md'
                      : 'text-ebony/70 hover:text-ebony'
                  }`}
                >
                  ✨ 2. Peacock Blue Tassel Blouse
                </button>
              </div>

              {/* Dynamic Display Area */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-ebony shadow-inner border border-gold/20 group">
                <img
                  src={activeTab === 'sketch' ? showcaseItem.sketchImg : showcaseItem.finishImg}
                  alt={activeTab === 'sketch' ? showcaseItem.sketchTitle : showcaseItem.finishTitle}
                  className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                />

                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 bg-ebony/90 text-pearl backdrop-blur-md px-4 py-2 rounded-xl border border-gold/30 text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                  {activeTab === 'sketch' ? showcaseItem.sketchTitle : showcaseItem.finishTitle}
                </div>
              </div>
            </div>

            {/* Right Information & Process Overview */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-ebony">
                No Mass Factory Production. Pure Craftsmanship.
              </h3>
              <p className="text-ebony/80 text-sm leading-relaxed">
                {showcaseItem.description}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-ebony/90">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>Choose any neck cut (deep U, glass neck, boat neck, sweetheart, cut-work).</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-ebony/90">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>Custom sleeve length & cuff embroidery tailored to your height and comfort.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-ebony/90">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>Option to combine ideas from multiple designs or bring your own Pinterest inspiration.</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={whatsappInquire}
                  className="w-full sm:w-auto bg-ebony hover:bg-gold text-gold hover:text-ebony font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg border border-gold/40"
                >
                  <span>Bring Your Idea to Life on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="bg-pearl p-6 rounded-2xl border border-gold/15 hover:border-gold/50 transition-all duration-300 hover:shadow-card-hover group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-serif font-bold text-gold/60 group-hover:text-gold transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-sand flex items-center justify-center text-ebony group-hover:bg-ebony group-hover:text-gold transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-ebony mb-2">
                    {step.title}
                  </h4>
                  <p className="text-ebony/70 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
