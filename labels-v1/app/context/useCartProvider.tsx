import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of a cart item
interface CartItem {
  id: number;
  title: string;
  price: number;
  name: string;
  quantity: number;
  size: string;
  image: string;
}

// Define context value type
interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, quantity: number) => void;
}

// Create context with default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Props type for provider
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart)); // Load it ONCE
      } catch (e) {
        console.error("Error parsing cart", e);
        localStorage.removeItem("cart");
      }
    }
  }, []); // ← empty array means "run this ONCE on mount"

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addItem = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateQty = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity < 1 ? 1 : quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook for using cart
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
