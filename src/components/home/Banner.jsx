import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { useTheme } from '../../context/ThemeContext'

const banners = [
  {
    id: 1,
    title: 'New Season Arrivals',
    description: 'Check out all the trends',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=clothing',
    bgColor: 'bg-blue-600',
  },
  {
    id: 2,
    title: 'Save Up to 50%',
    description: 'On selected electronics',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=electronics',
    bgColor: 'bg-purple-600',
  },
  {
    id: 3,
    title: 'Home & Kitchen Essentials',
    description: 'Starting at just $19.99',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=home',
    bgColor: 'bg-green-600',
  },
]

const Banner = () => {
  const { theme } = useTheme()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  }

  // Preload images for smoother transitions
  useEffect(() => {
    banners.forEach(banner => {
      const img = new Image()
      img.src = banner.image
    })
  }, [])

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md mb-8">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative">
            <div 
              className="h-64 md:h-96 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                <div className="container mx-auto px-4 md:px-10">
                  <div className="max-w-lg">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                      {banner.title}
                    </h2>
                    <p className="text-white text-lg mb-6">
                      {banner.description}
                    </p>
                    <Link
                      to={banner.link}
                      className={`inline-block px-6 py-3 rounded-md font-medium text-white ${banner.bgColor} hover:bg-opacity-90 transition-all`}
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Banner