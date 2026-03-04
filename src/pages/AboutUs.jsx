import React from "react";
import { FaCube, FaCogs, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-8">
      {/* HEADER */}
      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">3DTech</h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Transformando ideias em realidade com impressão 3D
        </p>
      </header>

      {/* SEÇÃO SOBRE A EMPRESA */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Quem Somos</h2>
          <p className="text-gray-300 mb-4">
            Na <span className="text-purple-500 font-semibold">3DTech</span>, somos apaixonados por transformar ideias em produtos reais usando tecnologia de impressão 3D. Nossa missão é levar inovação, precisão e personalização para cada cliente.
          </p>
          <p className="text-gray-300">
            Trabalhamos com design e fabricação de peças únicas ou em pequenas séries, garantindo qualidade, rapidez e criatividade em cada projeto.
          </p>
        </div>
      </section>

      {/* SEÇÃO DE VALORES / DIFERENCIAIS */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform">
          <FaCube className="text-purple-500 text-4xl mx-auto mb-4"/>
          <h3 className="text-xl font-bold mb-2">Inovação</h3>
          <p className="text-gray-300">Estamos sempre buscando novas soluções e tecnologias para criar produtos únicos.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform">
          <FaCogs className="text-purple-500 text-4xl mx-auto mb-4"/>
          <h3 className="text-xl font-bold mb-2">Precisão</h3>
          <p className="text-gray-300">Cada peça é produzida com alta precisão e atenção aos mínimos detalhes.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform">
          <FaUsers className="text-purple-500 text-4xl mx-auto mb-4"/>
          <h3 className="text-xl font-bold mb-2">Personalização</h3>
          <p className="text-gray-300">Adaptamos nossos produtos às necessidades e sonhos de cada cliente.</p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Vamos Criar Juntos?</h2>
        <p className="text-gray-300 mb-6">Entre em contato e descubra como podemos transformar suas ideias em realidade com impressão 3D.</p>
        <a 
          href="/contato" 
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-md transition"
        >
          Fale Conosco
        </a>
      </section>
    </div>
  );
};

export default AboutUs;