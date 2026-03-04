import React, { useState } from "react";

const fakeOrders = {
    "3DTECH123": [
        { step: "Pedido recebido", date: "01/03/2026", done: true },
        { step: "Produção iniciada", date: "02/03/2026", done: true },
        { step: "Em transporte", date: "03/03/2026", done: false },
        { step: "Entregue", date: "04/03/2026", done: false },
    ],
    "3DTECH456": [
        { step: "Pedido recebido", date: "28/02/2026", done: true },
        { step: "Produção iniciada", date: "01/03/2026", done: true },
        { step: "Em transporte", date: "02/03/2026", done: true },
        { step: "Entregue", date: "03/03/2026", done: false },
    ]
};

const OrderTracking = () => {
    const [orderNumber, setOrderNumber] = useState("");
    const [status, setStatus] = useState(null);

    const handleTrackOrder = () => {
        const order = fakeOrders[orderNumber.toUpperCase()];
        if (order) setStatus(order);
        else setStatus([]);
    };

    return (
        <div className="min-h-screen  text-white font-sans p-8">
            {/* HEADER */}
            <header className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Rastreio de Pedido</h1>
                <p className="text-gray-400 text-lg md:text-xl">
                    Acompanhe o status do seu pedido 3DTech em tempo real
                </p>
            </header>

            {/* INPUT DE PEDIDO */}
            <div className="max-w-2xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Digite o número do pedido"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="flex-1 p-3 rounded-md border border-gray-700 text-black"
                />
                <button
                    onClick={handleTrackOrder}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition"
                >
                    Rastrear
                </button>
            </div>

            {/* STATUS DO PEDIDO */}
            {status && status.length > 0 ? (
                <div className="max-w-2xl mx-auto space-y-6">
                    {status.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full flex-shrink-0 ${step.done ? "bg-purple-600" : "bg-gray-700"}`}></div>
                            <div>
                                <p className="font-bold">{step.step}</p>
                                <p className="text-gray-400 text-sm">{step.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : status && status.length === 0 ? (
                <p className="text-center text-red-500 font-semibold">Pedido não encontrado. Verifique o número e tente novamente.</p>
            ) : null}
        </div>
    );
};

export default OrderTracking;