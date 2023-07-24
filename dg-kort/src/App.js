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
    // if item already exists in cart, return false
    for (let i = 0; i < cartItems.length; i++) {
      if (
        cartItems[i].accountNumber === item.accountNumber &&
        cartItems[i].customerName === item.name
      ) {
        console.log("Customer already exists in cart.");
        return false;
      }
    }

    // add id to item object to make it unique in the cart
    while (true) {
      item.id = Math.floor(Math.random() * 1000000);
      if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
        break;
      }
    }
    setCartItems((prevItems) => [...prevItems, item]);
    return true;
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Navbar
              title="Destination Gotland"
              navItems={["Home", "About", "Contact"]}
            />
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-10 mx-auto">
        <div className="container">
          <div className="row">
            <header className="col-12 center mx-auto">
              <img src={image} alt="header" className="img-fluid" />
            </header>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-8">
              <NewCustomer addItemToCart={addItemToCart} />
            </div>

            <div className="col-xs-12 col-lg-4">
              <Cart items={cartItems} emptyCart={emptyCart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
