import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../hooks/useUser';
import { User, MapPin, Phone, Mail, Edit, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, logout } = useUser();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [previousOrders, setPreviousOrders] = useState([]);
  
  useEffect(() => {
    // Redirigir si no ha iniciado sesión
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Cargar datos de usuario
    setFormData({
      name: user.name || '',
      email: user.email || '',
      address: user.address || '',
      phone: user.phone || ''
    });
    
    // Simular pedidos anteriores
    setPreviousOrders([
      {
        id: '1001',
        date: '2023-09-15',
        total: 32.99,
        status: 'Delivered',
        items: [
          { name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
          { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
          { name: 'Garlic Bread', quantity: 1, price: 4.99 }
        ]
      },
      {
        id: '1002',
        date: '2023-08-29',
        total: 21.49,
        status: 'Delivered',
        items: [
          { name: 'Vegetarian Pizza', quantity: 1, price: 15.99 },
          { name: 'Pepsi', quantity: 1, price: 2.49 },
          { name: 'Cheesy Fries', quantity: 1, price: 3.99 }
        ]
      }
    ]);
  }, [user, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) {
    return null; // Se redireccionará en useEffect
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Perfil</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informacion de perfil */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Información de perfil</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-red-600 hover:text-red-800 flex items-center"
                  >
                    <Edit size={18} className="mr-1" />
                    Editar
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numero de teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección de entrega
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-300"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <User size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Nombre completo</p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Correo electrónico</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Numero de teléfono</p>
                      <p className="font-medium">{formData.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Dirección de entrega</p>
                      <p className="font-medium">{formData.address || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Acciones de cuenta */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">acciones de cuenta</h2>
            </div>
            <div className="p-6">
              <button
                onClick={handleLogout}
                className="w-full mb-4 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                <LogOut size={18} className="mr-2" />
                Cerrar sesión
              </button>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">otras opciones</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-red-600 hover:text-red-800">Cambiar contraseña</a>
                  </li>
                  <li>
                    <a href="#" className="text-red-600 hover:text-red-800">preferencias de notificación</a>
                  </li>
                  <li>
                    <a href="#" className="text-red-600 hover:text-red-800">Eliminar cuenta</a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Historial de pedidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Historial de pedidos</h2>
        
        {previousOrders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Identificación de pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Datos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {previousOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-red-600 hover:text-red-800">
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Aún no has realizado ningún pedido.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
            >
              Buscar pizzas
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;