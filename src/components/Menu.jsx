import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Menu() {
  const [open, setOpen] = useState(false);



  
  const links = [
    { name: "Início", href: "#" },
    { name: "Quem Somos", href: "#" },
    { name: "Produtos", href: "#" },
    { name: "Projetos Personalizados", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Rastreie seu Pedido", href: "#" },
    { name: "Filamentos 3D", href: "#" },
  ];

  return (
    <header className="w-full shadow-md bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            LOGO
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-orange-500 transition duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Botão Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 text-2xl"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {open && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-orange-500 transition duration-300"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}