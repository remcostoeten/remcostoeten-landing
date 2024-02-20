"use client";
import React, { useState } from "react";

const GasStationFinder = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPrices = async (fuelType) => {
    try {
      const response = await fetch(
        `https://www.tankplanner.nl/api/v1/price/${fuelType}/`,
      );
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchRouteStations = async (fuelType, origin, destination) => {
    try {
      const response = await fetch(
        `https://www.tankplanner.nl/api/v1/route/${fuelType}/?origin=${encodeURIComponent(
          origin,
        )}&destination=${encodeURIComponent(destination)}`,
      );
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Render your component here, using the data and error state variables */}
      {data && (
        <div>
          <h2>Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GasStationFinder;
