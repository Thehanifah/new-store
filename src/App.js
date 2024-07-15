import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Shop from './components/Shop';
import Navbar from './components/Navbar files/Navbar';
import Cart from './components/Cart';
import CartProvider from './components/Cartcontext';
import ProductDetail from './components/ProductDetail';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import PaymentPage from './components/PaymentPage';


function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const organizationId = "e85c76b135534056949dbe1e331bfd70"; 
        const appId = "IATTNAK97F6A7AO"; 
        const apiKey = "39a09a6f96aa439fb01e28aec781818220240712124513936181"; 
        const response = await axios.get('/api/products', {
          params: {
            organization_id: organizationId,
            reverse_sort: false,
            page: 1,
            size: 36,
            Appid: appId,
            Apikey: apiKey
          }
        });
        console.log(response)
        const data = response.data.items.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          Qty: item.available_quantity,
          current_price: item.current_price && item.current_price[0] && item.current_price[0].USD && item.current_price[0].USD[0] !== null ? item.current_price[0].USD[0] : 'N/A',
          photoUrl: item.photos && item.photos[0] ? `https://api.timbu.cloud/images/${item.photos[0].url}` : '',
          categories: item.categories.map(category => category.name),
         
        }));
        setProducts(data);
        console.log(data)
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchInput) => {
    const searchString = String(searchInput).trim();
    console.log('Search input:', searchInput);
   
  if (searchString) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchString)
    );
    console.log('Filtered products:', filteredProducts);
    setFilteredProducts(searchInput); 
    setIsSearching(true);
  } else {
    setFilteredProducts([]);
    setIsSearching(false);
  }
};
  

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar products={products} onSearchStateChange={setIsSearching} onSearch={handleSearch} />
          <Routes>
          <Route exact path="/" element={<Homepage products={products} isSearching={isSearching} filteredProducts={filteredProducts} setFilteredProducts ={setFilteredProducts} />} />
            <Route path="/shop" element={<Shop products={products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/order-summary" element={<OrderSummary/>} />
            <Route path="/payment" element={<PaymentPage/>} />
            <Route path="/product/:productId" element={<ProductDetail products={products} />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
