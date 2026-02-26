import { useEffect, useState } from "react";
import { AXIOS } from "../services/index.js";
import OrderCard from "../components/OrderCard.jsx";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const request = await AXIOS.get("/orders");
        const data = request.data;
        setOrders(data);
      } catch (error) {
        console.error("Erro ao buscar pedidos", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-8">Carregando pedidos...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <p>Você ainda não possui pedidos.</p>
      ) : (
        orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))
      )}
    </div>
  );
}