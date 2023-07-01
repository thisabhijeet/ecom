import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cart,setCart] = useState([]);
  useEffect(() => {
    axios.post("/cart", { cart });
  }, [cart]);
  return (
    <CartContext.Provider value={{ cart,setCart}}>
      {children}
    </CartContext.Provider>
  );
}
