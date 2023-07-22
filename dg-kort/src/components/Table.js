import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

const Table = (props) => {
  const [cartItems, setCartItems] = useState(props.items);

  // Use useEffect to update the cartItems state when props.items changes
  useEffect(() => {
    setCartItems(props.items);
  }, [props.items]);

  return (
    <>
      <h2>Table</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="mx-2">Kontonummer</th>
            <th className="mx-2">Kundnamn</th>
            <th className="mx-2">Utgångsdatum</th>
            <th className="mx-2">Redigera/Ta bort</th>
          </tr>
        </thead>
        <tbody className="center">
          {props.items.map((item) => (
            <tr key={item.id}>
              <td>{item.accountNumber}</td>
              <td>{item.name}</td>
              <td>{item.expiryDate}</td>
              <td>
                <button className="btn btn-warning mx-1 my-1 text-white">
                  Redigera
                </button>
                <button className="btn btn-danger mx-1 my-1">Ta bort</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
