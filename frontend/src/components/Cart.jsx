import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { CountContext } from "./ItemCount";
function Cart() {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const { user } = useContext(UserContext);
  const { setCount } = useContext(CountContext);
  useEffect(() => {
    axios.get("/cart").then((res) => {
      setCart(res.data);
    });
  }, []);
  useEffect(() => {
    let amt = 0;
    cart.forEach((p) => {
      amt = amt + p.price * p.qty;
    });
    setAmount(Math.floor(amt));
  }, [cart]);

  const checkout = () => {
    axios.post("/placeOrder", { cart, amount }).then(() => {
      setCart([]);
      setCount(0);
    });
  };

  return (
    <div className="space-y-12 mt-8">
      {cart.length > 0 &&
        cart.map(({ id, image, title, description, price, qty }) => (
          <div
            key={id}
            className="flex flex-col items-center sm:flex-row gap-4 sm:items-center border-2 border-gray-300 p-4 rounded-md"
          >
            {/* <div className="w-40 h-40"> */}
              <img src={image} alt="" className="w-32 object-contain" />
            {/* </div> */}

            <div className="flex flex-col space-between gap-4">
              <div className="font-bold">{title}</div>
              <div className="line-clamp-2 text-gray-500">{description}</div>
            </div>
            <div className="flex sm:flex-col gap-4 w-fit sm:items-end sm:w-[300px] ">
              <div className="bg-[#F7DB6A] p-2 rounded-md">{qty} unit</div>
              <div className="bg-[#F7DB6A] p-2 rounded-md">
                <span>&#8377;</span> {price * qty}
              </div>
            </div>
          </div>
        ))}
      <div className="flex justify-between items-center">
        <div className="w-full">
          Total Amount <span>&#8377;</span> {amount}
        </div>
        <button
          disabled={user ? false : true}
          className="primary"
          onClick={checkout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
