"use client";

import React, { useEffect, useState } from "react";
import { getCartItems } from "../actions/actions";
import { Product } from "@/types/products";
import { useRouter } from "next/navigation";
import { client } from "@/src/sanity/lib/client";
import Swal from "sweetalert2";

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setCartItems(getCartItems());
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "Cash on Delivery",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10,15}$/;
    const zipPattern = /^[0-9]{4,6}$/;
    const cardPattern = /^[0-9]{16}$/;
    const cvvPattern = /^[0-9]{3,4}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!formData.fullName.trim()) return "Full Name is required.";
    if (!emailPattern.test(formData.email)) return "Enter a valid email address.";
    if (!phonePattern.test(formData.phone)) return "Enter a valid phone number.";
    if (!formData.address.trim()) return "Address is required.";
    if (!zipPattern.test(formData.zipCode)) return "Enter a valid ZIP Code.";

    if (formData.paymentMethod === "Credit Card") {
      if (!cardPattern.test(formData.cardNumber)) return "Enter a valid 16-digit card number.";
      if (!expiryPattern.test(formData.expiryDate)) return "Enter expiry in MM/YY format.";
      if (!cvvPattern.test(formData.cvv)) return "Enter a valid 3-4 digit CVV.";
    }

    return null;
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMessage = validateForm();
    if (errorMessage) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
      return;
    }

    const orderData = {
      _type: "order",
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      orderDate: new Date().toISOString(),
      paymentMethod: formData.paymentMethod,
      totalAmount: cartItems.reduce((total, item) => total + (item.price || 0) * item.inventory, 0),
      totalItems: cartItems.reduce((total, item) => total + item.inventory, 0),
      items: cartItems.map((item) => ({
        _key: item._id,
        product: { _type: "reference", _ref: item._id },
        quantity: item.inventory,
        price: item.price,
      })),
      status: "Pending",
      paymentDetails:
        formData.paymentMethod === "Credit Card"
          ? { cardNumber: formData.cardNumber, expiryDate: formData.expiryDate, cvv: formData.cvv }
          : null,
    };

    try {
      await client.create(orderData);

      localStorage.removeItem("cart");
      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: "Your order has been placed successfully.",
      }).then(() => {
        router.push("/cart");
        window.dispatchEvent(new CustomEvent("cart-updated"));
      });
    } catch (error) {
      console.error("Order placement error:", error); // Log the error to the console
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Failed to place order. Try again! ",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#005f5f",
      });
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#007580]">Checkout</h2>

      {loading ? (
        <p className="text-center text-xl flex justify-center items-center">Loading your order details...</p>
      ) : cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#007580]">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between border-b py-2">
                <span>{item.title} (x{item.inventory})</span>
                <span>${(item.price * item.inventory).toFixed(2)}</span>
              </div>
            ))}
            <p className="text-lg font-semibold mt-4 text-[#007580]">Total Items: {cartItems.reduce((total, item) => total + item.inventory, 0)}</p>
            <p className="text-lg font-semibold text-[#007580]">Total Price: ${cartItems.reduce((total, item) => total + (item.price || 0) * item.inventory, 0).toFixed(2)}</p>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold mb-2 text-[#007580]">Customer Details</h3>

            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />

            <h3 className="text-lg font-semibold mt-4 text-[#007580]">Delivery Address</h3>
            <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} className="w-full p-2 border rounded" required />

            <h3 className="text-lg font-semibold mt-4 text-[#007580]">Payment Method</h3>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
            </select>

            {formData.paymentMethod === "Credit Card" && (
              <>
                <h3 className="text-lg font-semibold mt-4 text-[#007580]">Credit Card Details</h3>
                <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" value={formData.expiryDate} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} className="w-full p-2 border rounded" required />
              </>
            )}

            <button type="submit" className="w-full bg-[#007580] text-white p-2 rounded hover:bg-[#005f5f] transition-colors">
              Confirm Order
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">Your cart is empty. Go back and add items.</p>
      )}
    </div>
  );
};

export default Checkout;