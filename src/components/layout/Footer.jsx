import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFacebook, faTwitter, faInstagram, faYoutube 
} from '@fortawesome/free-brands-svg-icons'
import { useTheme } from '../../context/ThemeContext'

const Footer = () => {
  const { theme } = useTheme()
  
  const footerClasses = `mt-auto py-8 ${
    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
  }`
  
  return (
    <footer className={footerClasses}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopKart</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Your one-stop destination for all your shopping needs. We provide high-quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-4 py-2 rounded-r-md hover:bg-primary-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} ShopKart. All rights reserved.</p>
          <p className="mt-2">Made by Gourav Developers</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer