import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { useTheme } from '../../context/ThemeContext'
import api from '../../utils/api'

// Fallback products in case the API isn't ready
const fallbackProducts = [
  {
    _id: '1',
    name: 'iPhone 14 Pro Max',
    description: 'Apple iPhone 14 Pro Max with Super Retina XDR display',
    price: 1099.00,
    mrp: 1199.00,
    image: 'https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    brand: 'Apple',
    rating: 4.8,
    numReviews: 142,
    countInStock: 15,
    isNew: true,
  },
  {
    _id: '2',
    name: 'Samsung 55" QLED 4K Smart TV',
    description: 'Samsung 55" QLED 4K UHD Smart TV with Quantum HDR',
    price: 799.99,
    mrp: 999.99,
    image: 'https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    brand: 'Samsung',
    rating: 4.6,
    numReviews: 78,
    countInStock: 8,
    isNew: false,
  },
  {
    _id: '3',
    name: 'Nike Air Max 270',
    description: 'Nike Air Max 270 running shoes with air cushioning',
    price: 150.00,
    mrp: 180.00,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'fashion',
    brand: 'Nike',
    rating: 4.5,
    numReviews: 215,
    countInStock: 20,
    isNew: false,
  },
  {
    _id: '4',
    name: 'Amazon Echo Dot (5th Gen)',
    description: 'Smart speaker with Alexa',
    price: 49.99,
    mrp: 59.99,
    image: 'https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    brand: 'Amazon',
    rating: 4.7,
    numReviews: 185,
    countInStock: 30,
    isNew: true,
  },
  {
    _id: '5',
    name: 'Instant Pot Duo 7-in-1',
    description: 'Electric pressure cooker, slow cooker, rice cooker, steamer, and more',
    price: 99.95,
    mrp: 129.95,
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'home',
    brand: 'Instant Pot',
    rating: 4.9,
    numReviews: 321,
    countInStock: 12,
    isNew: false,
  },
  {
    _id: '6',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Wireless noise cancelling headphones',
    price: 349.99,
    mrp: 399.99,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    brand: 'Sony',
    rating: 4.8,
    numReviews: 156,
    countInStock: 7,
    isNew: true,
  },
  {
    _id: '7',
    name: 'Apple Watch Series 8',
    description: 'GPS + Cellular, 45mm aluminum case',
    price: 499.00,
    mrp: 529.00,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    brand: 'Apple',
    rating: 4.7,
    numReviews: 89,
    countInStock: 15,
    isNew: true,
  },
  {
    _id: '8',
    name: 'Levi\'s 501 Original Fit Jeans',
    description: 'Classic straight leg jeans',
    price: 59.50,
    mrp: 69.50,
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'fashion',
    brand: 'Levi\'s',
    rating: 4.5,
    numReviews: 213,
    countInStock: 28,
    isNew: false,
  },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()
  
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await api.get('/api/products/featured')
  //       if (response.data) {
  //         setProducts(response.data)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching featured products:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   
  //   fetchProducts()
  // }, [])

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Featured Products
          </h2>
          <Link 
            to="/products" 
            className="text-primary-500 hover:text-primary-600 transition-colors font-medium"
          >
            View All
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts