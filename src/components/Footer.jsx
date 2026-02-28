import { useState } from "react";

const Footer = () => {
    const [showMessage, setShowMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    return (
        <footer className="relative">

            {/* Toast */}
            {showMessage && (
                <div className="fixed top-6 right-6 bg-white/90 backdrop-blur-lg text-gray-800 px-6 py-4 rounded-2xl shadow-2xl border border-gray-200 flex items-center gap-4 animate-[fadeIn_.4s_ease]">
                    <div className="w-2 h-10 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
                    <p className="text-sm font-semibold">
                        🎉 Email cadastrado com sucesso!
                    </p>
                </div>
            )}

            {/* Parte Principal */}
            <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">

                <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12">

                    {/* Menu */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold tracking-wide border-b border-white/20 pb-2 w-fit">
                            Menu
                        </h2>

                        <ul className="space-y-3 text-gray-300">
                            {["Home", "Produtos", "Contato"].map((item) => (
                                <li
                                    key={item}
                                    className="hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4 bg-white/5 backdrop-blur-xl p-6 rounded-2xl  ">
                        <h2 className="text-xl font-bold tracking-wide">
                            Receba nossas novidades 
                        </h2>

                        <p className="text-gray-300 text-sm">
                            Cadastre seu email e fique por dentro das promoções exclusivas.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-3 mt-4"
                        >
                            <input
                                type="email"
                                placeholder="Seu melhor email"
                                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition text-white placeholder-gray-400"
                                required
                            />

                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                            >
                                Inscrever
                            </button>
                        </form>
                    </div>

                </div>

                {/* Linha divisória */}
                <div className="border-t border-white/10"></div>

                {/* Copyright */}
                <div className="text-center py-6 text-sm text-gray-400">
                    © 2026 <span className="font-semibold text-white">Ecommerce 3DTech</span>.
                    Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;