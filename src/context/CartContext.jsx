import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../utils/api'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  // Load cart from local storage or API on mount
  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated) {
        // If user is authenticated, fetch cart from API
        await getCartFromServer()
      } else {
        // Otherwise, load from localStorage
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          setCart(JSON.parse(savedCart))
        }
      }
    }
    
    fetchCart()
  }, [isAuthenticated])

  // Sync cart to localStorage whenever it changes (for guest users)
  useEffect(() => {
    if (!isAuthenticated && cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isAuthenticated])

  // Get cart from server for authenticated users
  const getCartFromServer = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/cart')
      if (response.data) {
        setCart(response.data.items || [])
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true)
      
      // Check if product already exists in cart
      const existingItem = cart.find(item => item.product._id === product._id)
      
      if (existingItem) {
        // Update quantity for existing item
        const updatedCart = cart.map(item => 
          item.product._id === product._id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        )
        
        if (isAuthenticated) {
          await api.put(`/api/cart/${product._id}`, { quantity: existingItem.quantity + quantity })
        }
        
        setCart(updatedCart)
        toast.success('Cart updated successfully')
      } else {
        // Add new item
        const newItem = { product, quantity }
        
        if (isAuthenticated) {
          await api.post('/api/cart', { productId: product._id, quantity })
        }
        
        setCart([...cart, newItem])
        toast.success('Item added to cart')
      }
    } catch (error) {
      toast.error('Failed to add item to cart')
    } finally {
      setLoading(false)
    }
  }

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true)
      
      if (quantity <= 0) {
        return removeFromCart(productId)
      }
      
      const updatedCart = cart.map(item => 
        item.product._id === productId 
          ? { ...item, quantity } 
          : item
      )
      
      if (isAuthenticated) {
        await api.put(`/api/cart/${productId}`, { quantity })
      }
      
      setCart(updatedCart)
      toast.success('Cart updated')
    } catch (error) {
      toast.error('Failed to update cart')
    } finally {
      setLoading(false)
    }
  }

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      setLoading(true)
      
      const updatedCart = cart.filter(item => item.product._id !== productId)
      
      if (isAuthenticated) {
        await api.delete(`/api/cart/${productId}`)
      }
      
      setCart(updatedCart)
      toast.success('Item removed from cart')
    } catch (error) {
      toast.error('Failed to remove item')
    } finally {
      setLoading(false)
    }
  }

  // Clear cart
  const clearCart = async () => {
    try {
      setLoading(true)
      
      if (isAuthenticated) {
        await api.delete('/api/cart')
      }
      
      setCart([])
      localStorage.removeItem('cart')
      toast.success('Cart cleared')
    } catch (error) {
      toast.error('Failed to clear cart')
    } finally {
      setLoading(false)
    }
  }

  // Calculate cart totals
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}