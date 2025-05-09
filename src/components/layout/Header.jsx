import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, faShoppingCart, faUser, faHeart, 
  faSun, faMoon, faBars, faTimes 
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()
  
  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate header classes based on theme and scroll state
  const headerClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled
      ? theme === 'dark'
        ? 'bg-gray-900 shadow-lg'
        : 'bg-primary-500 shadow-lg'
      : theme === 'dark'
      ? 'bg-gray-900'
      : 'bg-primary-500'
  }`

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white">ShopKart</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 mx-8">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full p-2 rounded-l-md focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-secondary-500 text-white px-4 rounded-r-md hover:bg-secondary-600 transition-colors"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              className="text-white hover:text-gray-200 transition-colors"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
            </button>
            
            <Link to="/wishlist" className="text-white hover:text-gray-200 transition-colors relative">
              <FontAwesomeIcon icon={faHeart} />
            </Link>
            
            <Link to="/cart" className="text-white hover:text-gray-200 transition-colors relative">
              <FontAwesomeIcon icon={faShoppingCart} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-white hover:text-gray-200 transition-colors flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <span className="truncate max-w-[100px]">{user?.name?.split(' ')[0] || 'Account'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Wishlist
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 border-t"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-primary-500 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 absolute top-full left-0 w-full shadow-lg py-4 px-4 z-50 animate-fadeIn">
          {/* Search Bar - Mobile */}
          <form onSubmit={handleSearch} className="flex mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 border rounded-l-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary-500 text-white px-4 rounded-r-md hover:bg-primary-600 transition-colors"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          <nav className="flex flex-col space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-800 dark:text-white">Theme</span>
              <button 
                className="text-gray-800 dark:text-white"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
              </button>
            </div>
            
            <Link 
              to="/wishlist" 
              className="flex items-center py-2 text-gray-800 dark:text-white border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Wishlist
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center py-2 text-gray-800 dark:text-white border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Cart ({getCartCount()})
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="py-2 text-gray-800 dark:text-white border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/orders" 
                  className="py-2 text-gray-800 dark:text-white border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="py-2 text-left text-gray-800 dark:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="py-2 text-gray-800 dark:text-white text-center bg-primary-100 dark:bg-primary-700 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header