import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { Search, X, ArrowRight, Sparkles } from 'lucide-react'

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, products, categories, navigateTo } = useStore()
  const [query, setQuery] = useState('')

  if (!isSearchOpen) return null

  const filteredProducts = query.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        (p.category_name && p.category_name.toLowerCase().includes(query.toLowerCase()))
      )
    : []

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false)
    setQuery('')
    navigateTo('product', { slug: product.slug })
  }

  const handleCategorySearch = (catName) => {
    setIsSearchOpen(false)
    setQuery('')
    navigateTo('shop', { category: catName })
  }

  return (
    <div className="fixed inset-0 z-50 bg-ebony/70 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-fade-in">
      <div className="bg-pearl w-full max-w-2xl rounded-3xl shadow-2xl border border-gold/30 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-5 bg-white border-b border-sand-dark flex items-center gap-3">
          <Search className="w-5 h-5 text-gold" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, lehengas, anarkali, zari work..."
            className="flex-1 bg-transparent text-ebony placeholder-gray-400 text-sm font-medium focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-ebony text-xs font-semibold">
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full hover:bg-sand text-ebony hover:text-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Active Search Results */}
          {query.trim() ? (
            <div>
              <p className="text-xs font-semibold text-brown uppercase tracking-wider mb-3">
                Matching Results ({filteredProducts.length})
              </p>

              {filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-sm">
                  No boutique items matching "{query}". Try searching for 'saree', 'silk', or 'gold'.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="p-3 bg-white hover:bg-sand-light rounded-xl border border-sand-dark/50 flex items-center justify-between cursor-pointer transition-all hover:border-gold/40 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=150&auto=format&fit=crop'}
                          alt={p.name}
                          className="w-12 h-14 object-cover object-top rounded-lg"
                        />
                        <div>
                          <h4 className="font-serif font-semibold text-sm text-ebony">{p.name}</h4>
                          <span className="text-[11px] text-brown">{p.category_name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-ebony">₹{Number(p.price).toLocaleString('en-IN')}</span>
                        <ArrowRight className="w-4 h-4 text-gold" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Popular Category Quick Suggestions */
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brown uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Popular Studio Collections</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCategorySearch(c.name)}
                    className="bg-white hover:bg-gold hover:text-ebony text-ebony text-xs font-medium px-4 py-2 rounded-xl border border-sand-dark transition-all shadow-sm"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
