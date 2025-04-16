import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const product = products.find((p) => p.id.toString() === id);

  // Check if product is in cart on component mount and cart updates
  useEffect(() => {
    const checkCart = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cartItems.find(item => item.id.toString() === id);
      
      if (existingItem) {
        setIsInCart(true);
        setQuantity(existingItem.quantity);
      } else {
        setIsInCart(false);
        setQuantity(1);
      }
    };
    
    checkCart();
    
    // Add event listener for storage changes (in case cart is updated in another tab)
    window.addEventListener('storage', checkCart);
    
    return () => {
      window.removeEventListener('storage', checkCart);
    };
  }, [id]);
  const handleAddToCart = () => {
    if (!product) return;
  
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push({ id: product.id, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  
    setIsInCart(true);
    setQuantity(1);
  
    // Only for in-app context usage — won't affect localStorage structure
    if (addToCart) {
      addToCart({
        ...product,
        quantity: 1
      });
    }
  };
  
  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
  
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cartItems.map(item =>
      item.id.toString() === id
        ? { id: item.id, quantity: newQuantity }
        : item
    );
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setQuantity(newQuantity);
    window.dispatchEvent(new Event('storage'));
  };
  

  const incrementQuantity = () => {
    updateQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  };

  if (!product) {
    return (
      <div className="bg-black text-white min-h-screen animate-pulse">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="h-4 w-32 bg-gray-700 rounded mb-6" />
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Image Skeleton */}
            <div className="flex-1">
              <div className="bg-gray-800 h-96 w-full rounded-xl" />
            </div>

            {/* Text Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="h-8 w-3/4 bg-gray-700 rounded" />
              <div className="h-6 w-1/4 bg-gray-700 rounded" />
              <div className="h-4 w-1/2 bg-gray-700 rounded" />
              <div className="h-4 w-24 bg-gray-700 rounded" />

              <div className="space-y-2 pt-4 border-t border-gray-700">
                <div className="h-4 w-3/4 bg-gray-700 rounded" />
                <div className="h-4 w-1/2 bg-gray-700 rounded" />
                <div className="h-4 w-2/3 bg-gray-700 rounded" />
                <div className="h-4 w-1/3 bg-gray-700 rounded" />
                <div className="h-4 w-1/4 bg-gray-700 rounded" />
              </div>

              <div className="h-20 w-full bg-gray-700 rounded" />
              <div className="h-10 w-32 bg-yellow-600 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-24">
        <Link
          to="/"
          className="text-yellow-500 hover:underline text-sm mb-6 inline-block"
        >
          ← Back to Collections
        </Link>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Image */}
          <div className="flex-1 bg-gray-900 rounded-xl p-10 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-6">
            {product.tag && (
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 uppercase">
                {product.tag}
              </span>
            )}
            
            <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
            
            <div className="flex items-center space-x-2">
              <div className="text-yellow-500">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-sm text-gray-400">{product.rating}/5</span>
            </div>
            
            <p className="text-2xl text-yellow-500 font-bold">
              {product.price.toLocaleString()}
            </p>

            <div className="border-t border-gray-800 pt-6 space-y-3 text-sm text-gray-400">
              {product.strap && (
                <p className="flex">
                  <span className="w-24 font-medium text-gray-300">Strap:</span> 
                  <span>{product.strap}</span>
                </p>
              )}
              {product.movement && (
                <p className="flex">
                  <span className="w-24 font-medium text-gray-300">Movement:</span> 
                  <span>{product.movement}</span>
                </p>
              )}
              {product.diameter && (
                <p className="flex">
                  <span className="w-24 font-medium text-gray-300">Diameter:</span> 
                  <span>{product.diameter}</span>
                </p>
              )}
              {product.color && (
                <p className="flex">
                  <span className="w-24 font-medium text-gray-300">Color:</span> 
                  <span>{product.color}</span>
                </p>
              )}
              {product.collection && (
                <p className="flex">
                  <span className="w-24 font-medium text-gray-300">Collection:</span> 
                  <span>{product.collection}</span>
                </p>
              )}
            </div>

            <p className="text-gray-400">{product.description}</p>

            {/* Show different UI based on whether product is in cart */}
            {isInCart ? (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">Quantity:</span>
                  <div className="flex items-center border border-yellow-500 rounded">
                    <button 
                      onClick={decrementQuantity}
                      className="px-4 py-2 text-xl text-yellow-500 hover:bg-gray-800 focus:outline-none"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-6 py-2 text-lg">{quantity}</span>
                    <button 
                      onClick={incrementQuantity}
                      className="px-4 py-2 text-xl text-yellow-500 hover:bg-gray-800 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="mt-8 w-full py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 transition flex items-center justify-center space-x-2"
              >
                <span>Add to Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;