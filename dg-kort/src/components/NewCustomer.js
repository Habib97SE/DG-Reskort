import React, { useState, useEffect, useRef } from "react";
import Utility from "./utility";

const newCustomerStyles = {
  fontSize: "1.2rem",
  backgroundColor: "#f4f4f4",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
  padding: "1rem",
  margin: "1rem 0",
  borderRadius: "0.5rem",
  // input focus

  alignItems: "center",
};

const NewCustomer = ({ addItemToCart }) => {
  const [customerName, setCustomerName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(Utility.nextYearDate());

  // Create a ref to the input element to be able to set focus on it when the component mounts
  const inputRef = useRef(null);
  useEffect(() => {
    // Set focus on the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * Makes the border of the element red to indicate an error in the input
   * @param {}  element: The element to be styled
   */
  const makeBorderRed = (element) => {
    element.style.border = "1px solid #ff0000"; // #
  };

  /**
   * Makes the border of the element green to indicate a valid input
   * @param {*} element: The element to be styled
   */
  const makeBorderGreen = (element) => {
    element.style.border = "1px solid green";
  };

  /**
   * Reset the form to its initial state (empty input fields)
   * @param {Event} e : The event object from the form submission
   */
  const resetForm = (e) => {
    e.preventDefault();
    setCustomerName("");
    setAccountNumber("");
    setExpiryDate(Utility.nextYearDate()); // Provide an initial value here
    resetBorderColor();
    resetFieldMessages();
    // set focus on accountNumber input field
    document.getElementById("accountNumber").focus();
  };

  const reformatName = (name) => {
    // first alphbetical character should be uppercase for both first and last name
    const nameArray = name.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray[1];
    const formattedName = firstName[0].toUpperCase() + firstName.slice(1);
    return formattedName + " " + lastName[0].toUpperCase() + lastName.slice(1);
  };

  const reformatDate = (date) => {
    // the date format should be YYYY-MM-DD
    const dateArray = date.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    return year + "-" + month + "-" + day;
  };

  const resetBorderColor = (e) => {
    const nameInput = document.getElementById("customerName");
    const accountNumberInput = document.getElementById("accountNumber");
    const expiryDateInput = document.getElementById("expiryDate");
    nameInput.style.border = "1px solid #ced4da";
    accountNumberInput.style.border = "1px solid #ced4da";
    expiryDateInput.style.border = "1px solid #ced4da";
  };

  const resetFieldMessages = () => {
    const nameFieldMessage = document.getElementById(
      "customerNameFieldMessage"
    );
    const accountNumberFieldMessage = document.getElementById(
      "accountNumberFieldMessage"
    );
    const expiryDateFieldMessage = document.getElementById(
      "expiryDateFieldMessage"
    );
    nameFieldMessage.firstChild.innerHTML = "";
    accountNumberFieldMessage.firstChild.innerHTML = "";
    expiryDateFieldMessage.firstChild.innerHTML = "";
  };

  const setSuccessMessage = (elementID, message) => {
    const messageElement = document.getElementById(elementID).firstChild;
    messageElement.innerHTML = "";
    messageElement.innerHTML = message;
    messageElement.classList.remove("text-danger");
    messageElement.classList.add("text-success");
  };

  const setErrorMessage = (elementID, message) => {
    const messageElement = document.getElementById(elementID).firstChild;
    messageElement.innerHTML = "";
    messageElement.innerHTML = message;
    messageElement.classList.remove("text-success");
    messageElement.classList.add("text-danger");
  };

  /**
   * validates inputs and adds the customer data to the cart by
   * calling the addItemToCart function from Cart.js
   * @param {*} e : The event object from the form submission
   * @returns
   */
  // In submitForm function:
  const submitForm = (e) => {
    e.preventDefault();

    if (
      !Utility.isValidName(customerName) ||
      !Utility.isValidAccountNumber(accountNumber) ||
      !Utility.isValidExpiryDate(expiryDate)
    ) {
      setErrorMessage("submitMessage", "Kunden kunde inte läggas till.");
    } else {
      // ...
      // Add the customer to the cart
      let result = addItemToCart({
        name: Utility.formatName(customerName),
        accountNumber: accountNumber,
        expiryDate: reformatDate(expiryDate),
      });

      if (!result) {
        setErrorMessage("submitMessage", "Kunden finns redan i kundvagnen.");
        return;
      }

      // Reset the form
      resetForm(e);

      // reset the border color of the input fields
      resetBorderColor();

      // Display success message, the message should disappear after 5 seconds
      setSuccessMessage("submitMessage", "Kunden har lagts till i kundvagnen.");
      setTimeout(() => {
        setSuccessMessage("submitMessage", null); // Passing null to clear the message
      }, 3000);
      // set focus on accountNumber input field
      document.getElementById("accountNumber").focus();
    }
  };

  // handles customer name input field
  const handleCustomerNameChange = (value) => {
    const nameInput = document.getElementById("customerName");
    if (!Utility.isValidName(value)) {
      makeBorderRed(nameInput);
      setErrorMessage("customerNameFieldMessage", "Namn måste anges.");
    } else {
      makeBorderGreen(nameInput);
      setSuccessMessage("customerNameFieldMessage", "Namn godkänt.");
    }
  };

  // handles account number input field
  const handleCustomerNumberChange = (value) => {
    const accountNumberInput = document.getElementById("accountNumber");
    if (Utility.isValidAccountNumber(accountNumberInput.value)) {
      makeBorderGreen(accountNumberInput);
      setSuccessMessage("accountNumberFieldMessage", "kundnummer godkänt.");
    } else {
      makeBorderRed(accountNumberInput);
      setErrorMessage("accountNumberFieldMessage", "Kundnummer måste anges.");
    }
  };

  // handles expiry date input field
  const handleExpirydDateChange = (value) => {
    const expiryDateInput = document.getElementById("expiryDate");
    console.log("expiryDateInput: ", expiryDateInput.value);
    if (Utility.isValidExpiryDate(value)) {
      makeBorderGreen(expiryDateInput);
      setSuccessMessage("expiryDateFieldMessage", "Utgångsdatum godkänt.");
    } else {
      makeBorderRed(expiryDateInput);
      setErrorMessage("expiryDateFieldMessage", "Utgångsdatum måste anges.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customerName") {
      handleCustomerNameChange(value);
      setCustomerName(value);
    } else if (name === "accountNumber") {
      handleCustomerNumberChange(value);
      setAccountNumber(value);
    } else if (name === "expiryDate") {
      handleExpirydDateChange(value);
      setExpiryDate(value);
    }
  };

  return (
    <div style={newCustomerStyles}>
      <h2>Ny kund</h2>
      <form>
        <div className="form-group">
          <label htmlFor="accountNumber">Kundnummer:</label>
          <input
            type="text"
            ref={inputRef}
            className={`form-control`}
            id="accountNumber"
            name="accountNumber"
            value={accountNumber}
            placeholder="Ex. 2039294"
            onChange={handleChange}
          />
          <span id="accountNumberFieldMessage">
            <p></p>
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Kundnamn:</label>
          <input
            type="text"
            className={`form-control`}
            id="customerName"
            name="customerName"
            value={customerName}
            placeholder="Ex. Johan Johansson"
            onChange={handleChange}
          />
          <span id="customerNameFieldMessage">
            <p></p>
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Utgångsdatum:</label>
          <input
            type="text"
            className={`form-control`}
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            placeholder="Ex. 2023-07-18"
            onChange={handleChange}
          />
          <span id="expiryDateFieldMessage">
            <p></p>
          </span>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-warning text-white me-2 mb-2 mb-md-0 mt-2 my-2 mx-2 px-3 px-2"
            onClick={resetForm}
          >
            Rensa
          </button>
          <button
            type="submit"
            className="btn btn-primary me-2 mb-2 mb-md-0 mt-2 my-2 mx-2 px-3 px-2"
            onClick={submitForm}
          >
            Lägg till
          </button>
        </div>
        <span id="submitMessage">
          <p></p>
        </span>
      </form>
    </div>
  );
};

export default NewCustomer;
