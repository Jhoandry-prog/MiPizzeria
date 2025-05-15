import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email, password) => {
    setIsLoading(true);
    setError(null);
    
    // Simular llamada API
    setTimeout(() => {
      // Para fines de demostración, verifique algunas credenciales codificadas
      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
          address: '123 Main St, New York, NY'
        };
        setUser(userData);
        setIsLoading(false);
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  const register = (name, email, password) => {
    setIsLoading(true);
    setError(null);
    
    // Simular llamada a API
    setTimeout(() => {
      // En una aplicación real, validarías y crearías un nuevo usuario
      const userData = {
        id: Date.now().toString(),
        name,
        email,
        address: ''
      };
      
      setUser(userData);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    setUser(prevUser => ({ ...prevUser, ...updatedData }));
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      error,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};