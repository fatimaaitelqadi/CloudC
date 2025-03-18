import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-gradient-to-b from-white to-pink-300 p-6">
      <h3 className="text-center font-bold text-5xl">EasyCarMaroc</h3>
      <p className="text-center font-semibold text-2xl m-6 p-5">
        We provide a premium car rental experience with a diverse fleet of high-end vehicles, flexible rental options, and seamless booking. 
        At EasyCarMaroc, we are dedicated to offering a luxurious car rental service that caters to a wide range of customer needs. Our diverse fleet ensures that whether you're looking for a sporty car for a weekend getaway, a luxurious sedan for a business trip, or a spacious SUV for a family vacation, we have the perfect vehicle to match your requirements. All our cars are top-of-the-line, ensuring you have access to the best quality and the latest models. With our flexible rental options, you can choose the duration that works for you, whether it's a few hours, days, or weeks, allowing you to rent a vehicle for any occasion, big or small. Additionally, our seamless booking process enables you to reserve a car quickly and easily, either online or through our app, ensuring that your rental experience is smooth from start to finish.
      </p>

      <div className="flex justify-end">
        <button
          className="text-white font-bold py-2 px-4 rounded mb-4"
          style={{ background: 'linear-gradient(to right, #837EDA, #CFADC7)' }}
        >
          Reserve Now
        </button>
      </div>

      <hr className="my-4 border-t-2 border-purple-400" />

      <div className="flex justify-center gap-12">
        <ul className="flex flex-col items-start text-lg font-bold text-gray-800 m-6">
          <li className="hover:text-pink-500 text-6xl text-black mb-8">
            <h2>Company</h2>
          </li>
          <li>
            <Link to="/" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              Home
            </Link>
          </li>
          <li>
            <Link to="/reservation" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              Reservation
            </Link>
          </li>
          <li>
            <Link to="/cars" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              Car
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              About
            </Link>
          </li>
        </ul>

        <ul className="flex flex-col items-start text-lg font-bold text-gray-800 m-6">
          <li className="hover:text-pink-500 text-6xl text-black mb-8">Help</li>
          <li>
            <Link to="/" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              FAQ’s
            </Link>
          </li>
          <li>
            <Link to="/reservation" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              Support
            </Link>
          </li>
          <li>
            <Link to="/cars" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              Privacy Policy
            </Link>
          </li>
        </ul>

        <ul className="flex flex-col items-start text-lg font-bold text-gray-800 m-6">
          <li className="hover:text-pink-500 text-6xl text-black mb-8">Follow us</li>
          <li>
            <Link to="/" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              Facebook
            </Link>
          </li>
          <li>
            <Link to="/reservation" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              Instagram
            </Link>
          </li>
          <li>
            <Link to="/cars" className="hover:text-pink-500 text-5xl text-[#0E1798]">
              X
            </Link>
          </li>
        </ul>
      </div>

      <hr className="my-4 border-t-2 border-purple-400" />
    </div>
  );
}

export default Footer;
