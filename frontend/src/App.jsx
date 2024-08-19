import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./components/Cart";
import SIgnUp from "./components/SIgnUp";

function App() {
  return (
    <div>
      {/* <Cart /> */}
      <Navbar />
      {/* <SIgnUp/> */}

      <main>
        <Routes>
          <Route index element={<Hero />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:category" element={<Product />} />
          <Route path="/products/:category/:id/" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
