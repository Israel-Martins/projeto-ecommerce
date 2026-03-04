
const blogPosts = [
  {
    id: 1,
    title: "Como a impressão 3D transforma produtos personalizados",
    summary: "Descubra como a tecnologia 3D permite criar produtos exclusivos e sob medida para cada cliente.",
    date: "10 de Março de 2026",
    link: "/blog/impressoes-personalizadas"
  },
  {
    id: 2,
    title: "Materiais mais usados em impressão 3D",
    summary: "Conheça os principais materiais utilizados em impressoras 3D e suas aplicações em projetos reais.",
    date: "5 de Março de 2026",
    link: "/blog/materiais-3d"
  },
  {
    id: 3,
    title: "Dicas para otimizar seus projetos 3D",
    summary: "Aprenda técnicas para reduzir erros, economizar tempo e obter peças perfeitas na impressão 3D.",
    date: "1 de Março de 2026",
    link: "/blog/dicas-projetos-3d"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-8">
      {/* HEADER */}
      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog 3DTech</h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Fique por dentro das novidades, dicas e tendências da impressão 3D
        </p>
      </header>

      {/* LISTA DE POSTS */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-300 mb-4">{post.summary}</p>
            <p className="text-gray-500 text-sm mb-4">{post.date}</p>
            <a 
              href={post.link} 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition"
            >
              Ler mais
            </a>
          </div>
        ))}
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Quer saber mais sobre impressão 3D?</h2>
        <p className="text-gray-300 mb-6">
          Inscreva-se na nossa newsletter e receba novidades, dicas e conteúdos exclusivos.
        </p>
        <a 
          href="/contato" 
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-md transition"
        >
          Assinar Newsletter
        </a>
      </section>
    </div>
  );
};

export default Blog;