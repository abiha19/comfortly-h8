import { Product } from "@/types/products";
import Swal from "sweetalert2";

// Add product to cart (with checks)
export const addToCart = (product: Product) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Check if item already exists
  const existingItem = cart.find((item: Product) => item._id === product._id);

  if (existingItem) {
    // Show prompt instead of adding again
    Swal.fire({
      title: "Item Already in Cart",
      text: "This item is already in your cart.",
      icon: "info",
    });
  } else {
    Swal.fire({
        icon: "success",
        title: `${product.title} added to cart!`,
        showConfirmButton: false,
        timer: 1000,
      });
    // Initialize inventory with 1 if not present
    cart.push({ ...product, inventory: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Remove product from cart
export const removeFromCart = (productId: string) => {
  let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

  // Remove product with matching ID
  cart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Update product quantity in cart
export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const productIndex = cart.findIndex((item) => item._id === productId);

  if (productIndex > -1) {
    cart[productIndex].inventory = isNaN(quantity) ? 1 : quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Get cart items from localStorage
export const getCartItems = (): Product[] => {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.map(item => ({
    ...item,
    inventory: isNaN(item.inventory) ? 1 : item.inventory
  }));
};