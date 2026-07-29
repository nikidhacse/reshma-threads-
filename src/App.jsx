import React from 'react'
import { StoreProvider, useStore } from './context/StoreContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { QuickViewModal } from './components/QuickViewModal'
import { WishlistDrawer } from './components/WishlistDrawer'
import { SearchModal } from './components/SearchModal'
import { ToastNotification } from './components/ToastNotification'

const AppContent = () => {
  const { currentPage } = useStore()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'shop':
        return <ShopPage />
      case 'product':
        return <ProductDetailPage />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      case 'admin':
        return <AdminDashboard />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-pearl text-ebony">
      <Navbar />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />

      {/* Global Overlays & Notifications */}
      <QuickViewModal />
      <WishlistDrawer />
      <SearchModal />
      <ToastNotification />
    </div>
  )
}

export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}

export default App
