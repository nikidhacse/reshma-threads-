-- ===================================================
-- RESHMA THREADS STUDIO - SUPABASE DATABASE SCHEMA
-- ===================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category_name VARCHAR(255),
  description TEXT NOT NULL,
  fabric_info TEXT,
  care_instructions TEXT,
  sizes TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL'],
  colors TEXT[] DEFAULT ARRAY['Gold', 'Beige', 'Ivory'],
  stock_quantity INT DEFAULT 10,
  in_stock BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT true,
  images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  sku VARCHAR(100) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Customer Orders / Enquiries Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_ref VARCHAR(50) NOT NULL UNIQUE,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_email VARCHAR(255),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  selected_size VARCHAR(50),
  selected_color VARCHAR(50),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'New', -- 'New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'
  channel VARCHAR(50) DEFAULT 'WhatsApp', -- 'WhatsApp' or 'Website Form'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Studio Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY DEFAULT 1,
  whatsapp_number VARCHAR(50) DEFAULT '+917708521531',
  studio_email VARCHAR(255) DEFAULT 'contact@reshmathreads.com',
  studio_address TEXT DEFAULT '102 Luxury Fashion Boulevard, Jubilee Hills, Hyderabad',
  announcement_banner TEXT DEFAULT '✨ Complimentary Custom Tailoring on Orders above ₹15,000',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Settings Row
INSERT INTO settings (id, whatsapp_number, studio_email, studio_address, announcement_banner)
VALUES (1, '+917708521531', 'contact@reshmathreads.com', '102 Luxury Fashion Boulevard, Jubilee Hills, Hyderabad', '✨ Complimentary Custom Tailoring on Orders above ₹15,000')
ON CONFLICT (id) DO NOTHING;

-- 6. Storage Bucket for Product Images
-- In Supabase Dashboard -> Storage -> Create public bucket "product-images"
-- RLS policies for storage:
-- Allow Public Read Access to "product-images"
-- Allow Authenticated Users (Admins) Insert/Update/Delete access.
