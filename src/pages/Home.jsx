import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CardPizza from '../components/CardPizza';
import { pizzas } from '../Pizzas';
import { Search, FilterX } from 'lucide-react';

const Home = () => {
  const [filteredPizzas, setFilteredPizzas] = useState(pizzas);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 30]);
  
  const categories = ['all', 'vegetarian', 'meat', 'specialty'];
  
  useEffect(() => {
    filterPizzas();
  }, [searchTerm, categoryFilter, priceRange]);
  
  const filterPizzas = () => {
    let filtered = pizzas;
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(pizza => 
        pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pizza.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por categoria
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(pizza => pizza.category === categoryFilter);
    }
    
    // Filtrar por rango de precio
    filtered = filtered.filter(pizza => 
      pizza.price >= priceRange[0] && pizza.price <= priceRange[1]
    );
    
    setFilteredPizzas(filtered);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setPriceRange([0, 30]);
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-cover bg-center h-[500px]"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Deliciosas pizzas hechas con pasión
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Hecho a mano con amor utilizando recetas tradicionales italianas y los mejores ingredientes.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 text-lg">
              Ordenar ahora
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* sección de menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nuestro menú de pizzas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Explore nuestra selección de deliciosas pizzas, elaboradas con ingredientes frescos y horneadas a la perfección en nuestro horno de leña.
          </p>
        </div>
        
        {/* Filtrar y buscar */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Buscar */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pizzas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            {/* Filtrar categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Rango de precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rango de precio: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          
          {/* Botón Restablecer filtros */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="flex items-center text-red-600 hover:text-red-800 font-medium"
            >
              <FilterX size={18} className="mr-1" />
              Filtros de recetas 
            </button>
          </div>
        </div>
        
        {/* Rejilla para pizza */}
        {filteredPizzas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPizzas.map((pizza) => (
              <CardPizza key={pizza.id} pizza={pizza} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron pizzas</h3>
            <p className="text-gray-600">Intente ajustar sus criterios de búsqueda o filtro</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;