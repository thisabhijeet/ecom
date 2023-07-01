import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CountContext } from "./ItemCount";
import { CartContext } from "./CartItems";

function Product({ id, title, price, description, category, image, rating }) {
  const { setCount } = useContext(CountContext);
  const { cart, setCart } = useContext(CartContext);

  const addItemToBasket = () => {
    let tc = [...cart];
    let p = tc.find((pr) => pr.id == id);
    // console.log(p);
    if (p) {
      tc = tc.filter((pr) => pr.id != id);
      p.qty++;
      tc.push(p);
    } else {
      tc.push({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
        qty: 1,
      });
    }
    setCart(tc);
    // console.log(cart);
    setCount((prev) => {
      return (prev = prev + 1);
    });
  };

  return (
    <div className="relative flex flex-col mt-6 p-8 bg-white border-2 border-gray-300 rounded-md">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <img src={image} className="h-40 object-contain" />
      <div className="flex flex-col grow">
        <div className="flex flex-col grow">
          <h4 className="my-3 font-bold">{title}</h4>
          <p className="text-xs my-2 line-clamp-3 text-gray-500">{description}</p>
        </div>
        <div className="flex">
          {Array(Math.floor(rating.rate))
            .fill()
            .map((_, i) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                key={id + i}
                className="h-5 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
        </div>
        <div className="my-4"><span>&#8377;</span> {price}</div>
        <button
          onClick={addItemToBasket}
          className="mt-auto primary"
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default Product;
