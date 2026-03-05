// import { aside } from "framer-motion/client";
import { NavLink } from "react-router";

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
            <div className="p-6 border-b border-slate-700 flex justify-center">
                <img 
                src="/logo-icon-name.svg"  
                alt="Logo"
                className="h-10 object-contain" />
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `block text-white font-mono px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `block px-4 py-2 text-white font-mono rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Products
                </NavLink>

                <NavLink
                    to="/admin/categories"
                    className={({ isActive }) =>
                        `block px-4 py-2 text-white font-mono rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Categories
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `block px-4 py-2 text-white font-mono rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Users
                </NavLink>

                <NavLink
                    to="/admin/banners"
                    className={({ isActive }) =>
                        `block px-4 py-2 text-white font-mono rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Banners
                </NavLink>

                <NavLink
                    to="/admin/coupons"
                    className={({ isActive }) =>
                        `block px-4 py-2 text-white font-mono rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Coupons
                </NavLink>

            </nav>

            <div className="p-4 border-t border-slate-700">
                    <button className="w-full bg-purple-600 text-white font-mono hover:bg-purple-700 py-2 rounded-lg">
                        Logout
                    </button>
            </div>
        </aside>
    )
}