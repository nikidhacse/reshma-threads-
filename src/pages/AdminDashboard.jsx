import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { 
  Shield, Key, Lock, LayoutDashboard, Package, FolderTree, ShoppingBag, Settings as SettingsIcon,
  Plus, Edit, Trash2, CheckCircle, Clock, Eye, MessageCircle, Upload, X, Star, Save, LogOut, Search, ExternalLink
} from 'lucide-react'

export const AdminDashboard = () => {
  const { 
    products, 
    categories, 
    orders, 
    settings, 
    saveProduct, 
    deleteProduct, 
    saveCategory, 
    deleteCategory, 
    updateOrderStatus, 
    updateStoreSettings, 
    showToast,
    navigateTo
  } = useStore()

  // Authentication Lock State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState(false)

  // Active Admin Tab State: 'overview', 'products', 'categories', 'orders', 'settings'
  const [activeTab, setActiveTab] = useState('overview')

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
      category_name: categories[0]?.name || 'Handcrafted Sarees',
      description: '',
      fabric_info: '',
      care_instructions: '',
      sizes: 'S, M, L, XL',
      colors: 'Gold, Ivory, Beige',
      stock_quantity: 10,
      is_featured: false,
      is_best_seller: false,
      is_new_arrival: true,
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop']
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

  // Multi Image File Upload Handler (Simulated Base64 / Supabase Image Upload)
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
      images: productForm.images.length > 0 ? productForm.images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop']
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
      image_url: catForm.image_url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'
    })
    setCatForm({ name: '', description: '', image_url: '' })
    setIsCategoryModalOpen(false)
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
              Enter your studio passcode to access management features.
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
              Return to Customer Shop
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
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">Studio Management Center</h1>
            <p className="text-xs text-gray-300 font-light">Reshma Threads Studio • Admin Portal</p>
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
      <div className="flex border-b border-sand-dark gap-2 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'categories', label: `Categories (${categories.length})`, icon: FolderTree },
          { id: 'orders', label: `Customer Enquiries (${orders.length})`, icon: ShoppingBag, badge: newOrdersCount },
          { id: 'settings', label: 'Store Settings', icon: SettingsIcon },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-ebony text-gold shadow-md'
                  : 'bg-white hover:bg-sand text-ebony border border-sand-dark/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="bg-gold text-ebony text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {tab.badge} New
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-sand-dark/60 shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brown">Total Products</span>
              <div className="font-serif text-4xl font-bold text-ebony">{products.length}</div>
              <p className="text-[11px] text-gray-500">{products.filter(p => p.is_featured).length} Featured items active</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sand-dark/60 shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brown">Categories</span>
              <div className="font-serif text-4xl font-bold text-ebony">{categories.length}</div>
              <p className="text-[11px] text-gray-500">Active product collections</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sand-dark/60 shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brown">Customer Enquiries</span>
              <div className="font-serif text-4xl font-bold text-ebony">{orders.length}</div>
              <p className="text-[11px] text-emerald-600 font-semibold">{newOrdersCount} New pending contact</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sand-dark/60 shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brown">WhatsApp Ordering</span>
              <div className="font-serif text-2xl font-bold text-emerald-700 truncate">{settings.whatsapp_number}</div>
              <p className="text-[11px] text-gray-500">Active store WhatsApp target</p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white p-6 rounded-3xl border border-sand-dark/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-ebony">Recent Customer Order Enquiries</h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-gold hover:underline"
              >
                View All Enquiries →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-sand-light text-ebony uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Requested Product</th>
                    <th className="p-3">Details</th>
                    <th className="p-3">Channel</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-dark/40">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-pearl/50">
                      <td className="p-3 font-bold text-gold">{ord.order_ref}</td>
                      <td className="p-3 font-semibold text-ebony">
                        {ord.customer_name} <br />
                        <span className="text-[10px] text-gray-400 font-normal">{ord.customer_phone}</span>
                      </td>
                      <td className="p-3 font-medium text-ebony">{ord.product_name}</td>
                      <td className="p-3 text-brown">Size: {ord.selected_size || 'N/A'}, Color: {ord.selected_color || 'N/A'}</td>
                      <td className="p-3 font-semibold text-gray-600">{ord.channel || 'WhatsApp'}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.status === 'New' ? 'bg-amber-100 text-amber-800' :
                          ord.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                          ord.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MANAGE PRODUCTS */}
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
                    <th className="p-4">Price</th>
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
                          src={product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=150&auto=format&fit=crop'}
                          alt={product.name}
                          className="w-12 h-14 object-cover object-top rounded-xl border border-sand-dark"
                        />
                      </td>
                      <td className="p-4 font-serif font-bold text-sm text-ebony">
                        {product.name} <br />
                        <span className="text-[10px] font-sans font-normal text-brown">{product.sku}</span>
                      </td>
                      <td className="p-4 font-medium text-gray-600">{product.category_name}</td>
                      <td className="p-4 font-bold text-ebony">₹{Number(product.price).toLocaleString('en-IN')}</td>
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

      {/* TAB 3: MANAGE CATEGORIES */}
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

      {/* TAB 4: VIEW CUSTOMER ORDERS & ENQUIRIES */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-sand-dark/60">
            <h3 className="font-serif text-lg font-bold text-ebony">Customer Order Enquiries</h3>

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
                    <th className="p-4">Size & Color</th>
                    <th className="p-4">Status Workflow</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-dark/40">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-pearl/50">
                      <td className="p-4">
                        <span className="font-bold text-gold">{ord.order_ref}</span> <br />
                        <span className="text-[10px] text-gray-400">
                          {new Date(ord.created_at || Date.now()).toLocaleDateString('en-IN')}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-ebony">{ord.customer_name}</span> <br />
                        <span className="text-brown">{ord.customer_phone}</span> <br />
                        <span className="text-[10px] text-gray-400">{ord.customer_email}</span>
                      </td>
                      <td className="p-4 font-semibold text-ebony">
                        {ord.product_name} <br />
                        <span className="text-xs text-gold">₹{Number(ord.product_price).toLocaleString('en-IN')}</span>
                      </td>
                      <td className="p-4 text-gray-600">
                        Size: <strong>{ord.selected_size || 'Std'}</strong> <br />
                        Color: <strong>{ord.selected_color || 'Std'}</strong>
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
                      <td className="p-4 text-right">
                        <a
                          href={`https://wa.me/${(ord.customer_phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${ord.customer_name}, thanking you for contacting Reshma Threads Studio regarding "${ord.product_name}". How can we assist you today?`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2 px-3 rounded-xl shadow-sm transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Reply WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: STORE SETTINGS */}
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
                placeholder="+919876543210"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="18500"
                    className="w-full bg-white border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.original_price}
                    onChange={(e) => setProductForm({ ...productForm, original_price: e.target.value })}
                    placeholder="22000"
                    className="w-full bg-white border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                  />
                </div>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ebony uppercase tracking-wider mb-1">Available Shades (Comma separated)</label>
                  <input
                    type="text"
                    value={productForm.colors}
                    onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                    placeholder="Champagne Gold, Ivory Cream, Beige"
                    className="w-full bg-white border border-sand-dark rounded-xl px-4 py-2.5 text-xs text-ebony focus:outline-none focus:border-gold"
                  />
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
