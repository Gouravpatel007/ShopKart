import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  // Check if user is already logged in
  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        setIsAuthenticated(false)
        setUser(null)
        return
      }

      const response = await api.get('/api/users/profile')
      if (response.data) {
        setUser(response.data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      localStorage.removeItem('token')
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }, [])

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true)
      console.log('Registering with data:', userData)
      
      const response = await api.post('/api/users/register', userData)
      console.log('Registration response:', response.data)
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user)
        setIsAuthenticated(true)
        toast.success('Registration successful!')
        navigate('/')
        return true
      }
    } catch (error) {
      console.error('Registration error:', error)
      const message = error.response?.data?.message || error.message || 'Registration failed'
      toast.error(message)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await api.post('/api/users/login', { email, password })
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user)
        setIsAuthenticated(true)
        toast.success('Login successful!')
        navigate('/')
        return true
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Invalid credentials'
      toast.error(message)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
    toast.success('Logged out successfully')
    navigate('/')
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true)
      const response = await api.put('/api/users/profile', userData)
      
      if (response.data) {
        setUser(response.data)
        toast.success('Profile updated successfully')
        return true
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update profile'
      toast.error(message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}