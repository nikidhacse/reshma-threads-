import React, { createContext, useContext, useState, useEffect } from 'react'
import { storeService } from '../services/storeService'

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [comments, setComments] = useState([])
  const [settings, setSettings] = useState({})
  const [wishlist, setWishlist] = useState([])
  const [analytics, setAnalytics] = useState({
    totalPageViews: 0,
    pageViews: {},
    whatsappClicks: { total: 0, bySource: {}, logs: [] },
    productViews: {}
  })
  const [loading, setLoading] = useState(true)

  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProductSlug, setSelectedProductSlug] = useState(null)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals & UI overlays
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type })
    setTimeout(() => setToastMessage(null), 4000)
  }

  const refreshData = async () => {
    setLoading(true)
    try {
      const [prodsData, catsData, ordsData, setsData, commsData, analyticsData] = await Promise.all([
        storeService.getProducts(),
        storeService.getCategories(),
        storeService.getOrders(),
        storeService.getSettings(),
        storeService.getComments(),
        storeService.getAnalytics()
      ])
      setProducts(prodsData)
      setCategories(catsData)
      setOrders(ordsData)
      setSettings(setsData)
      setComments(commsData)
      setAnalytics(analyticsData)
    } catch (err) {
      console.error('Failed loading store data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Version-based cache bust: if data version changed, clear stale localStorage
    const DATA_VERSION = 'v9-added-5-new-boutique-photos'
    const storedVersion = localStorage.getItem('rts_data_version')
    if (storedVersion !== DATA_VERSION) {
      ;['rts_products', 'rts_categories', 'rts_orders', 'rts_comments', 'rts_analytics', 'rts_settings'].forEach(k => localStorage.removeItem(k))
      localStorage.setItem('rts_data_version', DATA_VERSION)
    }

    refreshData()

    // Load wishlist from local storage
    try {
      const savedWishlist = JSON.parse(localStorage.getItem('rts_wishlist') || '[]')
      setWishlist(savedWishlist)
    } catch (err) {
      console.error(err)
    }
  }, [])

  // Page view tracking effect
  useEffect(() => {
    storeService.trackPageView(currentPage).then(updated => {
      if (updated) setAnalytics(updated)
    })
  }, [currentPage])

  const trackWhatsAppClick = async (source, productName = null) => {
    const updated = await storeService.trackWhatsAppClick(source, productName)
    if (updated) setAnalytics(updated)
  }

  const trackProductView = async (productId) => {
    const updated = await storeService.trackProductView(productId)
    if (updated) setAnalytics(updated)
  }

  const toggleWishlist = (productId) => {
    let updated
    if (wishlist.includes(productId)) {
      updated = wishlist.filter(id => id !== productId)
      showToast('Removed from your wishlist', 'info')
    } else {
      updated = [...wishlist, productId]
      showToast('Added to your wishlist! ✨', 'success')
    }
    setWishlist(updated)
    localStorage.setItem('rts_wishlist', JSON.stringify(updated))
  }

  const isWishlisted = (productId) => wishlist.includes(productId)

  const navigateTo = (page, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (params.slug) setSelectedProductSlug(params.slug)
    if (params.category) setActiveCategoryFilter(params.category)
    if (params.search) setSearchQuery(params.search)
    setCurrentPage(page)
  }

  // --- ACTIONS ---
  const saveProduct = async (productData) => {
    const saved = await storeService.saveProduct(productData)
    await refreshData()
    showToast(productData.id ? 'Collection updated successfully' : 'New collection added to boutique showcase! ✨')
    return saved
  }

  const deleteProduct = async (id) => {
    await storeService.deleteProduct(id)
    await refreshData()
    showToast('Collection removed from catalog', 'info')
  }

  const saveCategory = async (catData) => {
    await storeService.saveCategory(catData)
    await refreshData()
    showToast('Category saved successfully')
  }

  const deleteCategory = async (id) => {
    await storeService.deleteCategory(id)
    await refreshData()
    showToast('Category deleted', 'info')
  }

  const postComment = async (commentData) => {
    const newComm = await storeService.addComment(commentData)
    await refreshData()
    showToast('Your question/comment has been submitted! Our studio will respond shortly. ✨')
    return newComm
  }

  const replyComment = async (commentId, replyText) => {
    await storeService.replyComment(commentId, replyText)
    await refreshData()
    showToast('Reply published to question board! ✨')
  }

  const deleteComment = async (commentId) => {
    await storeService.deleteComment(commentId)
    await refreshData()
    showToast('Question deleted', 'info')
  }

  const deleteOrder = async (orderId) => {
    await storeService.deleteOrder(orderId)
    await refreshData()
    showToast('Enquiry deleted', 'info')
  }

  const submitOrder = async (orderData) => {
    const newOrd = await storeService.createOrder(orderData)
    await refreshData()
    return newOrd
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    await storeService.updateOrderStatus(orderId, newStatus)
    await refreshData()
    showToast(`Order status updated to "${newStatus}"`)
  }

  const updateStoreSettings = async (newSets) => {
    await storeService.updateSettings(newSets)
    await refreshData()
    showToast('Studio settings saved!')
  }

  const resetAnalytics = async () => {
    const reset = await storeService.resetAnalytics()
    setAnalytics(reset)
    showToast('Analytics counters reset!')
  }

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      orders,
      comments,
      settings,
      wishlist,
      analytics,
      loading,
      currentPage,
      selectedProductSlug,
      activeCategoryFilter,
      searchQuery,
      quickViewProduct,
      isWishlistOpen,
      isSearchOpen,
      toastMessage,
      showToast,
      setQuickViewProduct,
      setIsWishlistOpen,
      setIsSearchOpen,
      setActiveCategoryFilter,
      setSearchQuery,
      navigateTo,
      toggleWishlist,
      isWishlisted,
      saveProduct,
      deleteProduct,
      saveCategory,
      deleteCategory,
      postComment,
      replyComment,
      deleteComment,
      deleteOrder,
      submitOrder,
      updateOrderStatus,
      updateStoreSettings,
      trackWhatsAppClick,
      trackProductView,
      resetAnalytics,
      refreshData
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
