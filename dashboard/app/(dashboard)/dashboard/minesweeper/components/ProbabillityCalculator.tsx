'use client'
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export default function ProbabillityCalculator() {

    const [totalTiles, setTotalTiles] = useState<number>(25); // 5x5 grid
    const [totalBombs, setTotalBombs] = useState<number>(5);
    const [tilesToOpen, setTilesToOpen] = useState<number>(0);
    const [probability, setProbability] = useState<number | null>(null);
    const [moneyBackMultiplier, setMoneyBackMultiplier] = useState<number | null>(null);
    const [useVariant2, setUseVariant2] = useState<boolean>(false); // Use variant 2 for 7x7 grid

    const multiplierValues = {
        variant1: [1.22, 1.54, 1.97, 2.55, 3.35, 4.47, 6.07, 8.41, 11.92, 17.33],
        variant2: [1.09, 1.21, 1.36, 1.52, 1.72, 1.94, 2.19, 2.49, 2.84, 3.24, 3.72, 4.28, 4.95, 5.75, 6.71, 7.8, 9.27, 10.99, 13.11, 15.73, 19.01, 23.14, 28.4, 35],
    };

    const calculateProbability = () => {
        if (useVariant2 && (totalTiles !== 49 || totalBombs !== 5)) {
            alert('Invalid Input! For variant 2, the total tiles should be 49 (7x7 grid) and total bombs should be 5.');
            return;
        }

        if (tilesToOpen > totalTiles - totalBombs || tilesToOpen > 20) {
            alert('Invalid Input! Number of tiles to open should be less than or equal to (total tiles - total bombs) and less than or equal to 20.');
            return;
        }

        const remainingTiles = totalTiles - totalBombs;
        const combinations = binomialCoefficient(remainingTiles, tilesToOpen);
        const totalCombinations = binomialCoefficient(totalTiles, tilesToOpen);

        const prob = (combinations / totalCombinations) * 100;
        setProbability(prob);

        if (tilesToOpen > 0) {
            const multiplierIndex = tilesToOpen - 1; // Array is zero-indexed
            const multiplier = useVariant2 ? multiplierValues.variant2[multiplierIndex] : multiplierValues.variant1[multiplierIndex];
            setMoneyBackMultiplier(multiplier);
        }
    };

    const binomialCoefficient = (n: number, k: number): number => {
        if (k === 0 || k === n) return 1;

        let result = 1;
        for (let i = 1; i <= k; i++) {
            result *= (n - i + 1) / i;
        }

        return result;
    };

    return (
        <Card>
            <h1>Minesweeper Probability & Money Back Multiplier Calculator</h1>
            <div>
                <Label>
                    Total Tiles:
                    <Input type="number" value={totalTiles} onChange={(e) => setTotalTiles(Number(e.target.value))} />
                </Label>
            </div>
            <div>
                <Label>
                    Total Bombs:
                    <Input type="number" value={totalBombs} onChange={(e) => setTotalBombs(Number(e.target.value))} />
                </Label>
            </div>
            <div>
                <Label>
                    Tiles to Open (max 20):
                    <Input type="number" value={tilesToOpen} onChange={(e) => setTilesToOpen(Number(e.target.value))} />
                </Label>
            </div>
            <div>
                <Label>
                    Use Payout Variant 2 (7x7 grid):
                    <Input type="checkbox" checked={useVariant2} onChange={() => setUseVariant2(!useVariant2)} />
                </Label>
            </div>
            <div>
                <Button variant='outline' onClick={calculateProbability}>Calculate Probability & Multiplier</Button>
            </div>
            {probability !== null && moneyBackMultiplier !== null && (
                <div>
                    <p>Probability of winning: {probability.toFixed(2)}%</p>
                    <p>Money Back Multiplier: {moneyBackMultiplier.toFixed(2)}x</p>
                </div>
            )}
        </Card>
    );
};