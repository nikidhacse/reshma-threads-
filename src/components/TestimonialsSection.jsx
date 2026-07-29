import React from 'react'
import { Star, Quote, Heart } from 'lucide-react'

export const TestimonialsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Sneha Reddy",
      location: "Chennai",
      rating: 5,
      designTag: "Bridal Cut-Work Blouse",
      img: "/insta_purple_backneck.jpg",
      comment: "Reshma stitched my wedding reception blouse. The cut-work back and golden Aari bead detailing were so neat and exact! Everyone complimented the unique back design. Fitting was 10/10."
    },
    {
      id: 2,
      name: "Divya Krishnan",
      location: "Bangalore (Courier Order)",
      rating: 5,
      designTag: "Silk Saree Pre-Pleating & Blouse",
      img: "/insta_olive_saree.jpg",
      comment: "I sent my Kanjivaram saree from Bangalore for pre-pleating and blouse stitching. The box pleating made draping so effortless on my function day! Super professional service."
    },
    {
      id: 3,
      name: "Ananya Sundar",
      location: "Chennai",
      rating: 5,
      designTag: "Teal Silk Aari Blouse",
      img: "/insta_teal_fullview.jpg",
      comment: "The hand embroidery is so fine and elegant! I loved that she guided me on neck depth and sleeve style instead of pushing generic templates. Totally worth it!"
    }
  ]

  return (
    <section className="py-20 bg-pearl-dark/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold bg-ebony border border-gold/30 mb-4 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-gold fill-current" />
            Loved By Our Clients
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ebony tracking-tight mb-3">
            Real Stories & Customer Reviews
          </h2>
          <p className="text-ebony/75 text-sm sm:text-base">
            Read how our handcrafted blouses and pre-pleating services made special occasions extra memorable.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-pearl rounded-3xl p-7 border border-gold/20 shadow-luxury hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Rating & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-sand text-brown">
                    {rev.designTag}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-gold/30 mb-2" />

                <p className="text-ebony/80 text-sm leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-sand-dark">
                <img
                  src={rev.img}
                  alt={rev.name}
                  className="w-12 h-12 rounded-xl object-cover border border-gold/30 shadow-sm"
                />
                <div>
                  <h4 className="font-serif font-bold text-ebony text-sm">{rev.name}</h4>
                  <p className="text-ebony/60 text-xs">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
