import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const CardPizza = ({ pizza }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...pizza, quantity });
  };

  const decreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(quantity + 1);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/pizza/${pizza.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={pizza.image} 
            alt={pizza.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {pizza.isSpecial && (
            <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg font-semibold text-sm">
              Especial
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{pizza.name}</h3>
            <span className="text-lg font-bold text-red-600">${pizza.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pizza.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={decreaseQuantity} 
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 text-gray-800 font-medium">{quantity}</span>
              <button 
                onClick={increaseQuantity} 
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md font-medium transition-colors duration-300"
            >
              <ShoppingCart size={18} className="mr-1" />
              Agregar
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CardPizza;