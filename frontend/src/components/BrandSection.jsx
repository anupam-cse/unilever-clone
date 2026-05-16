const BrandSection = () => {
  const brands = [
    { 
      name: 'Lux', 
      bg: 'from-pink-400 to-pink-600',
      tagline: 'Beauty Soap'
    },
    { 
      name: 'Dove', 
      bg: 'from-blue-400 to-blue-600',
      tagline: 'Real Beauty'
    },
    { 
      name: 'Lifebuoy', 
      bg: 'from-red-400 to-red-600',
      tagline: 'Health & Hygiene'
    },
    { 
      name: 'Sunsilk', 
      bg: 'from-yellow-400 to-orange-500',
      tagline: 'Hair Care'
    },
    { 
      name: 'Vaseline', 
      bg: 'from-indigo-400 to-indigo-600',
      tagline: 'Healing Jelly'
    },
    { 
      name: "Pond's", 
      bg: 'from-purple-400 to-purple-600',
      tagline: 'Skin Care'
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-blue-700 font-bold uppercase tracking-widest text-sm mb-2">
            ★ Trusted Worldwide ★
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-3">
            Our Iconic Brands
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From beauty essentials to home care, discover the brands that millions love
          </p>
          <div className="w-24 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className={`group relative bg-gradient-to-br ${brand.bg} p-8 rounded-2xl text-center cursor-pointer 
                         hover:scale-110 hover:-rotate-2 transition-all duration-300 shadow-lg hover:shadow-2xl
                         overflow-hidden`}
            >
              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
              
              {/* Brand Name */}
              <h3 className="relative text-white font-black text-2xl uppercase tracking-wide mb-1 drop-shadow-lg">
                {brand.name}
              </h3>
              <p className="relative text-white text-xs font-semibold uppercase opacity-90 tracking-wider">
                {brand.tagline}
              </p>

              {/* Hover Arrow */}
              <div className="relative mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold uppercase text-sm hover:bg-blue-800 transition shadow-lg hover:shadow-xl">
            Explore All Brands →
          </button>
        </div>

      </div>
    </section>
  );
};

export default BrandSection;