import { useState, useMemo, useEffect } from "react";
import { FaStar, FaRegStar, FaTruck, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contexts/CartProvider";
import { useParams } from "react-router";
import { AXIOS } from "../services";


export default function PageProduct() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [produto, setProduto] = useState({});
    const [imagemAtiva, setImagemAtiva] = useState(0);
    const [quantidade, setQuantidade] = useState(1);
    const [cep, setCep] = useState("");
    const [fretes, setFretes] = useState([]);
    const [loadingFrete, setLoadingFrete] = useState(false);

    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
    const [corSelecionada, setCorSelecionada] = useState(null);

    // =========================
    // Buscar produto
    // =========================
    useEffect(() => {
        async function buscarProduto() {
            try {
                const response = await AXIOS.get(`/api/products/${id}`);
                const data = response.data;
                setProduto(data);

                if (data.tamanhos) {
                    const tamanhos = JSON.parse(data.tamanhos);
                    setTamanhoSelecionado(tamanhos[0]);
                }

                if (data.cores) {
                    const cores = JSON.parse(data.cores);
                    setCorSelecionada(cores[0]);
                }

            } catch (error) {
                console.log("Erro ao buscar produto:", error);
            }
        }

        buscarProduto();
    }, [id]);

    // =========================
    // Cálculo de preço
    // =========================
    const preco = useMemo(() => {
        const valorNumero = Number(produto.valor || 0);
        const descontoNumero = Number(produto.desconto || 0);
        const final = valorNumero - (valorNumero * descontoNumero) / 100;

        return {
            final,
            pix: final * 0.95,
            parcela: final / 12
        };
    }, [produto]);

    // =========================
    // Média das avaliações
    // =========================
    const avaliacaoMedia = useMemo(() => {
        if (!produto.avaliacoes || produto.avaliacoes.length === 0) return 0;

        const total = produto.avaliacoes.reduce(
            (acc, item) => acc + Number(item.nota),
            0
        );

        return Number((total / produto.avaliacoes.length).toFixed(1));
    }, [produto]);

    // =========================
    // Calcular Frete (mock)
    // =========================
    async function calcularFrete() {
        if (!cep || cep.length < 8) return;
        setLoadingFrete(true);

        try {
            const mockFretes = [
                { id: 1, name: "PAC", price: 20.0, delivery_time: 5 },
                { id: 2, name: "SEDEX", price: 35.0, delivery_time: 2 }
            ];
            setFretes(mockFretes);
        } catch {
            setFretes([]);
        } finally {
            setLoadingFrete(false);
        }
    }

    // =========================
    // Adicionar ao carrinho
    // =========================
    const handleAddToCart = () => {
        if (produto.estoque === 0) return;

        addToCart({
            ...produto,
            quantidade,
            tamanhoSelecionado,
            corSelecionada
        });
    };

    const handleComprarAgora = () => {
        if (produto.estoque === 0) return;

        addToCart({
            ...produto,
            quantidade,
            tamanhoSelecionado,
            corSelecionada
        });
        // redirecionar para checkout se desejar
    };

    // =========================
    // Dados auxiliares
    // =========================
    const imagens = produto.produto_imagens || [];
    const tamanhos = produto.tamanhos ? JSON.parse(produto.tamanhos) : [];
    const cores = produto.cores ? JSON.parse(produto.cores) : [];

    return (
        <main className="min-h-screen bg-gray-50">

            {/* BREADCRUMB */}
            <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500">
                <a href="/">Home</a> /{" "}
                <a href="#">{produto.categoria?.nome || "Categoria"}</a> /{" "}
                <span className="text-black">{produto.nome}</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12">

                {/* GALERIA */}
                <div>
                    <div className="bg-white rounded-2xl shadow p-6">
                        {imagens[imagemAtiva] && (
                            <img
                                src={imagens[imagemAtiva].url}
                                className="w-full h-[450px] object-contain"
                                alt={produto.nome}
                            />
                        )}
                    </div>

                    <div className="flex gap-4 mt-4">
                        {imagens.map((img, i) => (
                            <img
                                key={img.id}
                                src={img.url}
                                onClick={() => setImagemAtiva(i)}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition 
                                ${imagemAtiva === i ? "border-black" : "border-transparent"}`}
                                alt="Miniatura"
                            />
                        ))}
                    </div>
                </div>

                {/* INFORMAÇÕES */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{produto.nome}</h1>

                    {/* Avaliação */}
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            star <= avaliacaoMedia
                                ? <FaStar key={star} className="text-yellow-400" />
                                : <FaRegStar key={star} className="text-gray-300" />
                        ))}
                        <span className="text-sm text-gray-500">
                            ({avaliacaoMedia} de 5)
                        </span>
                    </div>

                    {/* Preço */}
                    <div className="space-y-1">
                        {produto.desconto > 0 && (
                            <div className="text-sm text-gray-400 line-through">
                                R$ {Number(produto.valor).toFixed(2)}
                            </div>
                        )}
                        <div className="text-4xl font-bold">
                            R$ {preco.final.toFixed(2)}
                        </div>
                        <div className="text-green-600 font-medium">
                            5% OFF no PIX → R$ {preco.pix.toFixed(2)}
                        </div>
                        <div className="text-gray-500 text-sm">
                            ou 12x de R$ {preco.parcela.toFixed(2)} sem juros
                        </div>
                    </div>

                    {/* Estoque */}
                    <div>
                        {produto.estoque > 0 ? (
                            <span className="text-green-600 font-medium">
                                {produto.estoque} unidades disponíveis
                            </span>
                        ) : (
                            <span className="text-red-600 font-medium">
                                Produto esgotado
                            </span>
                        )}
                    </div>

                    {/* Tamanho */}
                    {tamanhos.length > 0 && (
                        <div>
                            <span className="font-medium mr-2">Tamanho:</span>
                            {tamanhos.map(tam => (
                                <button
                                    key={tam}
                                    onClick={() => setTamanhoSelecionado(tam)}
                                    className={`px-3 py-1 mr-2 mb-2 rounded-lg border 
                                    ${tamanhoSelecionado === tam ? "bg-black text-white" : "bg-white text-black"}`}
                                >
                                    {tam}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Cor */}
                    {cores.length > 0 && (
                        <div>
                            <span className="font-medium mr-2">Cor:</span>
                            {cores.map(cor => (
                                <button
                                    key={cor}
                                    onClick={() => setCorSelecionada(cor)}
                                    className={`px-3 py-1 mr-2 mb-2 rounded-lg border 
                                    ${corSelecionada === cor ? "bg-black text-white" : "bg-white text-black"}`}
                                >
                                    {cor}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Quantidade */}
                    <div className="flex items-center gap-4">
                        <span className="font-medium">Quantidade:</span>
                        <div className="flex border rounded-lg overflow-hidden">
                            <button
                                onClick={() => quantidade > 1 && setQuantidade(q => q - 1)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                            >-</button>

                            <div className="px-6 py-2">{quantidade}</div>

                            <button
                                onClick={() =>
                                    quantidade < produto.estoque &&
                                    setQuantidade(q => q + 1)
                                }
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                            >+</button>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-4">
                        <button
                            disabled={produto.estoque === 0}
                            onClick={handleAddToCart}
                            className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2
                            ${produto.estoque === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black text-white hover:opacity-90"}`}
                        >
                            <FaShoppingCart /> Adicionar ao Carrinho
                        </button>

                        <button
                            disabled={produto.estoque === 0}
                            onClick={handleComprarAgora}
                            className={`flex-1 py-4 rounded-xl
                            ${produto.estoque === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 text-white hover:bg-green-700"}`}
                        >
                            Comprar Agora
                        </button>
                    </div>

                    {/* Informações Técnicas */}
                    <div className="bg-gray-100 rounded-xl p-6 space-y-2">
                        <h3 className="font-semibold text-lg">
                            Informações Técnicas
                        </h3>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong>Peso:</strong> {produto.peso} kg</div>
                            <div><strong>Altura:</strong> {produto.altura} cm</div>
                            <div><strong>Largura:</strong> {produto.largura} cm</div>
                            <div><strong>Comprimento:</strong> {produto.comprimento} cm</div>
                        </div>
                    </div>

                    {/* Frete */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <FaTruck /> Calcular Frete
                        </h3>

                        <div className="flex gap-3">
                            <input
                                placeholder="Digite seu CEP"
                                value={cep}
                                onChange={e => setCep(e.target.value)}
                                className="border rounded-lg p-3 flex-1"
                            />
                            <button
                                onClick={calcularFrete}
                                className="bg-black text-white px-6 rounded-lg"
                            >
                                {loadingFrete ? "..." : "Calcular"}
                            </button>
                        </div>

                        {fretes.map(frete => (
                            <div key={frete.id} className="flex justify-between border rounded-lg p-4">
                                <div>
                                    <div className="font-medium">{frete.name}</div>
                                    <div className="text-sm text-gray-500">
                                        Entrega em {frete.delivery_time} dias
                                    </div>
                                </div>
                                <div className="font-bold">
                                    R$ {frete.price}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Descrição */}
            <div className="bg-white py-16 border-t">
                <div className="max-w-4xl mx-auto px-6 space-y-6">
                    <h2 className="text-2xl font-bold">
                        Descrição do Produto
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {produto.descricao}
                    </p>
                </div>
            </div>

        </main>
    );
}