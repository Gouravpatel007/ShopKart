import { Helmet } from 'react-helmet'
import Banner from '../components/home/Banner'
import CategorySection from '../components/home/CategorySection'
import FeaturedProducts from '../components/products/FeaturedProducts'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>ShopKart - Your One-Stop E-Commerce Shop</title>
        <meta name="description" content="Shop the latest products with fast delivery and amazing deals at ShopKart" />
      </Helmet>
      
      <div className="container mx-auto px-4 pb-8">
        <Banner />
        <CategorySection />
        <FeaturedProducts />
        
        {/* Marketing features */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center transition-all hover:shadow-md">
              <div className="text-secondary-500 text-3xl mb-3">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Free Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Free shipping on all orders over $49
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center transition-all hover:shadow-md">
              <div className="text-secondary-500 text-3xl mb-3">
                <i className="fas fa-undo"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Easy Returns</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                30 days money back guarantee
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center transition-all hover:shadow-md">
              <div className="text-secondary-500 text-3xl mb-3">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Friendly customer support available
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage