export default function OrderItem({ item }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <img
        src={item.product.imagens[0]}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-xl"
      />

      <div className="flex-1">
        <p className="font-medium">{item.product.name}</p>
        <p className="text-sm text-gray-500">
          Categoria: {item.product.categoria}
        </p>
        <p className="text-sm">
          Quantidade: {item.quantidade}
        </p>
      </div>

      <div className="font-semibold">
        R$ {(item.valor_unitario * item.quantidade).toFixed(2)}
      </div>
    </div>
  );
}