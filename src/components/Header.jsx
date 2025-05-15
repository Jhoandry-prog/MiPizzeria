import { Phone, MapPin, Clock } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-red-700 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center mb-2 sm:mb-0">
            <Phone size={16} className="mr-2" />
            <span>Ordenar ahora: (56) 939043452</span>
          </div>
          
          <div className="flex space-x-4 sm:space-x-6">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>Chillán, Chile</span>
            </div>
            
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>11:00 AM - 10:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;