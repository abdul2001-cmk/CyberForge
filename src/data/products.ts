import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'electronics',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    colors: ['Black', 'White', 'Silver'],
    features: ['Noise Cancellation', '30-hour Battery', 'Quick Charge', 'Bluetooth 5.0'],
    specifications: {
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.0'
    },
    badge: 'sale'
  },
  {
    id: '2',
    name: 'Designer Leather Jacket',
    description: 'Handcrafted genuine leather jacket with modern design. Premium quality materials and expert craftsmanship.',
    price: 449.99,
    image: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fashion',
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown', 'Tan'],
    features: ['Genuine Leather', 'YKK Zippers', 'Lined Interior', 'Multiple Pockets'],
    badge: 'bestseller'
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smartphone connectivity. Track your health goals.',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'electronics',
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    colors: ['Black', 'Silver', 'Rose Gold'],
    features: ['Heart Rate Monitor', 'GPS Tracking', '7-day Battery', 'Water Resistant'],
    badge: 'new'
  },
  {
    id: '4',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. Perfect for home office or study.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'home',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    colors: ['White', 'Black', 'Silver'],
    features: ['LED Technology', 'Touch Control', 'USB Charging Port', 'Adjustable Arm']
  },
  {
    id: '5',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt. Soft fabric with a perfect fit for everyday wear.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fashion',
    rating: 4.5,
    reviewCount: 78,
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray', 'Olive'],
    features: ['100% Organic Cotton', 'Pre-shrunk', 'Tagless', 'Machine Washable']
  },
  {
    id: '6',
    name: 'Professional Camera Lens',
    description: 'High-performance 50mm prime lens for professional photography. Sharp images with beautiful bokeh.',
    price: 899.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'electronics',
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    features: ['50mm f/1.4', 'Weather Sealed', 'Silent Autofocus', 'Professional Grade'],
    badge: 'limited'
  },
  {
    id: '7',
    name: 'Luxury Scented Candle',
    description: 'Hand-poured soy wax candle with premium fragrance. Creates a warm and inviting atmosphere.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'home',
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    colors: ['Vanilla', 'Lavender', 'Sandalwood', 'Citrus'],
    features: ['Soy Wax', '40-hour Burn Time', 'Lead-free Wick', 'Reusable Container']
  },
  {
    id: '8',
    name: 'Running Sneakers',
    description: 'Lightweight running shoes with advanced cushioning and breathable mesh upper. Perfect for daily runs.',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fashion',
    rating: 4.6,
    reviewCount: 145,
    inStock: true,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    colors: ['Black/White', 'Navy/Gray', 'Red/Black'],
    features: ['Breathable Mesh', 'Cushioned Sole', 'Lightweight', 'Durable Outsole'],
    badge: 'sale'
  }
];

export const categories = [
  { id: 'all', name: 'All Products', image: '', productCount: products.length },
  { id: 'electronics', name: 'Electronics', image: '', productCount: products.filter(p => p.category === 'electronics').length },
  { id: 'fashion', name: 'Fashion', image: '', productCount: products.filter(p => p.category === 'fashion').length },
  { id: 'home', name: 'Home & Living', image: '', productCount: products.filter(p => p.category === 'home').length }
];