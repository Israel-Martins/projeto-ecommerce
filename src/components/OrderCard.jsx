import { useState } from "react";
import OrderItem from "./OrderItem.jsx";

export default function OrderCard({ order }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">Pedido #{order.id}</p>
          <p className="text-sm text-gray-500">{order.date}</p>
          <p className="text-sm">Status: {order.status}</p>
        </div>

        <div className="text-right">
          <p className="font-bold text-lg">
            R$ {order.valor_total.toFixed(2)}
          </p>
          <button
            onClick={() => setOpen(!open)}
            className="mt-2 text-sm text-blue-600"
          >
            {open ? "Ocultar detalhes" : "Ver detalhes"}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-6 border-t pt-4">
          {order.items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}