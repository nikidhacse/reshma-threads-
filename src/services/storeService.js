import { supabase, isSupabaseConfigured } from '../lib/supabase'

// ============================================================
// RESHMA THREADS STUDIO — BESPOKE BOUTIQUE & PORTFOLIO
// Instagram: @reshma_threads_studio | Chennai Based
// Specialty: Handcrafted Sarees | Cut-Work Aari Blouses | Saree Pre-Pleating
// ============================================================

const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Signature Collections',
    slug: 'signature-collections',
    description: 'Exclusive 2-piece boutique sets featuring pre-pleated designer sarees paired with custom handcrafted cut-work blouses.',
    image_url: '/lavender_collection_set.jpg'
  },
  {
    id: 'cat-2',
    name: 'Bridal Blouses',
    slug: 'bridal-blouses',
    description: 'Heavy bridal Aari & Maggam blouses customized to your measurements with mirror, pearl, and zardozi work.',
    image_url: '/lavender_blouse_backneck.jpg'
  },
  {
    id: 'cat-3',
    name: 'Aari & Cut-Work',
    slug: 'aari-cutwork',
    description: 'Intricate cut-work necklines, geometric back windows, and heavy silver brocade sleeve cuffs.',
    image_url: '/lavender_sleeve_cuff.jpg'
  },
  {
    id: 'cat-4',
    name: 'Saree Pre-Pleating',
    slug: 'saree-pre-pleating',
    description: 'Professional pre-pleating, box folding, and pin setting service — just drape and go!',
    image_url: '/lavender_pleated_saree.jpg'
  }
]

const INITIAL_PRODUCTS = [
  {
    id: 'prod-sig-001',
    name: 'Royal Lavender Kanjivaram Silk Saree & Handcrafted Cut-Work Aari Blouse Set',
    slug: 'royal-lavender-kanjivaram-silk-saree-cutwork-blouse-set',
    price: 8500,
    original_price: 10500,
    category_id: 'cat-1',
    category_name: 'Signature Collections',
    description: 'Exclusive signature boutique set featuring a pre-pleated Royal Lavender Kanjivaram silk saree with rich silver zari woven pallu and crisp pleats. Paired with a bespoke raw silk blouse highlighting a sweetheart window cut-work back neck studded with mirrors and white pearls, finished with silver brocade sleeve cuffs and double bead piping.',
    fabric_info: 'Pure Kanjivaram Brocade Silk Saree + Raw Silk Blouse Base with Hand Aari, Pearl & Mirror Embroidery',
    care_instructions: 'Dry clean only. Store wrapped in cotton saree muslin bag.',
    sizes: ['Custom Tailored Blouse + Pre-Pleated Saree'],
    colors: ['Royal Lavender & Silver Zari'],
    stock_quantity: 5,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    sku: 'RTS-SIG-001',
    images: [
      '/lavender_collection_set.jpg',
      '/lavender_blouse_backneck.jpg',
      '/lavender_sleeve_cuff.jpg',
      '/lavender_sleeve_detail.jpg',
      '/lavender_pleated_saree.jpg'
    ],
    created_at: new Date().toISOString()
  }
]

const INITIAL_ORDERS = [
  {
    id: 'ord-901',
    order_ref: 'RTS-2026-0901',
    customer_name: 'Samyuktha Ramesh',
    customer_phone: '+91 90035 39707',
    customer_email: 'samyuktha.r@example.com',
    product_id: 'prod-sig-001',
    product_name: 'Royal Lavender Kanjivaram Silk Saree & Handcrafted Cut-Work Blouse Set',
    product_price: 8500,
    selected_size: 'Custom Blouse Size 36',
    selected_color: 'Royal Lavender & Silver Zari',
    notes: 'Requested pre-pleated saree with custom sweetheart cut-work back blouse.',
    status: 'New',
    channel: 'WhatsApp',
    created_at: '2026-07-29T10:00:00Z'
  }
]

const INITIAL_SETTINGS = {
  whatsapp_number: '+919003539707',
  studio_email: 'reshmathreadsstudio@gmail.com',
  studio_phone: '+91 90035 39707',
  studio_address: 'Chennai, Tamil Nadu, India — DM for studio appointment',
  announcement_banner: '✨ Flagship Collection Live: Royal Lavender Silk Saree & Cut-Work Blouse Set • Pan India Shipping',
  instagram_handle: 'reshma_threads_studio'
}

const getStorageItem = (key, fallback) => {
  try {
    const data = localStorage.getItem(`rts_${key}`)
    return data ? JSON.parse(data) : fallback
  } catch (err) {
    console.error('Error reading localStorage:', err)
    return fallback
  }
}

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(`rts_${key}`, JSON.stringify(value))
  } catch (err) {
    console.error('Error writing localStorage:', err)
  }
}

export const storeService = {
  // --- PRODUCTS ---
  async getProducts() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
        if (!error && data && data.length > 0) return data
      } catch (err) {
        console.warn('Supabase fetch failed, using local store:', err)
      }
    }
    return getStorageItem('products', INITIAL_PRODUCTS)
  },

  async getProductBySlug(slug) {
    const products = await this.getProducts()
    return products.find(p => p.slug === slug || p.id === slug) || null
  },

  async saveProduct(productData) {
    const isEdit = Boolean(productData.id)
    const newProduct = {
      ...productData,
      id: productData.id || `prod-${Date.now()}`,
      slug: productData.slug || (productData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      sku: productData.sku || `RTS-SIG-${Math.floor(100 + Math.random() * 900)}`,
      created_at: productData.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (isSupabaseConfigured) {
      try {
        if (isEdit) {
          await supabase.from('products').update(newProduct).eq('id', newProduct.id)
        } else {
          await supabase.from('products').insert([newProduct])
        }
      } catch (err) {
        console.warn('Supabase product save failed:', err)
      }
    }

    const currentList = getStorageItem('products', INITIAL_PRODUCTS)
    const updatedList = isEdit
      ? currentList.map(p => p.id === newProduct.id ? newProduct : p)
      : [newProduct, ...currentList]

    setStorageItem('products', updatedList)
    return newProduct
  },

  async deleteProduct(productId) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').delete().eq('id', productId)
      } catch (err) {
        console.warn('Supabase delete product failed:', err)
      }
    }

    const currentList = getStorageItem('products', INITIAL_PRODUCTS)
    const updatedList = currentList.filter(p => p.id !== productId)
    setStorageItem('products', updatedList)
    return true
  },

  // --- CATEGORIES ---
  async getCategories() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('categories').select('*').order('name')
        if (!error && data && data.length > 0) return data
      } catch (err) {
        console.warn('Supabase categories fetch failed:', err)
      }
    }
    return getStorageItem('categories', INITIAL_CATEGORIES)
  },

  async saveCategory(categoryData) {
    const isEdit = Boolean(categoryData.id)
    const newCategory = {
      ...categoryData,
      id: categoryData.id || `cat-${Date.now()}`,
      slug: categoryData.slug || (categoryData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }

    if (isSupabaseConfigured) {
      try {
        if (isEdit) {
          await supabase.from('categories').update(newCategory).eq('id', newCategory.id)
        } else {
          await supabase.from('categories').insert([newCategory])
        }
      } catch (err) {
        console.warn('Supabase save category failed:', err)
      }
    }

    const currentList = getStorageItem('categories', INITIAL_CATEGORIES)
    const updatedList = isEdit 
      ? currentList.map(c => c.id === newCategory.id ? newCategory : c)
      : [...currentList, newCategory]

    setStorageItem('categories', updatedList)
    return newCategory
  },

  async deleteCategory(categoryId) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('categories').delete().eq('id', categoryId)
      } catch (err) {
        console.warn('Supabase delete category failed:', err)
      }
    }

    const currentList = getStorageItem('categories', INITIAL_CATEGORIES)
    const updatedList = currentList.filter(c => c.id !== categoryId)
    setStorageItem('categories', updatedList)
    return true
  },

  // --- ORDERS / ENQUIRIES ---
  async getOrders() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
        if (!error && data) return data
      } catch (err) {
        console.warn('Supabase orders fetch failed:', err)
      }
    }
    return getStorageItem('orders', INITIAL_ORDERS)
  },

  async createOrder(orderPayload) {
    const newOrder = {
      ...orderPayload,
      id: `ord-${Date.now()}`,
      order_ref: `RTS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'New',
      created_at: new Date().toISOString()
    }

    if (isSupabaseConfigured) {
      try {
        await supabase.from('orders').insert([newOrder])
      } catch (err) {
        console.warn('Supabase create order failed:', err)
      }
    }

    const currentList = getStorageItem('orders', INITIAL_ORDERS)
    const updatedList = [newOrder, ...currentList]
    setStorageItem('orders', updatedList)
    return newOrder
  },

  async updateOrderStatus(orderId, status) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('orders').update({ status }).eq('id', orderId)
      } catch (err) {
        console.warn('Supabase update order status failed:', err)
      }
    }

    const currentList = getStorageItem('orders', INITIAL_ORDERS)
    const updatedList = currentList.map(o => o.id === orderId ? { ...o, status } : o)
    setStorageItem('orders', updatedList)
    return true
  },

  // --- SETTINGS ---
  async getSettings() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('settings').select('*').single()
        if (!error && data) return data
      } catch (err) {
        console.warn('Supabase settings fetch failed:', err)
      }
    }
    return getStorageItem('settings', INITIAL_SETTINGS)
  },

  async updateSettings(newSettings) {
    const merged = { ...getStorageItem('settings', INITIAL_SETTINGS), ...newSettings }
    
    if (isSupabaseConfigured) {
      try {
        await supabase.from('settings').upsert({ id: 1, ...merged })
      } catch (err) {
        console.warn('Supabase update settings failed:', err)
      }
    }

    setStorageItem('settings', merged)
    return merged
  },

  // WhatsApp Inquiry Generator
  generateWhatsAppLink(whatsappNumber, product, customDetails = {}) {
    const rawNumber = (whatsappNumber || INITIAL_SETTINGS.whatsapp_number).replace(/[^0-9]/g, '')
    const designCode = product.sku || product.id || 'RTS-SIG-001'
    
    let message = `Hi Reshma Threads Studio! 👋\n\nI love your Flagship Boutique Collection!\n\n✨ *Collection:* ${product.name}\n🏷️ *Ref Code:* #${designCode}\n💰 *Price Guidance:* ₹${Number(product.price).toLocaleString('en-IN')}\n`

    if (customDetails.angle) {
      message += `🔍 *View Angle:* ${customDetails.angle}\n`
    }
    if (customDetails.notes) {
      message += `📝 *Notes:* ${customDetails.notes}\n`
    }

    message += `\nI'd like to place an order / discuss my blouse measurements and pre-pleating options. Please guide me!`
    
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${rawNumber}?text=${encodedMessage}`
  }
}
