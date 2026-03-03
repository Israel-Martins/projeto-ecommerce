import React, { useState } from 'react';
import ShippingSection from '../components/ShippingSection';

const InputField = ({ placeholder }) => (
  <input 
    type="text" 
    placeholder={placeholder}
    className="border border-gray-300 rounded-md p-3 bg-slate-700 text-white focus:ring-2 focus:ring-purple-500 outline-none w-full"
  />
);

const Checkout = () => {
  // 1. Criamos o estado para controlar qual etapa estamos (shipping ou payment)
  const [step, setStep] = useState('shipping'); 
  const [selectedShipping, setSelectedShipping] = useState(null);
  
  const PRODUCT_PRICE = 65.00;
  const SHIPPING_COST = selectedShipping ? parseFloat(selectedShipping.price) : 0;

  return (
    <div className="min-h-screen bg-slate-800 p-4 md:p-8 font-sans text-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* BARRA DE PROGRESSO DINÂMICA */}
          <div className="flex justify-between items-center text-xs border-b border-slate-700 pb-4 uppercase font-bold">
            <span className="opacity-50">✓ Carrinho</span>
            <span className={step === 'shipping' ? "text-purple-500 underline underline-offset-8" : "opacity-50"}>Entrega</span>
            <span className={step === 'payment' ? "text-purple-500 underline underline-offset-8" : "opacity-50"}>Pagamento</span>
          </div>

          {/* RENDERIZAÇÃO CONDICIONAL: Só mostra se step for 'shipping' */}
          {step === 'shipping' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section className="space-y-4">
                <h2 className="text-lg font-semibold uppercase">Dados de Contato</h2>
                <InputField placeholder="Seu melhor e-mail" />
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-semibold uppercase">Entrega</h2>
                <ShippingSection 
                  originCep="60713300" 
                  onShippingSelect={(opt) => setSelectedShipping(opt)} 
                />
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-semibold uppercase">Dados para Recebimento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField placeholder="Nome" />
                  <InputField placeholder="Sobrenome" />
                </div>
                <InputField placeholder="CPF ou CNPJ" />
              </section>

              <button 
                onClick={() => setStep('payment')} // Muda para a próxima etapa
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-5 rounded-md transition-all uppercase tracking-widest"
              >
                Ir para o Pagamento
              </button>
            </div>
          )}

          {/* TELA DE PAGAMENTO: Só mostra se step for 'payment' */}
          {step === 'payment' && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <h2 className="text-xl font-bold uppercase border-l-4 border-purple-500 pl-4">Escolha o Pagamento</h2>
              
              <div className="grid gap-4">
                <label className="flex items-center p-4 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700">
                  <input type="radio" name="payment" className="w-5 h-5 accent-purple-500" />
                  <span className="ml-4 font-semibold">Pix (5% de desconto)</span>
                </label>
                
                <label className="flex items-center p-4 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700">
                  <input type="radio" name="payment" className="w-5 h-5 accent-purple-500" />
                  <span className="ml-4 font-semibold">Cartão de Crédito</span>
                </label>
              </div>

              <div className="flex gap-4">
                 <button 
                  onClick={() => setStep('shipping')}
                  className="w-1/3 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-md uppercase text-sm"
                >
                  Voltar
                </button>
                <button className="w-2/3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-md uppercase">
                  Finalizar Compra
                </button>
              </div>
            </div>
          )}
        </div>

        {/* COLUNA DIREITA (RESUMO) - Mantém-se visível em ambas as etapas */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 sticky top-8 shadow-2xl text-white">
            <h3 className="text-md font-bold mb-6 border-b border-slate-800 pb-2">Resumo</h3>
            <div className="flex gap-4 mb-6 items-center border-b border-slate-800 pb-6">
              <div className="w-16 h-16 bg-slate-800 rounded border border-slate-700"></div>
              <div className="text-sm">
                <p className="font-semibold leading-tight">Camisa Straykids - Dominate</p>
                <p className="text-emerald-400 font-bold text-lg">R$ 65,00</p>
              </div>
            </div>

            <div className="space-y-3 text-sm pt-2">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>R$ {PRODUCT_PRICE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Frete</span>
                <span className="text-emerald-400 font-bold">{SHIPPING_COST > 0 ? `R$ ${SHIPPING_COST.toFixed(2)}` : '--'}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-slate-800 mt-2">
                <span>Total</span>
                <span>R$ {(PRODUCT_PRICE + SHIPPING_COST).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;