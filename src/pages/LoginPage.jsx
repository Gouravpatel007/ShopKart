import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { login, isAuthenticated, loading } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])
  
  const validate = () => {
    const newErrors = {}
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validate()) {
      await login(email, password)
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Login - ShopKart</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className={`rounded-lg shadow-md overflow-hidden ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="bg-primary-500 p-4 text-white text-center">
              <h1 className="text-2xl font-bold">Login to ShopKart</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-6">
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                )}
                {loading ? 'Logging in...' : 'Login'}
              </button>
              
              <div className="mt-4 text-center">
                <Link to="#" className="text-sm text-primary-500 hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </form>
            
            <div className={`border-t px-6 py-4 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <p className="text-sm text-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-500 hover:underline font-medium">
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage