import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();  // Link click হবে না
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white p-4 rounded-xl shadow-md border flex flex-col hover:shadow-xl transition cursor-pointer h-full">
        <img 
          src={`http://127.0.0.1:8000${product.image}`} 
          className="h-40 w-full object-contain mb-3" 
          alt={product.name}
        />
        <h4 className="text-[10px] font-black text-blue-700 uppercase">
          {product.brand_name}
        </h4>
        <p className="font-bold text-sm h-10 overflow-hidden mb-4">
          {product.name}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-black">৳{product.price}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase hover:bg-blue-800"
          >
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;