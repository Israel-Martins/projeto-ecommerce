import { FaSearch, FaUser, FaShoppingCart, FaWhatsapp } from "react-icons/fa";

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-zinc-800 to-zinc-900 text-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* LEFT - Search */}
                <div className="flex-1">
                    <div className="flex items-center bg-white rounded-md overflow-hidden w-[350px]">
                        <input
                            type="text"
                            placeholder="O que você está buscando?"
                            className="flex-1 px-4 py-2 text-sm text-black outline-none"
                        />
                        <button className="px-4 text-gray-600 hover:text-black">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                {/* CENTER - Logo */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-10 object-contain"
                    />
                </div>

                {/* RIGHT - Actions */}
                <div className="flex-1 flex items-center justify-end gap-6">

                    {/* Login */}
                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                        <FaUser />
                        <div className="text-xs leading-tight">
                            <span className="block">Olá! Faça login</span>
                            <strong className="text-sm font-semibold">
                                Ou cadastre-se
                            </strong>
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <FaWhatsapp className="text-xl cursor-pointer hover:text-green-400 transition" />

                    {/* Cart */}
                    <div className="relative cursor-pointer">
                        <FaShoppingCart className="text-xl" />
                        <span className="absolute -top-2 -right-3 bg-green-500 text-white text-[10px] px-1.5 py-[2px] rounded-full">
                            0
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}