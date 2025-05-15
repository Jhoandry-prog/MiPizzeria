import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { useUser } from '../hooks/useUser';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (!user) {
      // Redirigir para iniciar sesión si no está autenticado
      navigate('/login');
      return;
    }
    
    // Simular el proceso de pago
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };
  
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">Parece que aún no has añadido ninguna pizza a tu carrito.</p>
          <Link 
            to="/" 
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300"
          >
            Explorar pizzas
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu carrito</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Pizza</th>
                    <th className="text-center py-2">Precio</th>
                    <th className="text-center py-2">Cantidad</th>
                    <th className="text-right py-2">Subtotal</th>
                    <th className="text-right py-2">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-gray-200"
                    >
                      <td className="py-4">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4">${item.price.toFixed(2)}</td>
                      <td className="text-center py-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} className="text-gray-600" />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </td>
                      <td className="text-right py-4 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="text-right py-4">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Link 
              to="/" 
              className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
            >
              ← seguir comprando
            </Link>
            <button 
              onClick={clearCart}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              Borrar carrito
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">resumen del pedido</h2>
            
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tarifa de entrega</span>
                <span className="font-medium">$4.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chillán</span>
                <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">
                ${(getCartTotal() + 4.990 + (getCartTotal() * 0.08)).toFixed(2)}
              </span>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-md transition-colors duration-300"
            >
              Pasar por la caja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;