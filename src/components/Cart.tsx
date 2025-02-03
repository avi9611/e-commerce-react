import React, { useEffect, useRef } from "react";
import { CartItem } from "../types";
import { X, ShoppingCart } from "lucide-react";

interface CartProps {
  items: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export function Cart({
  items,
  onRemoveFromCart,
  onCheckout,
  onClose,
}: CartProps) {
  const cartRef = useRef<HTMLDivElement>(null);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Handle clicks outside the cart
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md" ref={cartRef}>
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <ShoppingCart size={24} />
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" ref={cartRef}>
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-gray-600">
                  ${item.product.price} × {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemoveFromCart(item.product.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
