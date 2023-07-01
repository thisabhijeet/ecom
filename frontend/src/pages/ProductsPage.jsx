import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";

export default function IndexPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.length > 0 &&
        products.map(
          ({ id, title, price, description, category, image, rating }) => (
            <Product
              key={id}
              id={id}
              title={title}
              description={description}
              category={category}
              image={image}
              price={price}
              rating={rating}
            />
          )
        )}
    </div>
  );
}
