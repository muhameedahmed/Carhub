import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Car, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, userData, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  const activeClassName = "text-secondary-600 font-medium";
  const inactiveClassName = "text-gray-700 hover:text-secondary-600 transition-colors";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Car size={28} className="text-primary-600" />
            <span className="font-bold text-xl text-gray-900">CARHUB</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
            >
              About Us
            </NavLink>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 group-hover:text-secondary-600 transition-colors">
                  <span>{userData?.name || 'User'}</span>
                  <User size={16} />
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/edit-profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Edit Profile
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <NavLink 
                to="/login" 
                className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
              >
                Login
              </NavLink>
            )}
          </nav>

          <button 
            type="button" 
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`
            }
            onClick={closeMenu}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`
            }
            onClick={closeMenu}
          >
            About Us
          </NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={closeMenu}
              >
                My Profile
              </NavLink>
              <NavLink 
                to="/edit-profile" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={closeMenu}
              >
                Edit Profile
              </NavLink>
              <button 
                onClick={handleLogout} 
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
