import React, { useState } from 'react';
import { products } from './data/products';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Navbar } from './components/Navbar';
import { ImageSlider } from './components/ImageSlider';
import { Product, CartItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />

      <main>
        <ImageSlider />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your search.</p>
            </div>
          )}
        </div>

        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-md w-full">
              <Cart
                items={cartItems}
                onRemoveFromCart={removeFromCart}
                onCheckout={handleCheckout}
                onClose={() => setIsCartOpen(false)} 
              />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div id="about" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">About ShopEase</h2>
              <p className="text-gray-600">
                ShopEase is your one-stop destination for quality products at great prices. 
                We offer a wide selection of products ranging from electronics to fashion accessories.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600">
                Email: support@shopease.com<br />
                Phone: (555) 123-4567<br />
                Address: 123 Shopping Street, Retail City, RC 12345
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;