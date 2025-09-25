import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../contexts/cart/CartContext";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function CartItem({ item }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
      <Link to={`/products/${item.bookId}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-28 object-cover rounded-md transition-transform hover:scale-105"
        />
      </Link>
      <div className="flex-grow">
        <Link to={`/products/${item.bookId}`} className="hover:underline">
          <h3 className="font-semibold text-lg">{item.title}</h3>
        </Link>
        <p className="text-sm text-text-muted">{item.author}</p>
        <p className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full inline-block mt-1">{item.type}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
          <Button
            onClick={() => decreaseQuantity(item.sku)}
            disabled={item.quantity <= 1}
            className="p-2 disabled:opacity-50"
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} />
          </Button>
          <span className="px-3 font-semibold text-center w-12">{item.quantity}</span>
          <Button 
            onClick={() => increaseQuantity(item.sku)} 
            className="p-2"
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} />
          </Button>
        </div>
        
        <p className="font-bold text-primary text-lg w-24 text-right">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>

        <Button
          onClick={() => removeFromCart(item.sku)}
          className="text-text-muted hover:text-error transition-colors text-sm flex items-center gap-1"
        >
          <Trash2 size={14} /> Remover
        </Button>
      </div>
    </div>
  );
}