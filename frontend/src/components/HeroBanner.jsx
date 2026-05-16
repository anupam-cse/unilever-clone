import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Text */}
        <div className="z-10">
          <p className="text-yellow-300 font-bold uppercase tracking-widest mb-3 text-sm">
            ✨ Trusted by Millions
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Brighter Future <br />
            <span className="text-yellow-300">Made Everyday</span>
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-md">
            Discover Unilever's world-class brands - from beauty essentials to home care, 
            everything you need is here.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/" className="bg-white text-blue-800 px-8 py-3 rounded-full font-bold uppercase text-sm hover:bg-yellow-300 transition shadow-lg">
              Shop Now
            </Link>
            <Link to="/" className="border-2 border-white px-8 py-3 rounded-full font-bold uppercase text-sm hover:bg-white hover:text-blue-800 transition">
              Our Brands
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative hidden md:block">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-400 rounded-full opacity-20 blur-3xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600" 
            alt="Hero" 
            className="relative z-10 rounded-3xl shadow-2xl"
          />
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;