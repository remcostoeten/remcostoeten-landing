"use client";
import React, { useState } from "react";
import { Button, Input } from "@ui/ui-imports";
import "tailwindcss/tailwind.css";

interface MinesweeperProbabilityCounterProps {
  initialTotalSquares?: number;
  initialMinesToPlace?: number;
}

const MinesweeperProbabilityCounter: React.FC<
  MinesweeperProbabilityCounterProps
> = ({ initialTotalSquares = 72, initialMinesToPlace = 15 }) => {
  const [totalSquares, setTotalSquares] = useState(initialTotalSquares);
  const [minesToPlace, setMinesToPlace] = useState(initialMinesToPlace);
  const [probability, setProbability] = useState<number | null>(null);

  const calculateProbability = () => {
    const squaresInTopRows = totalSquares - minesToPlace;

    const totalStates = combination(totalSquares, minesToPlace);
    const favorableOutcomes = combination(squaresInTopRows, minesToPlace);

    const probabilityOfWinning = favorableOutcomes / totalStates;
    setProbability(probabilityOfWinning);
  };

  const combination = (n: number, k: number): number => {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  const factorial = (n: number): number => {
    return n === 0 ? 1 : n * factorial(n - 1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-2xl">Minesweeper Probability Counter</h1>
      <div className="flex gap-4">
        <Input
          type="number"
          value={totalSquares}
          onChange={(e) => setTotalSquares(parseInt(e.target.value))}
          placeholder="Total Squares"
        />
        <Input
          type="number"
          value={minesToPlace}
          onChange={(e) => setMinesToPlace(parseInt(e.target.value))}
          placeholder="Mines to Place"
        />
      </div>
      <Button onClick={calculateProbability} className="mt-4">
        Calculate Probability
      </Button>
      {probability !== null && (
        <p className="mt-4 text-center">
          The probability of winning is approximately {probability.toFixed(4)}
        </p>
      )}
    </div>
  );
};

export default MinesweeperProbabilityCounter;
