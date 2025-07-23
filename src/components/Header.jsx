import { useState } from "react";
import logo from "../assets/Finvoice.png";
import MobileMenu from "./MobileMenu";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Create Invoice", path: "/invoice" },
  { name: "Analytics", path: "/analytics" },
  { name: "My Invoices", path: "/my-invoices" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="w-full px-6 md:px-28 py-4 flex justify-between items-center shadow-sm bg-white fixed top-0 z-50 print:hidden">
      <Link to="/">
        <img src={logo} alt="CraftResume" className="h-12 w-auto" />
      </Link>

      <nav className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm md:text-base font-medium transition-colors ${
              location.pathname === link.path
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <button
        className="md:hidden text-gray-700"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <FiMenu size={24} />
      </button>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navLinks={navLinks}/>
    </header>
  );
}
