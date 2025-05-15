import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ciao Pizza</h3>
            <p className="text-gray-400 mb-4">
            Elaborando auténticas pizzas italianas con los mejores ingredientes desde 2005. 
            Nuestra pasión por la calidad y la tradición se refleja en cada porción.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Horario de apertura</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Lunes - Jueves</span>
                <span>10:00 AM - 22:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Viernes</span>
                <span>11:00 AM - 18:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Domingos</span>
                <span>12:00 PM - 20:00 PM</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacta con nosotros</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Pizzas</p>
              <p>Chillán, Chile 3780000</p>
              <p>Teléfono: (56) 939043452</p>
              <p>Correo: jhoandrycarrasquero078@gmail.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {year} Ciao Pizza. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Politica de privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Terminos y servicios</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Politica de entrega</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;