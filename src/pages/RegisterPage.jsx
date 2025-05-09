import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, faEnvelope, faLock, faPhone, 
  faUserPlus 
} from '@fortawesome/free-solid-svg-icons'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})
  const { register, isAuthenticated, loading } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  
  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validate()) {
      const { confirmPassword, ...userData } = formData
      await register(userData)
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Register - ShopKart</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className={`rounded-lg shadow-md overflow-hidden ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="bg-primary-500 p-4 text-white text-center">
              <h1 className="text-2xl font-bold">Create an Account</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    type="text"
                    id="name"
                    className={`w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-primary-200'
                    } ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className={`w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-primary-200'
                    } ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  Phone Number (optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    className={`w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-primary-200'
                    } ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    id="password"
                    className={`w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-primary-200'
                    } ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-primary-200'
                    } ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                ) : (
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                )}
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            
            <div className={`border-t px-6 py-4 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <p className="text-sm text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-500 hover:underline font-medium">
                  Login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage