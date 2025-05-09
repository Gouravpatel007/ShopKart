import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    count: '1200+ products',
    link: '/products?category=electronics',
  },
  {
    id: 2,
    name: 'Fashion',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    count: '3000+ products',
    link: '/products?category=fashion',
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    count: '850+ products',
    link: '/products?category=home',
  },
  {
    id: 4,
    name: 'Beauty',
    image: 'https://images.pexels.com/photos/2697786/pexels-photo-2697786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    count: '650+ products',
    link: '/products?category=beauty',
  },
  {
    id: 5,
    name: 'Toys & Games',
    image: 'https://images.pexels.com/photos/207891/pexels-photo-207891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    count: '420+ products',
    link: '/products?category=toys',
  },
  {
    id: 6,
    name: 'Sports',
    image: 'https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    count: '580+ products',
    link: '/products?category=sports',
  },
]

const CategorySection = () => {
  const { theme } = useTheme()
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className={`product-card rounded-lg overflow-hidden shadow-md transition-all ${
                theme === 'dark' ? 'card-dark' : 'card-light'
              }`}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-medium">{category.name}</h3>
                <p className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {category.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection