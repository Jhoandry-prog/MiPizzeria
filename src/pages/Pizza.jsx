import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pizzas } from '../Pizzas';
import { useCart } from '../hooks/useCart';
import { ArrowLeft, Plus, Minus, ShoppingCart, Clock } from 'lucide-react';

const Pizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [pizza, setPizza] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [loading, setLoading] = useState(true);
  
  const sizes = {
    small: { label: 'Pequeña (10")', priceMultiplier: 0.8 },
    medium: { label: 'Mediana (12")', priceMultiplier: 1 },
    large: { label: 'Grande (14")', priceMultiplier: 1.2 },
    xl: { label: 'Extra grande (16")', priceMultiplier: 1.4 }
  };
  
  useEffect(() => {
    // Simular la obtención de datos
    setLoading(true);
    setTimeout(() => {
      const foundPizza = pizzas.find(p => p.id === id);
      if (foundPizza) {
        setPizza(foundPizza);
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!pizza) return;
    
    const sizeMultiplier = sizes[selectedSize].priceMultiplier;
    const finalPrice = pizza.price * sizeMultiplier;
    
    addToCart({
      ...pizza,
      price: finalPrice,
      quantity,
      size: sizes[selectedSize].label
    });
    
    // Mostrar una notificación o redirigir al carrito
    window.scrollTo(0, 0);
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }
  
  if (!pizza) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pizza no encontrada</h2>
          <p className="text-gray-600 mb-8">Lo sentimos, no pudimos encontrar la pizza que estás buscando.</p>
          <button
            onClick={handleGoBack}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-8 font-medium"
      >
        <ArrowLeft size={20} className="mr-2" />
        Volver a Pizzas
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Imagen de pizza */}
          <div className="md:w-1/2">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-full object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          {/* Detalles de pizza */}
          <div className="md:w-1/2 p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{pizza.name}</h1>
                <span className="text-xl font-bold text-red-600">
                  ${(pizza.price * sizes[selectedSize].priceMultiplier).toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center mb-4">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                  {pizza.category}
                </span>
                <div className="flex items-center ml-4 text-gray-500 text-sm">
                  <Clock size={16} className="mr-1" />
                  <span>20-30 min</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{pizza.description}</p>
              
              {/* Selección de tamaño */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Elige talla</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(sizes).map(([key, { label, priceMultiplier }]) => (
                    <button
                      key={key}
                      className={`py-2 px-4 rounded-md border-2 transition-colors ${
                        selectedSize === key
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-300 hover:border-red-300'
                      }`}
                      onClick={() => setSelectedSize(key)}
                    >
                      <div className="font-medium">{label}</div>
                      <div className="text-sm">
                        ${(pizza.price * priceMultiplier).toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Cantidad */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Cantidad</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} className="text-gray-600" />
                  </button>
                  <span className="mx-6 text-xl font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Botón Añadir al carrito */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center transition-colors duration-300"
              >
                <ShoppingCart size={20} className="mr-2" />
                añadir a la cesta - ${((pizza.price * sizes[selectedSize].priceMultiplier) * quantity).toFixed(2)}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Pizzas relacionadas */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">También te puede gustar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pizzas
            .filter(p => p.id !== id && p.category === pizza.category)
            .slice(0, 4)
            .map(relatedPizza => (
              <div
                key={relatedPizza.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/pizza/${relatedPizza.id}`)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={relatedPizza.image}
                    alt={relatedPizza.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800">{relatedPizza.name}</h3>
                    <span className="font-medium text-red-600">${relatedPizza.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Pizza;