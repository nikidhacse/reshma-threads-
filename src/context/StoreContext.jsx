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
      const [prodsData, catsData, ordsData, setsData, commsData] = await Promise.all([
        storeService.getProducts(),
        storeService.getCategories(),
        storeService.getOrders(),
        storeService.getSettings(),
        storeService.getComments()
      ])
      setProducts(prodsData)
      setCategories(catsData)
      setOrders(ordsData)
      setSettings(setsData)
      setComments(commsData)
    } catch (err) {
      console.error('Failed loading store data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Version-based cache bust: if data version changed, clear stale localStorage
    const DATA_VERSION = 'v4-admin-collections-comments'
    const storedVersion = localStorage.getItem('rts_data_version')
    if (storedVersion !== DATA_VERSION) {
      ;['rts_products', 'rts_categories', 'rts_orders', 'rts_settings'].forEach(k => localStorage.removeItem(k))
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

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      orders,
      comments,
      settings,
      wishlist,
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
      submitOrder,
      updateOrderStatus,
      updateStoreSettings,
      refreshData
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
