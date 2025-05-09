import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../context/ThemeContext'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {
  const { theme } = useTheme()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }
  
  const handleAddToWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      toast.info('Please login to add items to your wishlist')
      return
    }
    
    // Handle wishlist addition (will be implemented in context)
    toast.success('Product added to wishlist')
  }

  // Calculate discount percentage
  const discountPercentage = product.mrp && product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0
  
  return (
    <Link 
      to={`/products/${product._id}`}
      className={`product-card block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all ${
        theme === 'dark' ? 'card-dark' : 'card-light'
      }`}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-accent-500 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
        {discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-secondary-500 text-white text-xs px-2 py-1 rounded">
            {discountPercentage}% OFF
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2 bg-black bg-opacity-50 text-white">
          <button 
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
            className="text-white hover:text-secondary-500 transition-colors"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button 
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="text-white hover:text-secondary-500 transition-colors"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-sm mb-1 line-clamp-2 h-10">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-1">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon 
                key={i} 
                icon={faStar} 
                className={i < Math.floor(product.rating) 
                  ? "text-warning-500 text-xs" 
                  : "text-gray-300 dark:text-gray-600 text-xs"} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.numReviews})
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="font-bold text-md mr-2">
            ${product.price}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
              ${product.mrp}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard