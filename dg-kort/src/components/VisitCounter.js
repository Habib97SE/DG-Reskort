import React, { useEffect, useState } from "react";

async function getIPAddress() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log("Your IP address is " + data.ip);
    return data.ip;
  } catch (error) {
    console.error("Error getting IP address:", error);
    return "";
  }
}

function isValidIP(ip) {
  const regex =
    /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
  return regex.test(ip);
}

const VisitCounter = () => {
  useEffect(() => {
    const saveIP = async () => {
      const ipAddress = await getIPAddress();
      if (isValidIP(ipAddress)) {
        const date = Date.now();
        try {
          console.log(ipAddress);
          console.log(date);
          const response = await fetch(
            "https://dg-reskort-backend-d5dd39c2c5b3.herokuapp.com/visit",
            {
              method: "post",
              body: JSON.stringify({ ipAddress, date }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          console.warn(result);
          if (result) {
            console.log("Data saved succesfully");
          }
        } catch (error) {
          console.error("Error saving IP:", error);
        }
      }
    };
    saveIP();
  }, []);

  // Render (if needed)
  return null; // if you don't need to render anything
};

export default VisitCounter;
