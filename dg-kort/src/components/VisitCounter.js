import React, { useEffect, useState } from "react";

async function getIPFromAmazon() {
  const response = await fetch("https://checkip.amazonaws.com/");
  const ipAddress = await response.text();
  return ipAddress.trim(); // trim to remove any trailing whitespace
}

function isValidIP(ip) {
  const regex =
    /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
  return regex.test(ip);
}

const VisitCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const visitCount = localStorage.getItem("visitCount") || 0;
    setCount(Number(visitCount) + 1);
    localStorage.setItem("visitCount", Number(visitCount) + 1);
  }, []);

  useEffect(() => {
    const saveIP = async () => {
      const ipAddress = await getIPFromAmazon();
      if (isValidIP(ipAddress)) {
        const date = Date.now();
        try {
          const response = await fetch("http://localhost:5000/visit", {
            method: "post",
            body: JSON.stringify({ ipAddress, date }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          console.warn(result);
          if (result) {
            alert("Data saved succesfully");
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
