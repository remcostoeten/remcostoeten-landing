// pages/index.js (or any other component)

import { useEffect, useState } from "react";
import axios from "axios";

const IndexPage = () => {
  const [status, setStatus] = useState("Unknown");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get("/api/status");
        setStatus(response.data.status);
      } catch (error) {
        console.error("An error occurred while fetching status:", error);
      }
    };

    const interval = setInterval(fetchStatus, 20000); // Polling every 20 seconds
    fetchStatus(); // Fetch status initially

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h1>Status: {status}</h1>
    </div>
  );
};

export default IndexPage;
