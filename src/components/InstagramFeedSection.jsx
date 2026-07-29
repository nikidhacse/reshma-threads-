import React from 'react'
import { Instagram, ArrowUpRight, Heart, Sparkles } from 'lucide-react'

export const InstagramFeedSection = () => {
  const instaPosts = [
    { id: 1, img: "/insta_purple_backneck.jpg", likes: "1.2k", caption: "Cut-work Aari Back Neck in Royal Purple" },
    { id: 2, img: "/insta_purple_sleeves.jpg", likes: "980", caption: "Heavy Beaded Chevron Sleeve Cuffs" },
    { id: 3, img: "/insta_purple_maggam_frame.jpg", likes: "1.5k", caption: "Maggam Work in Progress on Traditional Frame" },
    { id: 4, img: "/insta_purple_hanging_tassels.jpg", likes: "2.1k", caption: "Hanging Glass Bead Tassel Detailing" },
    { id: 5, img: "/insta_teal_fullview.jpg", likes: "1.1k", caption: "Traditional Teal Silk Saree Blouse" },
    { id: 6, img: "/insta_olive_silver_neck.jpg", likes: "890", caption: "Minimal Silver Stone Border Olive Silk" }
  ]

  const instaUrl = "https://www.instagram.com/reshma_threads_studio"

  return (
    <section className="py-20 bg-pearl border-t border-gold/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold bg-ebony border border-gold/30 mb-3 shadow-sm">
              <Instagram className="w-3.5 h-3.5 text-gold" />
              Follow Our Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ebony tracking-tight">
              @reshma_threads_studio
            </h2>
            <p className="text-ebony/75 text-sm mt-1">
              Explore live studio updates, raw frame progress, and customer reveal reels on Instagram.
            </p>
          </div>

          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-semibold px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6-Grid Instagram Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instaPosts.map((post) => (
            <a
              key={post.id}
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-ebony border border-gold/20 shadow-sm block"
            >
              <img
                src={post.img}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover Dark Overlay with Likes & Caption */}
              <div className="absolute inset-0 bg-ebony/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-pearl">
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-1 bg-gold/20 text-gold px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <Heart className="w-3 h-3 fill-current" />
                    {post.likes}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-medium leading-snug line-clamp-2 text-pearl">
                    {post.caption}
                  </p>
                  <span className="text-[9px] text-gold uppercase tracking-wider font-semibold block">
                    View on Instagram →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
