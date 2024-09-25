import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import openIcon from '../assets/menu/menu.svg';
import closeIcon from '../assets/menu/close.svg';
import { motion } from 'framer-motion';

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay },
  },
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <nav className="flex items-center justify-between py-6 bg-transparent border-b border-stone-50 ">
      {/* Logo */}
      <motion.div
        variants={container(0.5)}
        initial="hidden"
        animate="visible"
        className="ml-5 mt-5 flex items-center"
      >
        <img
          src={logo}
          alt="Ofin"
          className="w-40 cursor-pointer transition-transform duration-300 hover:scale-110"
        />
      </motion.div>

      {/* Hamburger Icon for Mobile */}
      <div className="mr-5 block lg:hidden">
        <img
          src={isOpen ? closeIcon : openIcon}
          alt={isOpen ? 'Close menu' : 'Open menu'}
          className="w-8 h-8 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Links */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row text-white m-8 items-center justify-center gap-4 text-xl lg:text-2xl absolute lg:static left-0 
        top-20 lg:top-0 lg:bg-transparent backdrop-blur-md bg-white/30 rounded-3xl 
        lg:w-auto w-[90%] lg:h-auto h-[80vh] transition-all duration-500`}
      >
        <ul className="flex flex-col lg:flex-row gap-4 text-3xl">
          <li>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 1 }}
            >
              <Link
                to="/"
                className="hover:text-stone-700 transition-colors duration-300"
                onClick={handleLinkClick} // Close menu on click
              >
                HOME
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 1.5 }}
            >
              <Link
                to="/loans"
                className="hover:text-stone-700 transition-colors duration-300"
                onClick={handleLinkClick} // Close menu on click
              >
                LOANS
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 2.5 }}
            >
              <Link
                to="/apply"
                className="hover:text-stone-700 transition-colors duration-300"
                onClick={handleLinkClick} // Close menu on click
              >
                APPLY
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 3 }}
            >
              <Link
                to="/contact"
                className="hover:text-stone-700 transition-colors duration-300"
                onClick={handleLinkClick} // Close menu on click
              >
                CONTACT
              </Link>
            </motion.div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
