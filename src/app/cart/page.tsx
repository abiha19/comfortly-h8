"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import { Product } from "@/types/products";
import { urlFor } from "@/src/sanity/lib/client";

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCartItems(getCartItems());
    const event = new CustomEvent("cart-updated");
    window.dispatchEvent(event);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.inventory + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.inventory > 1) {
      handleQuantityChange(id, product.inventory - 1);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price ? item.price * item.inventory : 0),
      0
    );
  };

  const handleProceedToCheckout = () => {
    Swal.fire({
      icon: "info",
      title: "Processing Your Order...",
      html: `<div class='flex justify-center items-center'>
               <div class='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
             </div>`,
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2000, // Simulating loading time
      didClose: () => {
        router.push("/checkout"); // Navigate to checkout page after loading
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
      </div>
      {cartItems.length > 0 ? (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center space-x-4 border-b pb-4">
              {item.image ? (
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.image?.alt || item.title || "Product image"}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              ) : (
                <Image
                  src="/placeholder.png"
                  alt="Placeholder Image"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-500">${item.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.inventory}</span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <RiDeleteBin6Line
                size={24}
                className="text-red-500 cursor-pointer"
                onClick={() => handleRemove(item._id)}
              />
            </div>
          ))}
          <div className="mt-4">
            <p className="text-lg font-semibold">Total: ${getTotalPrice()}</p>
            <button
              onClick={handleProceedToCheckout}
              className="mt-4 px-4 py-2 bg-[#007580] text-white rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p className="mt-4 text-lg font-semibold">Your cart is empty!</p>
          <p className="text-sm">Add some items to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
