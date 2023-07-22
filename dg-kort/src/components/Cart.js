import React, { useState, useEffect } from "react";
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
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

const Cart = (props) => {
  const [cartItems, setCartItems] = useState(props.items);

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
    <div className="box" style={cartStyles}>
      <h2>Kundlista</h2>
      <p>
        Här visas alla kunder som finns i kundvagnen. Du kan ta bort en kund
        genom att klicka på "Ta bort" eller redigera en kund genom att klicka på
        "Redigera". När du är klar med redigeringen klickar du på "Spara". För
        att ladda ner kundlistan klickar du på "Ladda ner".
      </p>
      <ul>{itemsArr}</ul>
      <button
        onClick={downloadTextFile}
        className="btn btn-primary mx-4 my-4 px-2 py-2"
      >
        Ladda ner <FontAwesomeIcon icon={faDownload} />
      </button>
    </div>
  );
};

export default Cart;
