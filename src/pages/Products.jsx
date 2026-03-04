import { useState, useEffect } from "react";
import { AXIOS } from "../services";
import { Link } from "react-router";
import { FaBoxOpen } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          AXIOS.get("/api/products"),
          AXIOS.get("/api/categories")
        ]);
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter(product =>
        product.nome.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoria_id === parseInt(selectedCategory));
    }

    if (priceMin) {
      filtered = filtered.filter(product => product.preco >= parseFloat(priceMin));
    }

    if (priceMax) {
      filtered = filtered.filter(product => product.preco <= parseFloat(priceMax));
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory, priceMin, priceMax, products]);

  const formatPrice = (valor, desconto) => {
    let final = Number(valor);
    if (desconto) {
      final = final - (final * Number(desconto)) / 100;
    }
    return `R$ ${final.toFixed(2)}`;
  };

  const getProductImage = (product) => {
    try {
      if (product.imagens) {
        const imagens = JSON.parse(product.imagens);
        if (Array.isArray(imagens) && imagens.length > 0) {
          return imagens[0];
        }
      }
    } catch (err) {
      console.error("Erro ao fazer parse das imagens:", err);
    }
    return null;
  };

  if (loading) {
    return <div className="text-center py-10">Carregando produtos...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2 text-[#EAEAEA] tracking-tight">Produtos</h1>
        <p className="text-[#808080] mb-8">Navegue por nossa coleção completa de produtos</p>

        {/* Filtros */}
        <div className="bg-[#1E1E1E] p-6 rounded-lg border border-[#2A2A2A] mb-8">
          <h2 className="text-sm uppercase tracking-widest text-[#808080] mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 py-2 text-[#EAEAEA] placeholder-[#808080] focus:outline-none focus:border-[#EAEAEA] transition-colors"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 py-2 text-[#EAEAEA] focus:outline-none focus:border-[#EAEAEA] transition-colors"
            >
              <option value="" className="bg-[#1E1E1E] text-[#EAEAEA]">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-[#1E1E1E] text-[#EAEAEA]">{cat.nome}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Preço mínimo"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 py-2 text-[#EAEAEA] placeholder-[#808080] focus:outline-none focus:border-[#EAEAEA] transition-colors"
            />
            <input
              type="number"
              placeholder="Preço máximo"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 py-2 text-[#EAEAEA] placeholder-[#808080] focus:outline-none focus:border-[#EAEAEA] transition-colors"
            />
          </div>
        </div>

        {/* Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const imageSrc = getProductImage(product);
            return (
              <div key={product.id} className="bg-[#1E1E1E] rounded-lg border border-[#2A2A2A] overflow-hidden hover:border-[#808080] transition-all duration-300 group">
                <div className="relative h-48 bg-[#0D0D0D] overflow-hidden">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={product.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : null}
                  {!imageSrc && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2A2A2A] to-[#161616]">
                      <FaBoxOpen size={48} className="text-[#2A2A2A]" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col  justify-between  ">
                  <h3 className="font-semibold text-lg mb-2 text-[#EAEAEA]">{product.nome}</h3>
                  <p className="text-[#B3B3B3] text-sm mb-4 line-clamp-2 h-15">{product.descricao}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#4FF8D9]">
                      {formatPrice(product.valor, product.desconto)}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-[#2A2A2A] text-[#EAEAEA] px-4 py-2 rounded-lg hover:bg-[#808080] transition-colors text-sm font-medium"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-[#808080]">
            <FaBoxOpen size={64} className="mx-auto mb-4 text-[#2A2A2A]" />
            <p className="text-lg">Nenhum produto encontrado com os filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;