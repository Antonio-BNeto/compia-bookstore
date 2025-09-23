import { AuthProvider } from "./contexts/auth/AuthContext";
import { ProductProvider } from "./contexts/product/ProductContext";
import { CartProvider } from "./contexts/cart/CartContext";
import { OrderProvider } from "./contexts/order/OrderContext";
import RoutesWrapper from "./routes";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <RoutesWrapper />
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
