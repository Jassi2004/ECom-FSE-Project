import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortOption, setSortOption] = useState("Featured");

  const [cart, setCart] = useState(() => {
    // Check localStorage for saved cart
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart || []; // If cart doesn't exist, initialize as empty array
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch luxury watches
        const luxuryRes = await fetch("/watches.json");
        if (!luxuryRes.ok) {
          throw new Error(`Luxury watches fetch failed: ${luxuryRes.status}`);
        }
        const luxuryData = await luxuryRes.json();
  
        // Step 2: Fetch general products
        const generalRes = await fetch("https://dummyjson.com/products?limit=194");
        if (!generalRes.ok) {
          throw new Error(`General products fetch failed: ${generalRes.status}`);
        }
        const generalData = await generalRes.json();
  
        // Normalize general products to match luxury watch schema
        const normalizedProducts = generalData.products.map((item) => ({
          id: item.id + 10000, // offset IDs to avoid collisions
          name: item.title || "Untitled",
          price: `$${item.price.toFixed(2)}`,
          numericPrice: item.price,
          description: item.description,
          image: item.thumbnail || item.images?.[0] || "",
          tag: item.tags?.[0] || item.category || "General",
          color: "N/A", // Default or placeholder
          strap: "N/A",
          movement: "N/A",
          collection: item.brand || "Generic",
          diameter: "N/A",
          rating: item.rating || 0
        }));
  
        // Merge luxury + normalized general products
        const allProducts = [...luxuryData, ...normalizedProducts];
        setProducts(sortProducts(allProducts, sortOption)); // Apply sorting on fetch
  
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
  
    fetchData();
  }, []); // Fetch only once, when the component mounts

  useEffect(() => {
    // Sync cart to localStorage whenever cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productWithQuantity) => {
    setCart((prevCart) => {
      // Check if product is already in cart
      const existingProductIndex = prevCart.findIndex(
        item => item.id === productWithQuantity.id
      );

      if (existingProductIndex !== -1) {
        // If product exists, create a new array with the updated quantity
        const updatedCart = [...prevCart];
        // Add the new quantity to the existing quantity
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + productWithQuantity.quantity
        };
        return updatedCart;
      } else {
        // If product is not in cart, add it with the specified quantity
        return [...prevCart, productWithQuantity];
      }
    });
  };

  // Update quantity of a specific cart item
  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Function to sort products based on the selected option
  const sortProducts = (products, option) => {
    switch (option) {
      case "Price: High to Low":
        return products.sort((a, b) => b.numericPrice - a.numericPrice);
      case "Price: Low to High":
        return products.sort((a, b) => a.numericPrice - b.numericPrice);
      case "Newest":
        return products.sort((a, b) => b.id - a.id); // Assuming newer products have higher ID
      case "Most Popular":
        return products.sort((a, b) => b.rating - a.rating); // Assuming higher rating means more popular
      default:
        return products; // No sorting for "Featured" or other default
    }
  };

  // Function to update sorting option
  const updateSortOption = (option) => {
    setSortOption(option);
    setProducts(sortProducts([...products], option)); // Re-sort products when option changes
  };

  return (
    <AppContext.Provider value={{ 
      products, 
      pageNumber, 
      setPageNumber, 
      updateSortOption,
      cart, 
      addToCart,
      updateCartItemQuantity,
      removeFromCart
    }}>
      {children}
    </AppContext.Provider>
  );
}