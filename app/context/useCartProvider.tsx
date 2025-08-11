import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of a cart item
interface CartItem {
  id: number;
  title: string;
  price: number;
  name: string;
  qty: number;
  size: string;
  image: string;
}

// Define context value type
interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
}

// Create context with default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Props type for provider
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item (if exists, increase qty)
  const addItem = (item: Omit<CartItem, "qty">) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, qty: 1 }];
      }
    });
  };

  // Remove item (remove completely by id)
  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update quantity of an item
  const updateQty = (id: number, qty: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: qty < 1 ? 1 : qty } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for convenience with error handling
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
