import React, { useState, useEffect } from 'react'
import { useStore } from '../context/StoreContext'
import { Search, Heart, Shield, Menu, X, Sparkles, ChevronRight, MessageCircle } from 'lucide-react'

export const Navbar = () => {
  const { 
    currentPage, 
    navigateTo, 
    wishlist, 
    setIsWishlistOpen, 
    setIsSearchOpen, 
    settings,
    trackWhatsAppClick
  } = useStore()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Portfolio Gallery' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact & Studio' },
  ]

  const handleNavClick = (pageId) => {
    navigateTo(pageId)
    setMobileMenuOpen(false)
  }

  const rawNumber = (settings.whatsapp_number || '+917708521531').replace(/[^0-9]/g, '')
  const quickWhatsapp = `https://wa.me/${rawNumber}?text=${encodeURIComponent("Hi Reshma Threads Studio! I'd like to inquire about a custom blouse order.")}`

  const handleWhatsAppNav = () => {
    trackWhatsAppClick('Navbar Header')
  }

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled ? 'shadow-md' : ''
    }`}>

      {/* Announcement Bar */}
      {settings.announcement_banner && (
        <div className="bg-ebony text-pearl text-[11px] font-medium py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-gold/20">
          <Sparkles className="w-3 h-3 text-gold animate-pulse shrink-0" />
          <span className="line-clamp-1">{settings.announcement_banner}</span>
        </div>
      )}

      {/* Main Nav */}
      <nav className={`glass-panel px-4 lg:px-8 py-3.5 transition-all duration-300 ${scrolled ? 'border-b border-gold/20' : ''}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-ebony hover:text-gold transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-gold/40 shadow-sm group-hover:scale-105 group-hover:border-gold transition-all duration-300 shrink-0">
              <img
                src="/logo.jpg"
                alt="Reshma Threads Studio Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-ebony group-hover:text-gold transition-colors leading-tight">
                RESHMA THREADS
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-brown/80 -mt-0.5">
                Studio · Bespoke Boutique
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative text-sm font-medium tracking-wider transition-all duration-300 py-1 ${
                  currentPage === link.id ? 'text-gold font-semibold' : 'text-ebony/75 hover:text-gold'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-sand text-ebony hover:text-gold transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-sand text-ebony hover:text-gold transition-colors"
              title="Inspiration Board"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-400 text-red-400' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-ebony text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <a
              href={quickWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppNav}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </a>

            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                currentPage === 'admin'
                  ? 'bg-ebony text-gold border-gold'
                  : 'bg-sand/60 hover:bg-ebony hover:text-gold text-ebony border-sand-dark/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-gold" />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] z-50 bg-ebony/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-pearl w-4/5 max-w-sm h-full shadow-2xl flex flex-col justify-between border-r border-gold/20">
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-sand-dark pb-4">
                <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-full border-2 border-gold/40 shadow-sm shrink-0" />
                <div>
                  <h3 className="font-serif font-bold text-ebony text-sm">Reshma Threads</h3>
                  <p className="text-[9px] uppercase tracking-widest text-brown font-semibold">Bespoke Studio</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between text-base font-medium py-3 px-4 rounded-2xl transition-all ${
                      currentPage === link.id
                        ? 'bg-gold/15 text-gold font-bold border border-gold/30'
                        : 'text-ebony hover:bg-sand'
                    }`}
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-brown" />
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-sand-dark space-y-3">
              <a
                href={quickWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full bg-ebony text-gold font-semibold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 border border-gold/30"
              >
                <Shield className="w-4 h-4" />
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
