import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CountContext = createContext({});

export function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}
