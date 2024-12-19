import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    navigate('/login');
  };

  const token = localStorage.getItem('token'); // Récupérer le token du localStorage

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <NavLink to="/" className="flex items-center text-white">
            <img
              src="https://www.geek-chretien.fr/wp-content/uploads/2018/01/logo-leboncoin.png"
              alt="Logo"
              className="h-8 w-8 mr-2"
            />
            Le Coin Bon
          </NavLink>
        </div>
        <div className="space-x-4 flex items-center">
          {token ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "bg-gray-700 text-white rounded px-3 py-2 flex items-center" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded px-3 py-2 flex items-center"
                }
              >
                <FaUser className="mr-1" />
                Profile
              </NavLink>
              <NavLink
                to="/createAnnonce"
                className={({ isActive }) =>
                  isActive ? "bg-green-700 text-white rounded px-3 py-2 flex items-center" : "bg-green-500 text-white hover:bg-green-700 rounded px-3 py-2 flex items-center"
                }
              >
                <FaPlusCircle className="mr-1" />
                Create Announce
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white rounded px-3 py-2 flex items-center"
              >
                <FaSignOutAlt className="mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "bg-gray-700 text-white rounded px-3 py-2 flex items-center" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded px-3 py-2 flex items-center"
                }
              >
                <FaSignInAlt className="mr-1" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "bg-gray-700 text-white rounded px-3 py-2 flex items-center" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded px-3 py-2 flex items-center"
                }
              >
                <FaUserPlus className="mr-1" />
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}