"use client";
import React, { useState } from "react";
import axios from "axios";

const IndexPage = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/hello/route.ts", { text: inputText });
      setOutputText(response.data);
    } catch (error) {
      console.error(error);
      setOutputText("An error occurred while processing the text.");
    }
  };

  return (
    <div>
      <h1>Remove A's</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <pre>{outputText}</pre>
    </div>
  );
};

export default IndexPage;
