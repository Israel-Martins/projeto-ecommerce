import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartProvider";
import { FaTruck, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/UsuarioProvider";

const Checkout = () => {
  const { cart, totalItems } = useCart();
  const { user } = useUser()
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(0);
  const [cupom, setCupom] = useState("");
  const [payment, setPayment] = useState("pix");
  const navigate = useNavigate()

  const subtotal = cart.reduce((acc, item) => acc + Number(item.valor) * item.quantidade, 0);
  const total = subtotal + frete;
  useEffect(() => {
    if (!user) navigate('/')
  }, [])

  const handleCalculateShipping = () => {
    if (!cep || cep.length < 8) return;
    setFrete(15); // frete simulado
  };

  const handleApplyCoupon = () => {
    if (cupom === "DESCONTO10") alert("Cupom aplicado! 10% de desconto");
    else alert("Cupom inválido");
  };

  const handleFinalizePurchase = () => {
    if (payment === "pix") {
      alert(`Pagamento via Pix selecionado. Total: R$ ${total.toFixed(2)}`);
    } else if (payment === "card") {
      alert(`Pagamento via Cartão de Crédito selecionado. Total: R$ ${total.toFixed(2)}`);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* FORMULÁRIO PRINCIPAL */}
        <div className="lg:col-span-2 space-y-6">

          {/* DADOS DO CLIENTE */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-700 shadow-md space-y-4">
            <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Dados do Cliente</h2>
            <input type="text" placeholder="Nome completo" className="w-full p-3 rounded-md border border-gray-700 text-white" />
            <input type="email" placeholder="E-mail" className="w-full p-3 rounded-md border border-gray-700 text-white" />
            <input type="text" placeholder="Telefone" className="w-full p-3 rounded-md border border-gray-700 text-white" />
          </div>

          {/* ENDEREÇO E FRETE */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-700 shadow-md space-y-4">
            <h2 className="text-xl font-bold border-b border-gray-700 pb-2 flex items-center gap-2">
              <FaTruck /> Entrega e Frete
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="flex-1 p-3 rounded-md border border-gray-700 text-white"
              />
              <button
                onClick={handleCalculateShipping}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-md font-semibold"
              >
                Calcular
              </button>
            </div>
            {frete > 0 && <p className="text-green-400 font-semibold">Frete: R$ {frete.toFixed(2)}</p>}

            <input type="text" placeholder="Rua, Número, Complemento" className="w-full p-3 rounded-md border border-gray-700 text-white" />
            <input type="text" placeholder="Bairro" className="w-full p-3 rounded-md border border-gray-700 text-white" />
            <input type="text" placeholder="Cidade / Estado" className="w-full p-3 rounded-md border border-gray-700 text-white" />
          </div>

          {/* CUPOM */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-700 shadow-md flex gap-3 items-center">
            <input
              type="text"
              placeholder="Cupom de desconto"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              className="flex-1 p-3 rounded-md border border-gray-700 text-white"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold"
            >
              Aplicar
            </button>
          </div>

          {/* PAGAMENTO */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-700 shadow-md space-y-4">
            <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Pagamento</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className={`p-4 border rounded-md flex items-center gap-3 cursor-pointer ${payment === "pix" ? "border-purple-600 text-white" : ""}`}>
                <FaMoneyBillWave className="text-purple-600" /> Pix
                <input type="radio" checked={payment === "pix"} onChange={() => setPayment("pix")} className="hidden" />
              </label>
              <label className={`p-4 border rounded-md flex items-center gap-3 cursor-pointer ${payment === "card" ? "border-purple-600 text-white" : ""}`}>
                <FaCreditCard className="text-purple-600" /> Cartão de Crédito
                <input type="radio" checked={payment === "card"} onChange={() => setPayment("card")} className="hidden" />
              </label>
            </div>

            {/* Campos extras para cartão */}
            {payment === "card" && (
              <div className="space-y-4 mt-4">
                <input type="text" placeholder="Número do cartão" className="w-full p-3 rounded-md border border-gray-700 text-white" />
                <div className="flex gap-3">
                  <input type="text" placeholder="Validade" className="flex-1 p-3 rounded-md border border-gray-700 text-white" />
                  <input type="text" placeholder="CVV" className="w-24 p-3 rounded-md border border-gray-700 text-white" />
                </div>
              </div>
            )}

            {/* Mensagem Pix */}
            {payment === "pix" && (
              <p className="text-green-400 font-semibold mt-2">Você escolheu pagamento via Pix.</p>
            )}
          </div>

          <button
            onClick={handleFinalizePurchase}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-5 rounded-md text-lg transition"
          >
            Finalizar Compra
          </button>
        </div>

        {/* RESUMO DO PEDIDO */}
        <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-700 shadow-md space-y-4 sticky top-8 h-fit">
          <h3 className="text-xl font-bold border-b border-gray-700 pb-2">Resumo do Pedido ({totalItems} itens)</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between border-b border-gray-700 py-2">
                <div>
                  <p className="font-semibold">{item.nome}</p>
                  <p className="text-gray-400 text-sm">R$ {(Number(item.valor) * item.quantidade).toFixed(2)}</p>
                </div>
                <div>{item.quantidade}x</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-gray-400">Subtotal: <span>R$ {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-400">Frete: <span>R$ {frete.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-lg">Total: <span>R$ {total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;