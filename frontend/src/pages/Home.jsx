import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import HeroBanner from '../components/HeroBanner';
import BrandSection from '../components/BrandSection';

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/list/')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Brand Showcase */}
      <BrandSection />

      {/* Products Section */}
      <main className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">Featured Products</h2>
          <p className="text-gray-500">Showing {filteredProducts.length} products</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;