import React from 'react'
import ProductCard from '../components/products/ProductCard'

function ProductsPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Product grid will be populated with data from the backend */}
      </div>
    </div>
  )
}

export default ProductsPage