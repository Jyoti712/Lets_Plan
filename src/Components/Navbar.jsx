import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  return (
    <nav className="bg-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link to="/" className="text-xl font-bold">LetsPlann</Link>
          </div>
          
          <ul className="flex space-x-6">
            {user ? (
              <>
                <li className="hover:text-purple-200 transition-colors">
                  <span className="focus:outline-none focus:underline">
                    Welcome, {user.name}
                  </span>
                </li>
                <li className="hover:text-purple-200 transition-colors cursor-pointer">
                  <button 
                    onClick={handleLogout}
                    className="focus:outline-none focus:underline"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-purple-200 transition-colors">
                  <Link to="/login" className="focus:outline-none focus:underline">
                    Login
                  </Link>
                </li>
                <li className="hover:text-purple-200 transition-colors">
                  <Link to="/register" className="focus:outline-none focus:underline">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;