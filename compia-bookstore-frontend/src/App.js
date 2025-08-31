import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminPanel from "./pages/AdimPanel";

function App() {
  return (
    <div>
     <header style={{ padding: "1rem", background: "#222", color: "white" }}>
        <h1>📚 COMPIA Bookstore</h1>
        <nav>
          <Link to="/" style={{ margin: "0 10px", color: "white" }}>Home</Link>
          <Link to="/carrinho" style={{ margin: "0 10px", color: "white" }}>Carrinho</Link>
          <Link to="/checkout" style={{ margin: "0 10px", color: "white" }}>Checkout</Link>
          <Link to="/painel" style={{ margin: "0 10px", color: "white" }}>Admin</Link>
        </nav>
      </header>

      <main style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/painel" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
