import React, { useState, useEffect, useRef } from "react";
import CartItem from "./CartItem";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const cartStyles = {
  fontSize: "1.2rem",
  backgroundColor: "#f4f4f4",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
  padding: "1rem",
  margin: "1rem 0",
  borderRadius: "0.5rem",
};

const Cart = (props) => {
  const [cartItems, setCartItems] = useState(props.items);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if 'D' key (key code 68) is pressed
      if (event.keyCode === 68 && event.ctrlKey && event.shiftKey) {
        // Trigger the button click when 'CTRL' + 'SHIFT' + 'D' keys are pressed
        buttonRef.current.click();
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Use useEffect to update the cartItems state when props.items changes
  useEffect(() => {
    setCartItems(props.items);
  }, [props.items]);

  const updateTextFile = (data) => {
    let text = "";
    for (let i = 0; i < data.length; i++) {
      text +=
        data[i].accountNumber +
        " " +
        data[i].name +
        " " +
        data[i].expiryDate +
        "\n";
    }
    return text;
  };

  const downloadTextFile = () => {
    if (cartItems.length === 0) {
      alert("Kundvagnen är tom!");
      return;
    }
    const fileName = "kort.txt";
    const text = updateTextFile(cartItems);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    // Clean up by removing the anchor and revoking the URL object
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    // empty the cart
    setCartItems([]);
    props.emptyCart();
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== id)
    );
  };

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const itemsArr = cartItems.map((item) => (
    <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
  ));

  return (
    <div className="box mg-auto" style={cartStyles}>
      <h2>Kundlista:</h2>
      <p>
        Klick på Ladda ner-knappen nedan eller använd kommandot:
        <br /> <pre className="">CTRL</pre> + <pre>SHIFT</pre> + <pre>D</pre>{" "}
        <br /> för att ladda ner .
      </p>
      <ul className="list-group list-group-flush mx-4 my-4 px-2 py-2">
        {itemsArr}
      </ul>
      <button
        ref={buttonRef}
        onClick={downloadTextFile}
        className="btn btn-primary mx-4 my-4 px-2 py-2"
      >
        Ladda ner <FontAwesomeIcon icon={faDownload} />
      </button>
    </div>
  );
};

export default Cart;
