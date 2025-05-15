import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pizza } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Pizza size={120} className="text-red-600" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl">
              404
            </span>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        ¡Uy! Página no encontrada
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        ¡Parece que la página que buscas ya no está! Volvamos a nuestras deliciosas pizzas.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300"
          >
            volver a casa
          </Link>
          
          <Link 
            to="/cart" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-md transition-colors duration-300"
          >
            Ver carrito
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;