import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full">
      <nav className="bg-gray-100 p-4 flex justify-between items-center h-16">
        <h5 className="text-5xl font-bold text-blue-600">
          <Link to="/" className="logo">EasyCarMaroc</Link>
        </h5>

        <ul className="flex gap-10 text-lg font-bold text-gray-800">
          <li><Link to="/" className="hover:text-blue-500 text-2xl">Home</Link></li>
          <li><Link to="/reservation" className="hover:text-blue-500 text-2xl">Reservation</Link></li>
          <li><Link to="/cars" className="hover:text-blue-500 text-2xl">Car</Link></li>
          <li><Link to="/about" className="hover:text-blue-500 text-2xl">About</Link></li>
        </ul>

        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Log in
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
