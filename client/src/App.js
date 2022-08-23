
// components
import Home from "./components/home/Home";
import {
  Routes,
  Route,
} from "react-router-dom";
import Product from "./components/product/Product";
import Header from "./components/Navbar/Header";
import { useEffect, useState } from "react";
import { getProducts } from "./service/api";
import Cart from "./components/cart/Cart";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userRedux";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jsonObj = JSON.parse(storedUser);
    if (storedUser) {
      dispatch(setUser({ user: jsonObj }));
    }
  }, [dispatch]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsFromBackend = async () => {
      const data = await getProducts();
      setProducts(data.data);
    };

    getProductsFromBackend();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product products={products} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
