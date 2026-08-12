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
  },
  {
    id: 'prod-spec-001',
    name: 'Rani Magenta Hand-Embroidered Lattice Sequin Lehenga & Organza Dupatta Set',
    slug: 'rani-magenta-hand-embroidered-lattice-sequin-lehenga-set',
    category_id: 'cat-1',
    category_name: 'Signature Collections',
    description: 'An opulent studio masterpiece creation featuring a vibrant Rani Magenta sheer-neck blouse meticulously embroidered with hand-sewn silver lattice grid sequin work, geometric bead piping, and full-length embellished sleeves. Paired with a cascading, weightless organza flare lehenga skirt and delicate matching sheer net dupatta trimmed with hand-crafted gold zari lace.',
    fabric_info: 'Premium Silk Organza Flare + Sheer Net Blouse Base with Hand Lattice Sequin & Zari Embroidery',
    care_instructions: 'Dry clean only. Store wrapped in cotton garment bag.',
    sizes: ['Bespoke Custom Tailored to Your Measurements'],
    colors: ['Rani Magenta Pink & Silver Sequin'],
    stock_quantity: 3,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    is_special_edition: true,
    sku: 'RTS-SPEC-001',
    images: [
      '/special_magenta_lehenga.jpg'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-spec-002',
    name: 'Royal Crimson & Ivory Heritage Silk Langa Voni (Half-Saree) Set',
    slug: 'royal-crimson-ivory-heritage-silk-langa-voni-half-saree-set',
    category_id: 'cat-1',
    category_name: 'Signature Collections',
    description: 'A timeless South Indian luxury heritage piece featuring an elegant ivory silk pleated skirt bordered with rich crimson zari weaving. Paired with a royal crimson raw silk blouse detailing heavy gold brocade zari woven sleeves, and draped gracefully with a traditional tasselled crimson silk voni (dupatta) with gold lace borders.',
    fabric_info: 'Pure Ivory Silk Base + Crimson Brocade Zari Sleeves & Hand-Crafted Tasselled Silk Voni',
    care_instructions: 'Dry clean only. Store wrapped in saree muslin bag.',
    sizes: ['Custom Tailored Blouse + Pleated Skirt'],
    colors: ['Royal Crimson Maroon & Ivory Silk'],
    stock_quantity: 4,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    is_special_edition: true,
    sku: 'RTS-SPEC-002',
    images: [
      '/special_crimson_halfsaree.jpg'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-sig-002',
    name: 'Deep Maroon & Gold Zari Handfolded Kanjivaram Silk Saree',
    slug: 'deep-maroon-gold-zari-kanjivaram-silk-saree',
    category_id: 'cat-1',
    category_name: 'Signature Collections',
    description: 'Regal deep maroon Kanjivaram silk saree featuring intricate gold lotus motif butas woven across the body, crisp fan-pleated fold, and a heavy gold zari border.',
    fabric_info: 'Pure Kanjivaram Silk + Fine Gold Zari Weave',
    care_instructions: 'Dry clean only. Store wrapped in cotton saree muslin bag.',
    sizes: ['Custom Saree Pre-Pleating Available'],
    colors: ['Deep Maroon & Gold Zari'],
    stock_quantity: 3,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    sku: 'RTS-SIG-002',
    images: [
      '/maroon_kanjivaram_1.jpg',
      '/maroon_kanjivaram_2.jpg'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-blouse-001',
    name: 'Sea Green Silk Blouse with Gold Beadwork & Floral Buttis',
    slug: 'sea-green-silk-blouse-gold-beadwork',
    category_id: 'cat-2',
    category_name: 'Bridal Blouses',
    description: 'A charming sea-green raw silk blouse crafted with an elegant deep round back neck bordered in gold beaded piping and delicately scattered gold lotus buttis across the body.',
    fabric_info: 'Pure Raw Silk Base + Hand Gold Beadwork & Zari Embroidery',
    care_instructions: 'Dry clean only.',
    sizes: ['Bespoke Custom Tailored to Your Measurements'],
    colors: ['Sea Green & Gold'],
    stock_quantity: 5,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    sku: 'RTS-BL-001',
    images: [
      '/mint_green_blouse_back.jpg'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-blouse-002',
    name: 'Peacock Blue Silk Blouse with Zardozi Border & Hanging Crystal Tassels',
    slug: 'peacock-blue-silk-blouse-zardozi-tassels',
    category_id: 'cat-2',
    category_name: 'Bridal Blouses',
    description: 'An exquisite peacock blue raw silk bridal blouse featuring a grand U-cut back framed by heavy floral gold zardozi embroidery, emerald bead strands, and hanging crystal tassels.',
    fabric_info: 'Pure Raw Silk Base + Hand Zardozi, Kundan & Emerald Crystal Tassels',
    care_instructions: 'Dry clean only.',
    sizes: ['Bespoke Custom Tailored to Your Measurements'],
    colors: ['Peacock Blue & Gold Zardozi'],
    stock_quantity: 5,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    sku: 'RTS-BL-002',
    images: [
      '/peacock_blue_blouse_back.jpg'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-new-001',
    name: 'Royal Crimson & Champagne Cream Silk Tasselled Half-Saree Set',
    slug: 'royal-crimson-champagne-cream-silk-tasselled-half-saree-set',
    category_id: 'cat-1',
    category_name: 'Signature Collections',
    description: 'Exclusive boutique half-saree creation featuring a cascading champagne gold pleated silk skirt bordered with traditional crimson zari weaving, paired with a matching zari brocade blouse and draped with a rich crimson silk voni trimmed with handcrafted dual-tone tassels.',
    fabric_info: 'Pure Champagne Silk Base + Zari Brocade Blouse + Hand-Tasselled Crimson Silk Voni',
    care_instructions: 'Dry clean only. Store wrapped in cotton saree bag.',
    sizes: ['Custom Tailored Blouse + Pleated Skirt'],
    colors: ['Royal Crimson & Champagne Gold'],
    stock_quantity: 4,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    sku: 'RTS-HS-003',
    images: [
      '/crimson_gold_tassel_halfsaree.jpg'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-new-002',
    name: 'Rani Pink & Fine Gold Zari Ready-to-Drape Pre-Pleated Kanjivaram Silk Saree',
    slug: 'rani-pink-fine-gold-zari-prepleated-kanjivaram-silk-saree',
    category_id: 'cat-4',
    category_name: 'Saree Pre-Pleating',
    description: 'Luxury Kanjivaram silk saree in vibrant Rani Pink woven with all-over gold floral buttas and heavy gold zari border. Masterfully pre-pleated and box-folded so you can drape in under 60 seconds!',
    fabric_info: 'Pure Kanjivaram Silk Saree + Professional Box-Folding & Pleat Setting',
    care_instructions: 'Dry clean only. Hang on standard saree hanger.',
    sizes: ['Ready-to-Drape Pre-Pleated Saree'],
    colors: ['Rani Pink & Gold Zari'],
    stock_quantity: 6,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    sku: 'RTS-PRE-002',
    images: [
      '/prepleated_pink_gold_saree.jpg'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-new-003',
    name: 'Peacock Blue & Maroon Heritage Silk Langa Voni Set',
    slug: 'peacock-blue-maroon-heritage-silk-langa-voni-set',
    category_id: 'cat-1',
    category_name: 'Signature Collections',
    description: 'A traditional South Indian heritage half-saree ensemble worn by our founder, combining a deep maroon pleated silk skirt with heavy gold zari borders, maroon brocade blouse, and a draped peacock teal silk dupatta.',
    fabric_info: 'Pure Maroon Brocade Silk + Peacock Teal Dupatta with Zari Lace Border',
    care_instructions: 'Dry clean only.',
    sizes: ['Custom Tailored Blouse + Pleated Skirt'],
    colors: ['Peacock Teal & Deep Maroon'],
    stock_quantity: 4,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    sku: 'RTS-HS-004',
    images: [
      '/peacock_maroon_halfsaree_model.jpg'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-new-004',
    name: 'Rani Magenta Silk Blouse with Gold Grid Sequin & Emerald Bead Tassels',
    slug: 'rani-magenta-silk-blouse-gold-grid-sequin-emerald-tassels',
    category_id: 'cat-2',
    category_name: 'Bridal Blouses',
    description: 'Opulent magenta silk Aari blouse designed with an intricate diamond lattice grid of gold sequins, Kundan floral centers, emerald green thread highlights, and hanging crystal bead tassels along the waistline.',
    fabric_info: 'Pure Raw Silk Base + Hand Zardozi, Sequin Grid, Kundan & Emerald Bead Tassels',
    care_instructions: 'Dry clean only.',
    sizes: ['Bespoke Custom Tailored to Your Measurements'],
    colors: ['Rani Magenta & Gold Emerald'],
    stock_quantity: 5,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    sku: 'RTS-BL-003',
    images: [
      '/magenta_gold_grid_blouse.jpg'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-new-005',
    name: 'Charcoal Grey Satin Silk Blouse with Bow-Tie Back & Pearl Edging',
    slug: 'charcoal-grey-satin-silk-blouse-bow-tie-back-pearl-edging',
    category_id: 'cat-3',
    category_name: 'Aari & Cut-Work',
    description: 'Modern luxury fusion blouse in rich charcoal grey satin featuring a geometric V-cut open back trimmed with fine pearl piping and tied with a chic bow accent anchored by a pearl brooch.',
    fabric_info: 'High-Lustre Satin Silk Base + Fine Hand Pearl Beading & Brooch Accent',
    care_instructions: 'Dry clean only.',
    sizes: ['Bespoke Custom Tailored to Your Measurements'],
    colors: ['Charcoal Grey & White Pearl'],
    stock_quantity: 5,
    in_stock: true,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    sku: 'RTS-BL-004',
    images: [
      '/charcoal_grey_pearl_blouse.jpg'
    ],
    created_at: new Date().toISOString()
  }
]

const INITIAL_ORDERS = []

const INITIAL_COMMENTS = []

const INITIAL_SETTINGS = {
  whatsapp_number: '+917708521531',
  studio_email: 'reshmathreadsstudio@gmail.com',
  studio_phone: '+91 77085 21531',
  studio_address: 'Chennai, Tamil Nadu, India — DM for studio appointment',
  announcement_banner: '✨ Flagship Collection Live: Royal Lavender Silk Saree & Cut-Work Blouse Set • Pan India Shipping',
  instagram_handle: 'reshma_threads_studio'
}

const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(`rts_${key}`)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(`rts_${key}`, JSON.stringify(value))
  } catch (err) {
    console.error('LocalStorage write failed:', err)
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
        console.warn('Supabase product fetch failed, fallback to local storage:', err)
      }
    }
    return getStorageItem('products', INITIAL_PRODUCTS)
  },

  async getProductBySlug(slug) {
    const prods = await this.getProducts()
    return prods.find(p => p.slug === slug) || prods[0] || null
  },

  async saveProduct(productData) {
    const isEdit = !!productData.id
    const newProduct = {
      ...productData,
      id: productData.id || `prod-${Date.now()}`,
      slug: productData.slug || (productData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      created_at: productData.created_at || new Date().toISOString()
    }

    if (isSupabaseConfigured) {
      try {
        if (isEdit) {
          await supabase.from('products').update(newProduct).eq('id', newProduct.id)
        } else {
          await supabase.from('products').insert([newProduct])
        }
      } catch (err) {
        console.warn('Supabase save product failed:', err)
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
        const { data, error } = await supabase.from('categories').select('*')
        if (!error && data && data.length > 0) return data
      } catch (err) {
        console.warn('Supabase categories fetch failed:', err)
      }
    }
    return getStorageItem('categories', INITIAL_CATEGORIES)
  },

  async saveCategory(categoryData) {
    const isEdit = !!categoryData.id
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

  // --- VISITOR COMMENTS & QUESTIONS ---
  async getComments() {
    return getStorageItem('comments', INITIAL_COMMENTS)
  },

  async addComment(commentData) {
    const newComment = {
      id: `c-${Date.now()}`,
      name: commentData.name || 'Boutique Visitor',
      email: commentData.email || '',
      message: commentData.message,
      design_code: commentData.design_code || 'General Query',
      reply: null,
      created_at: new Date().toISOString()
    }
    const currentList = getStorageItem('comments', INITIAL_COMMENTS)
    const updatedList = [newComment, ...currentList]
    setStorageItem('comments', updatedList)
    return newComment
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
    const settings = getStorageItem('settings', INITIAL_SETTINGS)
    if (!settings.whatsapp_number || settings.whatsapp_number.includes('9003539707') || settings.whatsapp_number.includes('9876543210')) {
      settings.whatsapp_number = '+917708521531'
      setStorageItem('settings', settings)
    }
    if (!settings.studio_phone || settings.studio_phone.includes('90035') || settings.studio_phone.includes('98765')) {
      settings.studio_phone = '+91 77085 21531'
      setStorageItem('settings', settings)
    }
    return settings
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
    
    let message = `Hi Reshma Threads Studio! 👋\n\nI saw this design on your website:\n✨ *Design:* ${product.name}\n🏷️ *Ref Code:* #${designCode}\n`

    if (customDetails.angle) {
      message += `🔍 *View Angle:* ${customDetails.angle}\n`
    }
    if (customDetails.notes) {
      message += `📝 *Notes:* ${customDetails.notes}\n`
    }

    message += `\nHow much will it be to recreate this? Please guide me!`
    
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${rawNumber}?text=${encodedMessage}`
  },

  // --- ANALYTICS & VISITOR TRACKING ---
  async getAnalytics() {
    return getStorageItem('analytics', {
      totalPageViews: 0,
      pageViews: {
        home: 0,
        shop: 0,
        contact: 0,
        about: 0
      },
      whatsappClicks: {
        total: 0,
        bySource: {},
        logs: []
      },
      productViews: {}
    })
  },

  async trackPageView(pageName) {
    const current = await this.getAnalytics()
    const pageKey = pageName || 'home'
    const updated = {
      ...current,
      totalPageViews: (current.totalPageViews || 0) + 1,
      pageViews: {
        ...current.pageViews,
        [pageKey]: ((current.pageViews && current.pageViews[pageKey]) || 0) + 1
      }
    }
    setStorageItem('analytics', updated)
    return updated
  },

  async trackWhatsAppClick(source = 'Website Link', productName = null) {
    const current = await this.getAnalytics()
    const whatsappData = current.whatsappClicks || { total: 0, bySource: {}, logs: [] }
    const newLog = {
      id: `w-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      source: source || 'Website Link',
      product: productName || 'General Studio Inquiry',
      timestamp: new Date().toISOString()
    }
    
    const updated = {
      ...current,
      whatsappClicks: {
        total: (whatsappData.total || 0) + 1,
        bySource: {
          ...whatsappData.bySource,
          [source]: ((whatsappData.bySource && whatsappData.bySource[source]) || 0) + 1
        },
        logs: [newLog, ...(whatsappData.logs || [])].slice(0, 100)
      }
    }
    setStorageItem('analytics', updated)
    return updated
  },

  async trackProductView(productId) {
    if (!productId) return
    const current = await this.getAnalytics()
    const productViews = current.productViews || {}
    const updated = {
      ...current,
      productViews: {
        ...productViews,
        [productId]: (productViews[productId] || 0) + 1
      }
    }
    setStorageItem('analytics', updated)
    return updated
  },

  async replyComment(commentId, replyText) {
    const currentList = getStorageItem('comments', INITIAL_COMMENTS)
    const updatedList = currentList.map(c => c.id === commentId ? { ...c, reply: replyText } : c)
    setStorageItem('comments', updatedList)
    return updatedList
  },

  async deleteComment(commentId) {
    const currentList = getStorageItem('comments', INITIAL_COMMENTS)
    const updatedList = currentList.filter(c => c.id !== commentId)
    setStorageItem('comments', updatedList)
    return updatedList
  },

  async deleteOrder(orderId) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('orders').delete().eq('id', orderId)
      } catch (err) {
        console.warn('Supabase delete order failed:', err)
      }
    }
    const currentList = getStorageItem('orders', INITIAL_ORDERS)
    const updatedList = currentList.filter(o => o.id !== orderId)
    setStorageItem('orders', updatedList)
    return true
  },

  async resetAnalytics() {
    const resetData = {
      totalPageViews: 0,
      pageViews: {},
      whatsappClicks: { total: 0, bySource: {}, logs: [] },
      productViews: {}
    }
    setStorageItem('analytics', resetData)
    return resetData
  }
}

