"use client";
"use client";
import React, { useEffect, useRef, useState } from "react";
import Spinner from "@c/core/effects/spinner";
import { Button } from "@c/ui/button";

function StatusComponent() {
  const [status, setStatus] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  const fetchStatus = () => {
    setIsLoading(true);
    abortController.current = new AbortController();

    fetch("/api/status", { signal: abortController.current.signal })
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.status);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch cancelled");
        } else {
          console.error("Error fetching status", error);
          setIsLoading(false);
        }
      });
  };

  const stopFetch = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
  };

  const cancelFetch = () => {
    stopFetch(); // Directly call stopFetch for clarity
  };

  return (
    <div>
      {isLoading ? <Spinner /> : status ? `Status: ${status}` : "Loading..."}
      <Button onClick={fetchStatus} disabled={isLoading}>
        Fetch Status
      </Button>
      <Button onClick={cancelFetch} disabled={!isLoading}>
        Cancel Fetch
      </Button>
      <Button onClick={stopFetch} disabled={!isLoading}>
        DWDWW
      </Button>
      <div className="text-center">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>status</td>
              <td>{status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatusComponent;
