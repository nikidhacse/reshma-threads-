import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { 
  Shield, Key, Lock, LayoutDashboard, Package, FolderTree, ShoppingBag, Settings as SettingsIcon,
  Plus, Edit, Trash2, CheckCircle, Clock, Eye, MessageCircle, Upload, X, Star, Save, LogOut, Search, ExternalLink,
  BarChart2, TrendingUp, HelpCircle, RefreshCw, Send, Sparkles, MessageSquare, ArrowUpRight
} from 'lucide-react'

export const AdminDashboard = () => {
  const { 
    products, 
    categories, 
    orders, 
    comments,
    settings, 
    analytics,
    saveProduct, 
    deleteProduct, 
    saveCategory, 
    deleteCategory, 
    updateOrderStatus, 
    updateStoreSettings, 
    replyComment,
    deleteComment,
    deleteOrder,
    resetAnalytics,
    showToast,
    navigateTo
  } = useStore()

  // Authentication Lock State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState(false)

  // Active Admin Tab State: 'overview', 'analytics', 'orders', 'comments', 'products', 'categories', 'settings'
  const [activeTab, setActiveTab] = useState('overview')

  // Reply state for Client Questions Board
  const [replyInput, setReplyInput] = useState({})

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    original_price: '',
    category_name: '',
    description: '',
    fabric_info: '',
    care_instructions: '',
    sizes: 'S, M, L, XL',
    colors: 'Gold, Ivory, Beige',
    stock_quantity: 10,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: true,
    images: []
  })
  const [newImageUrl, setNewImageUrl] = useState('')

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [catForm, setCatForm] = useState({ name: '', description: '', image_url: '' })

  // Search Filter in Admin Table
  const [productSearch, setProductSearch] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState('all')

  // Handle Admin Passcode Login
  const handleLogin = (e) => {
    e.preventDefault()
    if (passcode === 'reshma123' || passcode === 'admin') {
      setIsAuthenticated(true)
      setAuthError(false)
      showToast('Authenticated as Studio Admin ✨', 'success')
    } else {
      setAuthError(true)
    }
  }

  // Handle Product Form Modal Open
  const openAddProductModal = () => {
    setEditingProduct(null)
    setProductForm({
      name: '',
      price: '',
      original_price: '',
      category_name: categories[0]?.name || 'Signature Collections',
      description: '',
      fabric_info: '',
      care_instructions: '',
      sizes: 'S, M, L, XL',
      colors: 'Gold, Ivory, Beige',
      stock_quantity: 10,
      is_featured: false,
      is_best_seller: false,
      is_new_arrival: true,
      images: ['/lavender_collection_set.jpg']
    })
    setIsProductModalOpen(true)
  }

  const openEditProductModal = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name || '',
      price: product.price || '',
      original_price: product.original_price || '',
      category_name: product.category_name || categories[0]?.name || '',
      description: product.description || '',
      fabric_info: product.fabric_info || '',
      care_instructions: product.care_instructions || '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || ''),
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : (product.colors || ''),
      stock_quantity: product.stock_quantity || 10,
      is_featured: Boolean(product.is_featured),
      is_best_seller: Boolean(product.is_best_seller),
      is_new_arrival: Boolean(product.is_new_arrival),
      images: product.images || []
    })
    setIsProductModalOpen(true)
  }

  // Multi Image File Upload Handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProductForm(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }))
      }
      reader.readAsDataURL(file)
    })
    showToast(`${files.length} image(s) attached!`)
  }

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return
    setProductForm(prev => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }))
    setNewImageUrl('')
  }

  const handleRemoveImage = (index) => {
    setProductForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  // Save Product Handler
  const handleProductSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      id: editingProduct ? editingProduct.id : undefined,
      name: productForm.name,
      price: Number(productForm.price),
      original_price: productForm.original_price ? Number(productForm.original_price) : null,
      category_name: productForm.category_name,
      description: productForm.description,
      fabric_info: productForm.fabric_info,
      care_instructions: productForm.care_instructions,
      sizes: productForm.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: productForm.colors.split(',').map(c => c.trim()).filter(Boolean),
      stock_quantity: Number(productForm.stock_quantity),
      in_stock: Number(productForm.stock_quantity) > 0,
      is_featured: productForm.is_featured,
      is_best_seller: productForm.is_best_seller,
      is_new_arrival: productForm.is_new_arrival,
      images: productForm.images.length > 0 ? productForm.images : ['/lavender_collection_set.jpg']
    }

    await saveProduct(payload)
    setIsProductModalOpen(false)
  }

  // Save Category Handler
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    await saveCategory({
      name: catForm.name,
      description: catForm.description,
      image_url: catForm.image_url || '/lavender_collection_set.jpg'
    })
    setCatForm({ name: '', description: '', image_url: '' })
    setIsCategoryModalOpen(false)
  }

  // Handle Comment Reply Submit
  const handleReplySubmit = async (commentId) => {
    const text = replyInput[commentId]
    if (!text || !text.trim()) return
    await replyComment(commentId, text.trim())
    setReplyInput(prev => ({ ...prev, [commentId]: '' }))
  }

  // Filtered lists
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    (p.category_name && p.category_name.toLowerCase().includes(productSearch.toLowerCase()))
  )

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter === 'all') return true
    return o.status === orderStatusFilter
  })

  // Quick Stats
  const newOrdersCount = orders.filter(o => o.status === 'New').length
  const totalWaClicks = analytics?.whatsappClicks?.total || 0
  const waLogs = analytics?.whatsappClicks?.logs || []
  const pageViews = analytics?.pageViews || {}
  const totalViews = analytics?.totalPageViews || 0

  // --- LOGIN SCREEN IF UNAUTHENTICATED ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-pearl">
        <div className="bg-white max-w-md w-full p-8 rounded-3xl border border-sand-dark/60 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 bg-ebony text-gold rounded-2xl flex items-center justify-center mx-auto shadow-md border border-gold/30">
            <Shield className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">Studio Administration</span>
            <h2 className="font-serif text-2xl font-bold text-ebony">Protected Admin Portal</h2>
            <p className="text-xs text-gray-500 font-light">
              Enter your studio passcode to access management & live website analytics.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Passcode</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (Default: reshma123)"
                  className="w-full bg-pearl border border-sand-dark rounded-xl pl-9 pr-4 py-3 text-xs text-ebony focus:outline-none focus:border-gold"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
              {authError && (
                <p className="text-xs text-red-500 mt-1">Invalid passcode. Try <code className="bg-red-50 px-1 font-bold">reshma123</code></p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-ebony hover:bg-ebony-soft text-gold font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-xs"
            >
              <Key className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-brown hover:text-gold font-medium"
            >
              Return to Customer Store
            </button>
          </div>
        </div>
      </div>
    )
  }

  // --- MAIN ADMIN DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="bg-ebony text-pearl p-6 rounded-3xl border border-gold/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gold/15 rounded-2xl border border-gold/30 text-gold">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">Studio Management Center</h1>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Tracking Active
              </span>
            </div>
            <p className="text-xs text-gray-300 font-light mt-0.5">Reshma Threads Studio • Bespoke Boutique Admin</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => navigateTo('home')}
            className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 text-pearl text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all border border-white/20"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Store</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-gold hover:bg-gold-light text-ebony text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-sand-dark gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'analytics', label: `Analytics & Leads`, icon: BarChart2, badge: totalWaClicks > 0 ? `${totalWaClicks} Leads` : null, badgeColor: 'bg-emerald-500 text-white' },
          { id: 'orders', label: `Consultation Enquiries (${orders.length})`, icon: ShoppingBag, badge: newOrdersCount > 0 ? `${newOrdersCount} New` : null, badgeColor: 'bg-amber-400 text-ebony' },
          { id: 'comments', label: `Client Questions (${comments.length})`, icon: MessageSquare },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'categories', label: `Categories (${categories.length})`, icon: FolderTree },
          { id: 'settings', label: 'Store Settings', icon: SettingsIcon },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-ebony text-gold shadow-md'
                  : 'bg-white hover:bg-sand text-ebony border border-sand-dark/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tab.badgeColor || 'bg-gold text-ebony'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ══════════════════════════════════════
          TAB 1: OVERVIEW DASHBOARD — PREMIUM DESIGN
      ══════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">

          {/* ─── PREMIUM HERO STAT BANNER ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Website Views — Dark Gold Card */}
            <div className="admin-stat-card p-6 cursor-default" onClick={() => setActiveTab('analytics')}>
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{color:'rgba(197,160,89,0.7)'}}>Website Visitors</p>
                  <p className="text-[10px] text-gray-500">Live page tracking</p>
                </div>
                <div className="p-2.5 rounded-2xl" style={{background:'rgba(197,160,89,0.12)',border:'1px solid rgba(197,160,89,0.25)'}}>
                  <Eye className="w-5 h-5" style={{color:'#C5A059'}} />
                </div>
              </div>
              <div className="animate-count-up">
                <span className="font-serif text-5xl font-bold gold-gradient-text">{totalViews}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[10px]" style={{color:'rgba(197,160,89,0.7)'}}>
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-semibold">Active tracking</span>
                </div>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              {/* decorative orb */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10" style={{background:'radial-gradient(circle,#C5A059,transparent)'}} />
            </div>

            {/* WhatsApp Clicks — Dark Green Card */}
            <div className="admin-stat-card-green p-6 cursor-default" onClick={() => setActiveTab('analytics')}>
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{color:'rgba(74,222,128,0.7)'}}>WhatsApp Inquiries</p>
                  <p className="text-[10px] text-gray-500">Customers reached out</p>
                </div>
                <div className="p-2.5 rounded-2xl" style={{background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.25)'}}>
                  <MessageCircle className="w-5 h-5" style={{color:'#22c55e'}} />
                </div>
              </div>
              <div className="animate-count-up">
                <span className="font-serif text-5xl font-bold" style={{color:'#4ade80'}}>{totalWaClicks}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[10px]" style={{color:'rgba(74,222,128,0.7)'}}>
                  <Sparkles className="w-3 h-3" />
                  <span className="font-semibold">WhatsApp leads</span>
                </div>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10" style={{background:'radial-gradient(circle,#22c55e,transparent)'}} />
            </div>

            {/* Form Enquiries — Dark Amber Card */}
            <div className="cursor-default rounded-3xl p-6 relative overflow-hidden" style={{
              background:'linear-gradient(135deg,#2A1A00 0%,#332200 50%,#2A1A00 100%)',
              border:'1px solid rgba(251,191,36,0.2)',
              boxShadow:'0 0 20px rgba(251,191,36,0.06)'
            }} onClick={() => setActiveTab('orders')}>
              <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at top right,rgba(251,191,36,0.08) 0%,transparent 60%)'}} />
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{color:'rgba(251,191,36,0.7)'}}>Form Enquiries</p>
                  <p className="text-[10px] text-gray-500">Consultation requests</p>
                </div>
                <div className="p-2.5 rounded-2xl" style={{background:'rgba(251,191,36,0.1)',border:'1px solid rgba(251,191,36,0.25)'}}>
                  <ShoppingBag className="w-5 h-5" style={{color:'#fbbf24'}} />
                </div>
              </div>
              <div className="animate-count-up">
                <span className="font-serif text-5xl font-bold" style={{color:'#fcd34d'}}>{orders.length}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[10px]" style={{color:'rgba(251,191,36,0.7)'}}>
                  <Clock className="w-3 h-3" />
                  <span className="font-semibold">{newOrdersCount} new awaiting</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10" style={{background:'radial-gradient(circle,#fbbf24,transparent)'}} />
            </div>

            {/* Boutique Portfolio — Dark Purple Card */}
            <div className="cursor-default rounded-3xl p-6 relative overflow-hidden" style={{
              background:'linear-gradient(135deg,#180A2A 0%,#201030 50%,#180A2A 100%)',
              border:'1px solid rgba(167,139,250,0.2)',
              boxShadow:'0 0 20px rgba(167,139,250,0.06)'
            }} onClick={() => setActiveTab('products')}>
              <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at top right,rgba(167,139,250,0.08) 0%,transparent 60%)'}} />
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{color:'rgba(196,181,253,0.7)'}}>Boutique Portfolio</p>
                  <p className="text-[10px] text-gray-500">Products live on store</p>
                </div>
                <div className="p-2.5 rounded-2xl" style={{background:'rgba(167,139,250,0.1)',border:'1px solid rgba(167,139,250,0.25)'}}>
                  <Package className="w-5 h-5" style={{color:'#a78bfa'}} />
                </div>
              </div>
              <div className="animate-count-up">
                <span className="font-serif text-5xl font-bold" style={{color:'#c4b5fd'}}>{products.length}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[10px]" style={{color:'rgba(196,181,253,0.7)'}}>
                  <FolderTree className="w-3 h-3" />
                  <span className="font-semibold">{categories.length} categories</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10" style={{background:'radial-gradient(circle,#a78bfa,transparent)'}} />
            </div>

          </div>

          {/* ─── QUICK OVERVIEW ROW ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Recent Customer Enquiries — Premium Glass Card */}
            <div className="lg:col-span-7 admin-glass-card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{background:'linear-gradient(135deg,rgba(197,160,89,0.15),rgba(197,160,89,0.05))',border:'1px solid rgba(197,160,89,0.2)'}}>
                    <ShoppingBag className="w-4 h-4" style={{color:'#C5A059'}} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ebony">Latest Enquiries</h3>
                    <p className="text-[10px] text-gray-400">Recent consultation requests</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="flex items-center gap-1 text-xs font-semibold text-gold hover:opacity-80 transition-opacity"
                >
                  All ({orders.length})
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {orders.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 text-xs">No enquiries yet. They'll appear here when customers reach out!</div>
                ) : (
                  orders.slice(0, 5).map((ord, i) => (
                    <div
                      key={ord.id}
                      className="flex items-center gap-4 p-3.5 rounded-2xl transition-all hover:bg-sand/40 group"
                      style={{animationDelay:`${i * 80}ms`}}
                    >
                      {/* Avatar */}
                      <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-pearl" style={{background:'linear-gradient(135deg,#C5A059,#9E7E3B)'}}>
                        {(ord.customer_name || 'C').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ebony text-xs truncate">{ord.customer_name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{ord.product_name}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.status === 'New' ? 'bg-amber-100 text-amber-800' :
                          ord.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                          ord.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* WhatsApp Live Activity — Premium Timeline */}
            <div className="lg:col-span-5 rounded-3xl p-6 space-y-5" style={{
              background:'linear-gradient(160deg,#0A2A1A 0%,#0D3320 100%)',
              border:'1px solid rgba(34,197,94,0.18)',
              boxShadow:'0 4px 32px rgba(34,197,94,0.07), 0 0 0 1px rgba(34,197,94,0.05)'
            }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative p-2 rounded-xl" style={{background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.25)'}}>
                    <MessageCircle className="w-4 h-4" style={{color:'#4ade80'}} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold" style={{color:'#ecfdf5'}}>WhatsApp Live</h3>
                    <p className="text-[10px]" style={{color:'rgba(74,222,128,0.6)'}}>Real-time click activity</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="flex items-center gap-1 text-xs font-semibold hover:opacity-80 transition-opacity"
                  style={{color:'#4ade80'}}
                >
                  Full Log
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-0 max-h-64 overflow-y-auto pr-1 scrollbar-none">
                {waLogs.length === 0 ? (
                  <div className="text-center py-10 text-xs" style={{color:'rgba(74,222,128,0.4)'}}>
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p>No WhatsApp clicks yet.</p>
                    <p className="mt-1 opacity-60">Click the WhatsApp button on your store to see live activity here!</p>
                  </div>
                ) : (
                  waLogs.slice(0, 6).map((log, idx) => (
                    <div key={log.id || idx} className="wa-timeline-item py-3 group">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="font-bold text-xs truncate" style={{color:'#ecfdf5'}}>
                            {log.product || 'General Studio Inquiry'}
                          </p>
                          <p className="text-[10px]" style={{color:'rgba(74,222,128,0.6)'}}>
                            via <span className="font-semibold" style={{color:'#4ade80'}}>{log.source}</span>
                          </p>
                        </div>
                        <span className="text-[10px] ml-2 shrink-0" style={{color:'rgba(74,222,128,0.45)'}}>
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total count pill */}
              <div className="pt-3 border-t" style={{borderColor:'rgba(34,197,94,0.12)'}}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold" style={{color:'rgba(74,222,128,0.5)'}}>Total WhatsApp leads</span>
                  <span className="font-serif text-xl font-bold" style={{color:'#4ade80'}}>{totalWaClicks}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2: LIVE ANALYTICS — PREMIUM SPECIAL DESIGN
      ══════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fade-in">

          {/* ─── PREMIUM ANALYTICS HEADER BANNER ─── */}
          <div className="relative rounded-3xl overflow-hidden p-7" style={{
            background:'linear-gradient(135deg,#1A1A1A 0%,#0A2A1A 40%,#1A1A2A 100%)',
            border:'1px solid rgba(197,160,89,0.2)'
          }}>
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{background:'radial-gradient(circle,#C5A059,transparent)',transform:'translate(30%,-30%)'}} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{background:'radial-gradient(circle,#22c55e,transparent)',transform:'translate(-30%,30%)'}} />

            <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-2xl" style={{background:'rgba(197,160,89,0.12)',border:'1px solid rgba(197,160,89,0.25)'}}>
                    <BarChart2 className="w-5 h-5" style={{color:'#C5A059'}} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold" style={{color:'#FAF8F5'}}>Live Analytics Dashboard</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-semibold" style={{color:'rgba(74,222,128,0.8)'}}>Real-time tracking active</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs" style={{color:'rgba(250,248,245,0.4)'}}>Track website visitors, WhatsApp leads, consultation forms &amp; client engagement in real time.</p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Reset all analytics counters to zero?')) resetAnalytics()
                }}
                className="shrink-0 flex items-center gap-2 text-xs font-bold py-2.5 px-4 rounded-xl transition-all"
                style={{background:'rgba(197,160,89,0.1)',border:'1px solid rgba(197,160,89,0.25)',color:'rgba(197,160,89,0.8)'}}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Counters</span>
              </button>
            </div>
          </div>

          {/* ─── 4 METRIC CARDS ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Website Traffic */}
            <div className="relative rounded-3xl p-6 overflow-hidden" style={{
              background:'linear-gradient(135deg,#0A1929 0%,#102040 100%)',
              border:'1px solid rgba(59,130,246,0.25)',
              boxShadow:'0 4px 32px rgba(59,130,246,0.08)'
            }}>
              <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at top right,rgba(59,130,246,0.1) 0%,transparent 65%)'}} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl" style={{background:'rgba(59,130,246,0.12)',border:'1px solid rgba(59,130,246,0.25)'}}>
                    <Eye className="w-4 h-4" style={{color:'#60a5fa'}} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold" style={{color:'rgba(96,165,250,0.7)'}}>Total Traffic</span>
                </div>
                <div className="font-serif text-5xl font-bold mb-1" style={{color:'#93c5fd'}}>{totalViews}</div>
                <p className="text-[11px]" style={{color:'rgba(96,165,250,0.5)'}}>Page views across boutique</p>
              </div>
            </div>

            {/* WhatsApp Clicks */}
            <div className="relative rounded-3xl p-6 overflow-hidden" style={{
              background:'linear-gradient(135deg,#042A18 0%,#064028 100%)',
              border:'1px solid rgba(34,197,94,0.25)',
              boxShadow:'0 4px 32px rgba(34,197,94,0.08)'
            }}>
              <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at top right,rgba(34,197,94,0.1) 0%,transparent 65%)'}} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl relative" style={{background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.25)'}}>
                    <MessageCircle className="w-4 h-4" style={{color:'#4ade80'}} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold" style={{color:'rgba(74,222,128,0.7)'}}>WhatsApp Leads</span>
                </div>
                <div className="font-serif text-5xl font-bold mb-1" style={{color:'#4ade80'}}>{totalWaClicks}</div>
                <p className="text-[11px]" style={{color:'rgba(74,222,128,0.5)'}}>Customers chatted directly</p>
              </div>
            </div>

            {/* Form Consultations */}
            <div className="relative rounded-3xl p-6 overflow-hidden" style={{
              background:'linear-gradient(135deg,#2A1500 0%,#3D2000 100%)',
              border:'1px solid rgba(251,191,36,0.25)',
              boxShadow:'0 4px 32px rgba(251,191,36,0.08)'
            }}>
              <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at top right,rgba(251,191,36,0.1) 0%,transparent 65%)'}} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl" style={{background:'rgba(251,191,36,0.12)',border:'1px solid rgba(251,191,36,0.25)'}}>
                    <ShoppingBag className="w-4 h-4" style={{color:'#fbbf24'}} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold" style={{color:'rgba(251,191,36,0.7)'}}>Consultations</span>
                </div>
                <div className="font-serif text-5xl font-bold mb-1" style={{color:'#fcd34d'}}>{orders.length}</div>
                <p className="text-[11px]" style={{color:'rgba(251,191,36,0.5)'}}>{newOrdersCount} pending response</p>
              </div>
            </div>

            {/* Client Questions */}
            <div className="relative rounded-3xl p-6 overflow-hidden" style={{
              background:'linear-gradient(135deg,#18082A 0%,#220E38 100%)',
              border:'1px solid rgba(167,139,250,0.25)',
              boxShadow:'0 4px 32px rgba(167,139,250,0.08)'
            }}>
              <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at top right,rgba(167,139,250,0.1) 0%,transparent 65%)'}} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl" style={{background:'rgba(167,139,250,0.12)',border:'1px solid rgba(167,139,250,0.25)'}}>
                    <MessageSquare className="w-4 h-4" style={{color:'#a78bfa'}} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold" style={{color:'rgba(196,181,253,0.7)'}}>Q&amp;A Board</span>
                </div>
                <div className="font-serif text-5xl font-bold mb-1" style={{color:'#c4b5fd'}}>{comments.length}</div>
                <p className="text-[11px]" style={{color:'rgba(196,181,253,0.5)'}}>Questions from clients</p>
              </div>
            </div>

          </div>

          {/* ─── PAGE TRAFFIC + WHATSAPP SPLIT ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Page Traffic Distribution — Special Dark Design */}
            <div className="lg:col-span-5 rounded-3xl p-6 space-y-5" style={{
              background:'linear-gradient(160deg,#1A1A2A 0%,#12121E 100%)',
              border:'1px solid rgba(197,160,89,0.15)'
            }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl" style={{background:'rgba(197,160,89,0.1)',border:'1px solid rgba(197,160,89,0.2)'}}>
                  <TrendingUp className="w-4 h-4" style={{color:'#C5A059'}} />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold" style={{color:'#FAF8F5'}}>Page Traffic Split</h4>
                  <p className="text-[10px]" style={{color:'rgba(250,248,245,0.35)'}}>Which pages visitors view most</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Home Page', key: 'home', count: pageViews.home || 0, color: '#3b82f6', glow: 'rgba(59,130,246,0.25)' },
                  { name: 'Portfolio Gallery', key: 'shop', count: pageViews.shop || 0, color: '#a78bfa', glow: 'rgba(167,139,250,0.25)' },
                  { name: 'Contact & Studio', key: 'contact', count: pageViews.contact || 0, color: '#22c55e', glow: 'rgba(34,197,94,0.25)' },
                ].map((p) => {
                  const pct = totalViews > 0 ? Math.round((p.count / totalViews) * 100) : 0
                  return (
                    <div key={p.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{background:p.color,boxShadow:`0 0 6px ${p.glow}`}} />
                          <span className="text-xs font-semibold" style={{color:'rgba(250,248,245,0.8)'}}>{p.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold" style={{color:p.color}}>{p.count}</span>
                          <span className="text-[10px] font-mono" style={{color:'rgba(250,248,245,0.35)'}}>{pct}%</span>
                        </div>
                      </div>
                      <div className="w-full rounded-full h-2" style={{background:'rgba(255,255,255,0.05)'}}>
                        <div
                          className="h-full rounded-full progress-bar-animated"
                          style={{width:`${pct}%`,background:`linear-gradient(90deg,${p.color},${p.glow})`,boxShadow:`0 0 8px ${p.glow}`}}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Summary chips */}
              <div className="pt-4 border-t flex gap-3 flex-wrap" style={{borderColor:'rgba(197,160,89,0.1)'}}>
                <div className="flex flex-col items-center px-4 py-2.5 rounded-2xl flex-1" style={{background:'rgba(197,160,89,0.06)',border:'1px solid rgba(197,160,89,0.12)'}}>
                  <span className="font-serif text-xl font-bold gold-gradient-text">{totalViews}</span>
                  <span className="text-[9px] uppercase tracking-wider" style={{color:'rgba(197,160,89,0.5)'}}>Total Views</span>
                </div>
                <div className="flex flex-col items-center px-4 py-2.5 rounded-2xl flex-1" style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.12)'}}>
                  <span className="font-serif text-xl font-bold" style={{color:'#4ade80'}}>{totalWaClicks}</span>
                  <span className="text-[9px] uppercase tracking-wider" style={{color:'rgba(74,222,128,0.5)'}}>WA Leads</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Click Log Table — Premium */}
            <div className="lg:col-span-7 admin-glass-card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative p-2 rounded-xl" style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.15)'}}>
                    <MessageCircle className="w-4 h-4" style={{color:'#16a34a'}} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-ebony">WhatsApp Click Logs</h4>
                    <p className="text-[10px] text-gray-400">Every visitor-to-WhatsApp event is recorded here</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1.5 rounded-full" style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.15)',color:'#16a34a'}}>
                  {waLogs.length} Events
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr style={{borderBottom:'1px solid rgba(197,160,89,0.1)'}}>
                      <th className="pb-3 pr-4 text-[10px] uppercase tracking-wider font-bold" style={{color:'rgba(26,26,26,0.4)'}}>Time</th>
                      <th className="pb-3 pr-4 text-[10px] uppercase tracking-wider font-bold" style={{color:'rgba(26,26,26,0.4)'}}>Source</th>
                      <th className="pb-3 pr-4 text-[10px] uppercase tracking-wider font-bold" style={{color:'rgba(26,26,26,0.4)'}}>Product / Subject</th>
                      <th className="pb-3 text-[10px] uppercase tracking-wider font-bold text-right" style={{color:'rgba(26,26,26,0.4)'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-dark/20">
                    {waLogs.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <MessageCircle className="w-10 h-10 text-gray-200" />
                            <p className="text-gray-400 text-xs">No WhatsApp click events yet.</p>
                            <p className="text-gray-300 text-[10px]">Click any WhatsApp button on your public store to see it appear here live!</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      waLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-pearl/60 transition-colors">
                          <td className="py-3 pr-4">
                            <p className="font-bold text-ebony">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              {new Date(log.timestamp).toLocaleDateString('en-IN')}
                            </p>
                          </td>
                          <td className="py-3 pr-4">
                            <span className="inline-flex items-center gap-1.5 font-bold text-[10px] px-2.5 py-1 rounded-full" style={{background:'rgba(34,197,94,0.08)',color:'#15803d',border:'1px solid rgba(34,197,94,0.15)'}}>
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              {log.source}
                            </span>
                          </td>
                          <td className="py-3 pr-4 font-semibold text-ebony text-xs">
                            {log.product || 'General Studio Inquiry'}
                          </td>
                          <td className="py-3 text-right">
                            <a
                              href={`https://wa.me/${(settings.whatsapp_number || '+917708521531').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi! Following up on your inquiry about "${log.product || 'Custom Order'}" — how can Reshma Threads assist you?`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 font-bold text-[10px] px-3 py-1.5 rounded-xl transition-all hover:scale-105"
                              style={{background:'linear-gradient(135deg,#16a34a,#15803d)',color:'white',boxShadow:'0 2px 8px rgba(22,163,74,0.3)'}}
                            >
                              <MessageCircle className="w-3 h-3" />
                              Reply
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 3: CUSTOMER ORDER & CONSULTATION ENQUIRIES
      ══════════════════════════════════════ */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-sand-dark/60">
            <div>
              <h3 className="font-serif text-lg font-bold text-ebony">Customer Order Enquiries</h3>
              <p className="text-xs text-gray-500">Inquiries submitted via consultation forms & custom order requests.</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Filter Status:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-pearl border border-sand-dark rounded-xl px-3 py-1.5 text-xs font-semibold text-ebony focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="all">All Enquiries ({orders.length})</option>
                <option value="New">New ({orders.filter(o => o.status === 'New').length})</option>
                <option value="Contacted">Contacted</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-sand-dark/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-sand-light text-ebony uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Ref & Date</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Product Enquired</th>
                    <th className="p-4">Notes & Specifications</th>
                    <th className="p-4">Status Workflow</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-dark/40">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-400">
                        No customer enquiries found for this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-pearl/50">
                        <td className="p-4">
                          <span className="font-bold text-gold">{ord.order_ref}</span> <br />
                          <span className="text-[10px] text-gray-400">
                            {new Date(ord.created_at || Date.now()).toLocaleDateString('en-IN')}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-ebony">{ord.customer_name}</span> <br />
                          <span className="text-brown font-semibold">{ord.customer_phone}</span> <br />
                          <span className="text-[10px] text-gray-400">{ord.customer_email || 'No email'}</span>
                        </td>
                        <td className="p-4 font-semibold text-ebony">
                          {ord.product_name} <br />
                          <span className="text-xs text-gold">₹{Number(ord.product_price).toLocaleString('en-IN')}</span>
                        </td>
                        <td className="p-4 text-gray-600 max-w-xs leading-relaxed">
                          {ord.notes || 'No specific notes'}
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold border cursor-pointer ${
                              ord.status === 'New' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                              ord.status === 'Contacted' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                              ord.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-gray-100 text-gray-800 border-gray-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <a
                            href={`https://wa.me/${(ord.customer_phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${ord.customer_name}! Thanking you for reaching out to Reshma Threads Studio regarding "${ord.product_name}". How can we assist you with customization?`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2 px-3 rounded-xl shadow-sm transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Reply</span>
                          </a>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete enquiry ${ord.order_ref}?`)) deleteOrder(ord.id)
                            }}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-all"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 4: CLIENT QUESTIONS & BOARD (COMMENTS)
      ══════════════════════════════════════ */}
      {activeTab === 'comments' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="bg-white p-6 rounded-3xl border border-sand-dark/60 shadow-sm space-y-2">
            <h3 className="font-serif text-2xl font-bold text-ebony">Client Questions & Board</h3>
            <p className="text-xs text-gray-500 font-light">
              Questions asked by visitors on the public inquiry board. Publish studio replies to show on the website!
            </p>
          </div>

          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-sand-dark/60 text-gray-400">
                No questions submitted by clients yet.
              </div>
            ) : (
              comments.map((comm) => (
                <div key={comm.id} className="bg-white p-6 rounded-3xl border border-sand-dark/60 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand-dark/40 pb-3">
                    <div>
                      <span className="font-bold text-ebony text-sm">{comm.name}</span>
                      {comm.email && <span className="text-xs text-gray-400 ml-2">({comm.email})</span>}
                      <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full ml-3 border border-gold/20">
                        Code: {comm.design_code || 'General'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-400">
                        {new Date(comm.created_at || Date.now()).toLocaleDateString('en-IN')}
                      </span>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this question?')) deleteComment(comm.id)
                        }}
                        className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-ebony/80 leading-relaxed font-medium bg-pearl p-4 rounded-2xl">
                    "{comm.message}"
                  </p>

                  {/* Published Reply Preview */}
                  {comm.reply ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-emerald-800">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Studio Reply Published:</span>
                      </div>
                      <p className="pl-6 text-emerald-800">{comm.reply}</p>
                    </div>
                  ) : null}

                  {/* Reply Input Form */}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder={comm.reply ? "Update published reply..." : "Type official studio reply here..."}
                      value={replyInput[comm.id] || ''}
                      onChange={(e) => setReplyInput({ ...replyInput, [comm.id]: e.target.value })}
                      className="flex-1 bg-pearl border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                    />
                    <button
                      onClick={() => handleReplySubmit(comm.id)}
                      className="bg-gold hover:bg-gold-light text-ebony font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{comm.reply ? 'Update Reply' : 'Publish Reply'}</span>
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 5: MANAGE PRODUCTS
      ══════════════════════════════════════ */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-sand-dark/60">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-pearl border border-sand-dark rounded-xl pl-9 pr-4 py-2 text-xs text-ebony focus:outline-none focus:border-gold"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={openAddProductModal}
              className="w-full sm:w-auto bg-gold hover:bg-gold-light text-ebony font-bold text-xs py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-sand-dark/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-sand-light text-ebony uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Image</th>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">SKU Code</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-dark/40">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-pearl/50">
                      <td className="p-4">
                        <img
                          src={product.images?.[0] || '/lavender_collection_set.jpg'}
                          alt={product.name}
                          className="w-12 h-14 object-cover object-top rounded-xl border border-sand-dark"
                        />
                      </td>
                      <td className="p-4 font-serif font-bold text-sm text-ebony">
                        {product.name} <br />
                        <span className="text-[10px] font-sans font-normal text-brown">{product.sku}</span>
                      </td>
                      <td className="p-4 font-medium text-gray-600">{product.category_name}</td>
                      <td className="p-4 font-mono font-bold text-gold">{product.sku}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          product.stock_quantity > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {product.stock_quantity > 0 ? `${product.stock_quantity} units` : 'Out of stock'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => saveProduct({ ...product, is_featured: !product.is_featured })}
                          className={`p-1.5 rounded-lg border transition-all ${
                            product.is_featured ? 'bg-gold/20 border-gold text-gold-dark' : 'bg-gray-50 border-gray-200 text-gray-400'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className={`w-4 h-4 ${product.is_featured ? 'fill-gold' : ''}`} />
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openEditProductModal(product)}
                          className="p-2 rounded-xl bg-sand hover:bg-gold hover:text-ebony text-ebony transition-all"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${product.name}"?`)) deleteProduct(product.id)
                          }}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-all"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 6: MANAGE CATEGORIES
      ══════════════════════════════════════ */}
      {activeTab === 'categories' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-sand-dark/60">
            <h3 className="font-serif text-lg font-bold text-ebony">Product Collections & Categories</h3>
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="bg-gold hover:bg-gold-light text-ebony font-bold text-xs py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-3xl p-5 border border-sand-dark/60 shadow-sm space-y-3 relative flex flex-col justify-between">
                <div className="space-y-3">
                  <img src={cat.image_url} alt={cat.name} className="w-full h-36 object-cover rounded-2xl" />
                  <h4 className="font-serif font-bold text-lg text-ebony">{cat.name}</h4>
                  <p className="text-xs text-gray-500 font-light">{cat.description}</p>
                </div>
                <div className="pt-3 border-t border-sand-dark flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-brown">
                    {products.filter(p => p.category_name === cat.name || p.category_id === cat.id).length} Products
                  </span>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete category "${cat.name}"?`)) deleteCategory(cat.id)
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 7: STORE SETTINGS
      ══════════════════════════════════════ */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-white p-8 rounded-3xl border border-sand-dark/60 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h3 className="font-serif text-2xl font-bold text-ebony">Studio Settings</h3>
            <p className="text-xs text-gray-500 font-light">Update contact numbers, studio address, and banner notices.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.target)
              updateStoreSettings({
                whatsapp_number: fd.get('whatsapp_number'),
                studio_phone: fd.get('studio_phone'),
                studio_email: fd.get('studio_email'),
                studio_address: fd.get('studio_address'),
                announcement_banner: fd.get('announcement_banner'),
                instagram_handle: fd.get('instagram_handle')
              })
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">WhatsApp Store Number *</label>
              <input
                type="text"
                name="whatsapp_number"
                defaultValue={settings.whatsapp_number}
                placeholder="+917708521531"
                className="w-full bg-pearl border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold font-bold"
              />
              <p className="text-[10px] text-gray-400 mt-1">All "Order on WhatsApp" buttons will route to this phone number.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Studio Phone</label>
                <input
                  type="text"
                  name="studio_phone"
                  defaultValue={settings.studio_phone}
                  className="w-full bg-pearl border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Studio Email</label>
                <input
                  type="email"
                  name="studio_email"
                  defaultValue={settings.studio_email}
                  className="w-full bg-pearl border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Studio Address</label>
              <textarea
                name="studio_address"
                rows="2"
                defaultValue={settings.studio_address}
                className="w-full bg-pearl border border-sand-dark rounded-xl p-3 text-xs text-ebony focus:outline-none focus:border-gold"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Announcement Top Banner Text</label>
              <input
                type="text"
                name="announcement_banner"
                defaultValue={settings.announcement_banner}
                className="w-full bg-pearl border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Instagram Handle</label>
              <input
                type="text"
                name="instagram_handle"
                defaultValue={settings.instagram_handle}
                placeholder="reshma_threads_studio"
                className="w-full bg-pearl border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-gold hover:bg-gold-light text-ebony text-xs font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Studio Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PRODUCT ADD/EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-ebony/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-pearl max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-gold/30 p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex justify-between items-center border-b border-sand-dark pb-4">
              <h3 className="font-serif text-2xl font-bold text-ebony">
                {editingProduct ? 'Edit Product Couture' : 'Publish New Product'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-2 rounded-full hover:bg-sand text-ebony">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Royal Champagne Gold Zari Silk Saree"
                  className="w-full bg-white border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={productForm.category_name}
                    onChange={(e) => setProductForm({ ...productForm, category_name: e.target.value })}
                    className="w-full bg-white border border-sand-dark rounded-xl px-3 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold font-semibold"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={productForm.stock_quantity}
                    onChange={(e) => setProductForm({ ...productForm, stock_quantity: e.target.value })}
                    placeholder="10"
                    className="w-full bg-white border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Description *</label>
                <textarea
                  required
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Detailed description of the garment, weaving process, and embroidery details..."
                  className="w-full bg-white border border-sand-dark rounded-xl p-3 text-xs text-ebony focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Fabric & Weave Info</label>
                  <input
                    type="text"
                    value={productForm.fabric_info}
                    onChange={(e) => setProductForm({ ...productForm, fabric_info: e.target.value })}
                    placeholder="e.g. Pure Mulberry Silk with Real Zari"
                    className="w-full bg-white border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Available Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={productForm.sizes}
                    onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                    placeholder="S, M, L, XL, Custom"
                    className="w-full bg-white border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Flags */}
              <div className="flex flex-wrap gap-6 pt-2 border-t border-sand-dark">
                <label className="flex items-center gap-2 text-xs font-semibold text-ebony cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_featured}
                    onChange={(e) => setProductForm({ ...productForm, is_featured: e.target.checked })}
                    className="accent-gold w-4 h-4 rounded"
                  />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-ebony cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_best_seller}
                    onChange={(e) => setProductForm({ ...productForm, is_best_seller: e.target.checked })}
                    className="accent-gold w-4 h-4 rounded"
                  />
                  <span>Best Seller Badge</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-ebony cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_new_arrival}
                    onChange={(e) => setProductForm({ ...productForm, is_new_arrival: e.target.checked })}
                    className="accent-gold w-4 h-4 rounded"
                  />
                  <span>New Arrival Badge</span>
                </label>
              </div>

              {/* Multi Image Upload Section */}
              <div className="space-y-3 pt-2 border-t border-sand-dark">
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider">
                  Product Images ({productForm.images.length})
                </label>

                {/* Upload File Input */}
                <div className="flex gap-2">
                  <label className="flex-1 bg-sand hover:bg-gold hover:text-ebony text-ebony text-xs font-semibold py-2.5 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-2 border border-sand-dark transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image Files</span>
                    <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                {/* Image URL Input */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Paste image URL..."
                    className="flex-1 bg-white border border-sand-dark rounded-xl px-3 py-2 text-xs text-ebony focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="bg-ebony text-gold text-xs font-semibold px-4 py-2 rounded-xl"
                  >
                    Add URL
                  </button>
                </div>

                {/* Thumbnails preview */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {productForm.images.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-20 rounded-xl overflow-hidden border border-gold group">
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full opacity-80 hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-sand-dark flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gold hover:bg-gold-light text-ebony font-bold text-xs py-3.5 rounded-xl shadow-md transition-all"
                >
                  {editingProduct ? 'Save Product Changes' : 'Publish Product to Store'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-6 bg-sand hover:bg-sand-dark text-ebony font-semibold text-xs py-3.5 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* CATEGORY ADD MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-ebony/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-pearl max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border border-gold/30 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-sand-dark pb-3">
              <h3 className="font-serif text-xl font-bold text-ebony">Add Category</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="p-1 rounded-full text-ebony">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="e.g. Indo-Western Gowns"
                  className="w-full bg-white border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows="2"
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  placeholder="Short description..."
                  className="w-full bg-white border border-sand-dark rounded-xl p-3 text-xs text-ebony focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Image URL</label>
                <input
                  type="url"
                  value={catForm.image_url}
                  onChange={(e) => setCatForm({ ...catForm, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-white border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-gold hover:bg-gold-light text-ebony font-bold text-xs py-3 rounded-xl shadow-md"
                >
                  Save Category
                </button>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 bg-sand text-ebony font-semibold text-xs py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
