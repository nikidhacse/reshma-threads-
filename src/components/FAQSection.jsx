import React, { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export const FAQSection = () => {
  const { settings } = useStore()
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: "Do you stitch exact copies of previous designs?",
      a: "Every blouse created at Reshma Threads Studio is one-of-a-kind. While we can replicate a previous design's embroidery patterns, cut-work, or color schemes, we recommend personalizing details (like neck depth, sleeve finish, or back tassels) to suit your unique body type and saree style."
    },
    {
      q: "Can I customize neck designs, sleeve lengths & fabric?",
      a: "Absolutely! Customization is our specialty. You can mix and match elements from different designs in our portfolio (e.g., combine the cut-work back of Design #RTS-DES-101 with the heavy cuff sleeves of Design #RTS-DES-102), or share your own Pinterest/Instagram reference images."
    },
    {
      q: "How long does it take to complete an order?",
      a: "Standard custom blouses with moderate Aari/Maggam work take between 7 to 12 working days. Heavy bridal blouses with intricate cut-work and hand-beading require 15 to 20 working days. Express stitching options may be available upon request."
    },
    {
      q: "Do you accept outstation / courier orders?",
      a: "Yes, we ship pan-India and internationally! For clients outside Chennai, you can courier your unstitched fabric or saree directly to our Chennai studio along with a well-fitting sample blouse. We also offer guided virtual measurement assistance via WhatsApp video call."
    },
    {
      q: "How do I get a price quote for custom stitching & embroidery?",
      a: "Because every piece is 100% customized to your fabric, embroidery density, and fitting preferences, we don't fix rigid prices on our website. Simply click 'Inquire Price on WhatsApp' on any design or send us your inspiration image, and we will give you an exact instant quote!"
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const rawNumber = (settings.whatsapp_number || '+919003539707').replace(/[^0-9]/g, '')
  const faqWhatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent("Hi Reshma! I have a question about custom stitching / ordering that wasn't answered in the FAQ.")}`

  return (
    <section className="py-20 bg-pearl relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold bg-sand border border-gold/30 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ebony tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-ebony/75 text-sm sm:text-base">
            Everything you need to know about our custom tailoring process, turnaround times, and ordering.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-sand/40 border-gold/40 shadow-sm' 
                    : 'bg-pearl border-sand-dark/60 hover:border-gold/30'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-ebony">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-gold text-ebony rotate-180' : 'bg-sand text-ebony/70'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-ebony/80 text-sm leading-relaxed border-t border-gold/10 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Extra Question Prompt */}
        <div className="mt-12 text-center bg-sand/60 rounded-2xl p-6 border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif font-bold text-ebony text-base">Have a unique question or custom fabric inquiry?</h4>
            <p className="text-ebony/70 text-xs mt-0.5">Reach out directly to Reshma for personalized advice.</p>
          </div>
          <a
            href={faqWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-ebony text-gold hover:bg-gold hover:text-ebony font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  )
}
