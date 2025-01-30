"use client"

import React, { useEffect } from "react";
import NewsletterInstagram from "../components/Instagram";
import AllProduct from "../components/allProducts";

const Page = () => {
  useEffect(() => {
    // If you need to perform any side effects related to the cart, you can do it here
    // const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  }, []);

  return (
    <div>
      <AllProduct />
      <NewsletterInstagram />
    </div>
  );
};

export default Page;