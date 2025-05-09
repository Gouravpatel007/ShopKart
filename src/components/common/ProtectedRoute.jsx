import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  // If still loading, show nothing (or you could add a loading spinner)
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  
  // If authenticated, render the children
  return children
}

export default ProtectedRoute