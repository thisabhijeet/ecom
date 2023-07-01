import "./App.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";
import { CountContextProvider } from "./components/ItemCount";
import { CartContextProvider } from "./components/CartItems";
import Layout from "./components/Layout";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Cart from "./components/Cart";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <CountContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </CartContextProvider>
      </CountContextProvider>
    </UserContextProvider>
  );
}

export default App;
