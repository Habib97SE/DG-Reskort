import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPencilSquare,
  faTrashCan,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const listItemStyle = {
  // Your existing styles...
};

const cartItemStyles = {
  fontSize: "1.2rem",
  backgroundColor: "#f4f4f4",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
  padding: "1rem",
  margin: "1rem 0",
  borderRadius: "0.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
  },
};

const CartItem = ({ item, removeFromCart }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedAccountNumber, setEditedAccountNumber] = useState(
    item.accountNumber
  );
  const [editedCustomerName, setEditedCustomerName] = useState(item.name);
  const [editedExpiryDate, setEditedExpiryDate] = useState(item.expiryDate);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Perform your save or update action here...
    // For this example, we'll just set the state back to view mode.
    item.accountNumber = editedAccountNumber;
    item.name = editedCustomerName;
    item.expiryDate = editedExpiryDate;
    setEditMode(false);
  };

  const handleDelete = () => {
    // call removeFromCart function from Cart.js
    removeFromCart(item.id);
  };

  return (
    <div className="box" style={cartItemStyles}>
      <ul>
        <li>
          <label htmlFor="accountNumberCart">Kontonummer: </label>
          {editMode ? (
            <div className="">
              <input
                type="text"
                value={editedAccountNumber}
                id="accountNumberCart"
                onChange={(e) => setEditedAccountNumber(e.target.value)}
                className="form-control"
              />
            </div>
          ) : (
            <strong>{" " + item.accountNumber}</strong>
          )}
        </li>
        <li>
          <label htmlFor="customerNameCart">Kundnamn: </label>
          {editMode ? (
            <div className="form-group">
              <input
                type="text"
                id="customerNameCart"
                value={editedCustomerName}
                onChange={(e) => setEditedCustomerName(e.target.value)}
                className="form-control"
              />
            </div>
          ) : (
            <strong>{" " + item.name}</strong>
          )}
        </li>
        <li>
          <label htmlFor="expiryDateCart">Utgångsdatum: </label>
          {editMode ? (
            <div className="form-group">
              <input
                type="text"
                id="expiryDateCart"
                value={editedExpiryDate}
                onChange={(e) => setEditedExpiryDate(e.target.value)}
                className="form-control"
              />
            </div>
          ) : (
            <strong>{" " + item.expiryDate}</strong>
          )}
        </li>
        <li>
          {editMode ? (
            <button
              onClick={handleSave}
              className="btn btn-outline save-effect"
              title="Spara ändringar"
            >
              <FontAwesomeIcon icon={faCheckCircle} spin />
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="btn btn-outline edit-effect"
              title="Redigera kunden"
            >
              <FontAwesomeIcon icon={faPencilSquare} spin />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="btn btn-outline delete-effect"
            title="Ta bort kunden"
          >
            <FontAwesomeIcon icon={faTrashCan} spin />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CartItem;
