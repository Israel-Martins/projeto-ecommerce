import { useEffect, useState } from "react";
import { AXIOS } from "../services";
import { useParams } from "react-router";
import { Meta, Title } from "react-head";

const PageProduct = () => {
    const { slug } = useParams();
    const [produto, setProduto] = useState(null);
    const [startIndex, setStartIndex] = useState(0); // primeira miniatura visível
    const [imagemAtiva, setImagemAtiva] = useState(0); // imagem principal
    const [quantidade, setQuantidade] = useState(1);
    const [cep, setCep] = useState("");
    const [frete, setFrete] = useState(null);

    useEffect(() => {
        async function buscarProduto() {
            try {
                const request = await AXIOS.get("/product");
                const produtoEncontrado = request.data.find(
                    (p) => p.slug.toLowerCase() === slug.toLowerCase()
                );
                setProduto(produtoEncontrado);
            } catch (error) {
                console.error("Erro ao buscar produto:", error.message);
            }
        }
        buscarProduto();
    }, [slug]);

    if (!produto) return <p className="text-center mt-10">Produto não encontrado...</p>;

    const imagens = produto?.imagens?.length
        ? produto.imagens
        : ["https://via.placeholder.com/400x400"];

    const precoFinal = produto ? produto.preco - (produto.preco * produto.desconto / 100) : 0;

    // Carrossel
    const next = () => {
        if (startIndex < imagens.length - 3) setStartIndex(startIndex + 1);
    };
    const prev = () => {
        if (startIndex > 0) setStartIndex(startIndex - 1);
    };

    // Calcular frete (exemplo)
    async function calcular(cep, peso) {
        try {
            const request = await AXIOS.post('/frete', {
                cep,
                peso
            })
            setFrete(request.data.preco)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <Title>{`3Dtech ${produto.name}`}</Title>
            <Meta name="description" content={produto.descricao} />
            <Meta name="keywords" content={`loja gamer, ${produto.name}`} />
            <Meta property="og:title" content={`3Dtech • ${produto.name}`} />
            <Meta property="og:description" content={produto.descricao} />
            <Meta property="og:image" content={produto.imagens[0]} />
            <Meta property="og:type" content="product" />

            <main>
                <div className="p-20 bg-(--bg) gap-10 flex justify-center text-white">

                    {/* GALERIA */}
                    <div className="flex flex-col items-center gap-8">

                        <img
                            src={imagens[imagemAtiva]}
                            alt="Imagem principal"
                            className="w-[520px] h-[520px] object-cover rounded-2xl shadow-2xl border border-gray-700 hover:scale-[1.02] transition duration-500"
                        />

                        <div className="flex items-center gap-4">
                            <button
                                onClick={prev}
                                disabled={startIndex === 0}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition disabled:opacity-30"
                            >
                                &lt;
                            </button>

                            <div className="flex gap-4">
                                {imagens.slice(startIndex, startIndex + 3).map((img, idx) => {
                                    const actualIndex = startIndex + idx;
                                    return (
                                        <img
                                            key={actualIndex}
                                            src={img}
                                            alt={`Miniatura ${actualIndex}`}
                                            onClick={() => setImagemAtiva(actualIndex)}
                                            className={`w-24 h-24 object-cover rounded-xl cursor-pointer transition-all duration-300
                ${actualIndex === imagemAtiva
                                                    ? "ring-2 ring-purple-500 scale-110"
                                                    : "opacity-70 hover:opacity-100"
                                                }`}
                                        />
                                    );
                                })}
                            </div>

                            <button
                                onClick={next}
                                disabled={startIndex >= imagens.length - 3}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition disabled:opacity-30"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>

                    {/* INFO PRODUTO */}
                    <div className="flex flex-col gap-8 p-8 rounded-2xl border border-white/10   max-w-md">

                        {/* Breadcrumb */}
                        <div className="text-sm text-gray-400">
                            <a href="/" className="hover:text-purple-400 transition">Início</a> &gt; <a
                                href={`/categoria/${produto.categoria.toLowerCase()}`}
                                className="hover:text-purple-400 transition"
                            >
                                {produto.categoria}
                            </a>
                            &gt;
                            <span className="text-gray-300">{produto.name}</span>
                        </div>

                        {/* Nome + Preço */}
                        <div>
                            <h1 className="text-3xl font-extrabold mb-4">{produto.name}</h1>

                            <div className="flex items-center gap-4">
                                <span
                                    className={`text-xl ${produto.desconto > 0 ? "line-through text-gray-500" : ""
                                        }`}
                                >
                                    R$ {produto.preco.toFixed(2)}
                                </span>

                                {produto.desconto > 0 && (
                                    <>
                                        <span className="text-3xl text-green-400 font-bold">
                                            R$ {precoFinal.toFixed(2)}
                                        </span>
                                        <span className="bg-green-500/20 text-green-400 px-3 py-1 text-sm rounded-full font-semibold">
                                            -{produto.desconto}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Quantidade + Comprar */}
                        <div className="flex gap-4">
                            <div className="flex items-center justify-between gap-6 bg-white/10 rounded-xl px-4 py-3">
                                <button
                                    onClick={() => quantidade > 1 && setQuantidade(quantidade - 1)}
                                    className="text-xl hover:text-purple-400 transition"
                                >
                                    −
                                </button>
                                <span className="font-bold text-lg">{quantidade}</span>
                                <button
                                    onClick={() =>
                                        quantidade < produto.estoque &&
                                        setQuantidade(quantidade + 1)
                                    }
                                    className="text-xl hover:text-purple-400 transition"
                                >
                                    +
                                </button>
                            </div>

                            <a
                                href=""
                                className="flex-1 text-center py-3  hover:bg-purple-700 bg-(--bgButton) cursor-pointer  rounded-xl font-bold text-lg shadow-lg   duration-300"
                            >
                                Comprar Agora
                            </a>
                        </div>

                        {/* Frete */}
                        <div className=" p-4 rounded-xl border border-white">
                            <p className="font-semibold mb-3">Calcular Frete</p>

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Seu CEP"
                                    className="flex-1 p-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-purple-500 transition"
                                    onChange={(e) => setCep(e.target.value)}
                                />
                                <button
                                    className="px-4 bg-(--bgButton)  cursor-pointer hover:bg-purple-700 rounded-lg font-semibold transition"
                                    onClick={() => calcular(cep, produto.peso)}
                                >
                                    OK
                                </button>
                            </div>

                            {frete && (
                                <p className="text-green-400 font-semibold mt-3">
                                    Frete estimado: R$ {frete}
                                </p>
                            )}
                        </div>

                        {/* Descrição */}
                        <div>
                            <h2 className="text-lg font-bold mb-2">Descrição</h2>
                            <p className=" wrap-break-word text-gray-300 leading-relaxed">
                                {produto.descricao}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>

    );
};

export default PageProduct;