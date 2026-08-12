import React, { useState, useEffect } from 'react'

export default function ComingSoon() {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    // Generate random sparkle positions
    const s = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      top: Math.random() * 90 + '%',
      left: Math.random() * 95 + '%',
      delay: Math.random() * 3 + 's',
      size: Math.random() * 6 + 6,
    }))
    setSparkles(s)
  }, [])

  const handleWhatsApp = () => {
    const number = '917708521531'
    const msg = encodeURIComponent("Hi Reshma Threads Studio! I'd love to know when you launch. Please keep me updated! 🌸")
    window.open(`https://wa.me/${number}?text=${msg}`, '_blank')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0805 0%, #1a1208 40%, #0f0c07 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      padding: '24px',
    }}>
      {/* Ambient glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '8%',
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(180,90,120,0.10) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '50%', right: '20%',
        width: 250, height: 250,
        background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      {/* Floating sparkles */}
      {sparkles.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          borderRadius: '50%',
          background: 'rgba(212,175,55,0.5)',
          animation: `twinkle 3s ease-in-out ${s.delay} infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Main card */}
      <div style={{
        maxWidth: 560,
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* Logo */}
        <div style={{
          width: 100, height: 100,
          borderRadius: '50%',
          border: '2.5px solid rgba(212,175,55,0.7)',
          overflow: 'hidden',
          margin: '0 auto 28px',
          boxShadow: '0 0 40px rgba(212,175,55,0.25)',
          background: '#1a1208',
        }}>
          <img
            src="/logo.jpg"
            alt="Reshma Threads Studio"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(212,175,55,0.12)',
          border: '1px solid rgba(212,175,55,0.35)',
          borderRadius: 999,
          padding: '5px 16px',
          marginBottom: 20,
        }}>
          <span style={{ fontSize: 10, color: '#c9a227', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            🌸 &nbsp; Launching Very Soon
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2rem, 7vw, 3.2rem)',
          fontWeight: 700,
          color: '#f5f0e8',
          lineHeight: 1.15,
          marginBottom: 8,
          letterSpacing: '-0.01em',
        }}>
          Reshma Threads Studio
        </h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          color: '#c9a227',
          fontStyle: 'italic',
          marginBottom: 28,
          letterSpacing: '0.04em',
        }}>
          Luxury Handcrafted Couture & Boutique
        </p>

        {/* Divider */}
        <div style={{
          width: 80, height: 1,
          background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
          margin: '0 auto 28px',
        }} />

        {/* Body text */}
        <p style={{
          color: 'rgba(245,240,232,0.65)',
          fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
          lineHeight: 1.75,
          marginBottom: 36,
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          We're putting the final touches on something truly special.
          Our boutique is currently being updated with exclusive new
          collections crafted by hand — just for you.
        </p>

        {/* Features */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 40,
        }}>
          {['✦ Bespoke Blouses', '✦ Silk Sarees', '✦ Bridal Sets', '✦ Custom Stitching'].map(f => (
            <span key={f} style={{
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: 999,
              padding: '5px 14px',
              fontSize: 11,
              color: '#c9a227',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}>{f}</span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleWhatsApp}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            color: '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            padding: '14px 32px',
            borderRadius: 16,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(37,211,102,0.25)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            letterSpacing: '0.02em',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,211,102,0.35)' }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.25)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Notify Me on WhatsApp
        </button>

        {/* Footer note */}
        <p style={{
          marginTop: 32,
          fontSize: 11,
          color: 'rgba(245,240,232,0.3)',
          letterSpacing: '0.05em',
        }}>
          © Reshma Threads Studio · Handcrafted with ❤️
        </p>
      </div>

      {/* Twinkling animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}
