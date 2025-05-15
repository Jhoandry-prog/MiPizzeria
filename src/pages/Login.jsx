import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../hooks/useUser';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login, isLoading, error } = useUser();
  const navigate = useNavigate();
  
  const validate = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Correo es invalido';
    }
    
    if (!password) {
      newErrors.password = 'Contraseña es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    login(email, password);
    // Si el inicio de sesión es exitoso, se redireccionará automáticamente.
    // Esto se maneja mediante UserContext que establece el usuario
    
    // Para fines de demostración, redirijamos a la página de inicio después de un inicio de sesión exitoso.
    if (!error) {
      navigate('/');
    }
  };
  
  // Solo para fines de demostración: complete el formulario con credenciales de prueba
  const fillDemoCredentials = () => {
    setEmail('you@example.com');
    setPassword('contraseña');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="px-6 py-8 sm:p-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Bienvenido de nuevo!</h2>
            <p className="mt-2 text-gray-600">Inicia sesión en tu cuenta</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              dirección de correo electrónico
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 w-full py-2 px-3 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:ring-red-500 focus:border-red-500`}
                  placeholder="tu@correo electrónico.com"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 w-full py-2 px-3 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:ring-red-500 focus:border-red-500`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Acuérdate de mí
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-red-600 hover:text-red-500">
              Has olvidado tu contraseña
              </a>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
              >
                {isLoading ? 'Signing in...' : 'iniciar sesión'}
              </button>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                usar credenciales de demostración
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-medium text-red-600 hover:text-red-500">
              inscribirse
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;