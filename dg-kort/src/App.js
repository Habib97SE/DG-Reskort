import React, { useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import CartItem from "./components/CartItem";
import Cart from "./components/Cart";
import image from "./assets/images/visby.jpeg";
import NewCustomer from "./components/NewCustomer";
import Table from "./components/Table";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    // add id to item object to make it unique in the cart
    while (true) {
      item.id = Math.floor(Math.random() * 1000000);
      if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
        break;
      }
    }
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Navbar
        title="Destination Gotland"
        navItems={["Home", "About", "Contact"]}
      />
      <div className="container">
        <div className="row">
          <header className="col-8 center mx-auto">
            <img src={image} alt="header" className="img-fluid" />
          </header>
        </div>
      </div>
      <div className="container">
        <div className="row mg-auto">
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">
            <NewCustomer addItemToCart={addItemToCart} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-2 col-lg-4  col-xl-3">
            <Cart items={cartItems} emptyCart={emptyCart} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
