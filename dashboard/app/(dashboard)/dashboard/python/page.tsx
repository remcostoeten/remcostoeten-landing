'use client'
// pages/index.tsx

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { toast } from 'sonner';
import Wrapper from '@c/layout/Wrapper';
import { set } from 'date-fns';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@c/ui/table';
import { ResetIcon } from '@radix-ui/react-icons';

interface Cell {
    isBomb: boolean;
    isRevealed: boolean;
}

const initializeBoard = (rows: number, cols: number): Cell[][] => {
    const board: Cell[][] = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = { isBomb: false, isRevealed: false };
        }
    }
    return board;
};

const placeBombs = (board: Cell[][], bombs: number): Cell[][] => {
    let bombsPlaced = 0;
    while (bombsPlaced < bombs) {
        const row = Math.floor(Math.random() * board.length);
        const col = Math.floor(Math.random() * board[0].length);
        if (!board[row][col].isBomb) {
            board[row][col].isBomb = true;
            bombsPlaced++;
        }
    }
    return board;
};


const Minesweeper: React.FC = () => {
    const [rows, setRows] = useState<number>(5);
    const [cols, setCols] = useState<number>(5);
    const [bombs, setBombs] = useState<number>(3);
    const [openedTilesCount, setOpenedTilesCount] = useState(0);
    const [timesClicked, setTimesClicked] = useState<number>(0);
    const [board, setBoard] = useState<Cell[][]>(initializeBoard(rows, cols));
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [numDeaths, setNumDeaths] = useState<number>(0);
    const [roundResults, setRoundResults] = useState<Array<{ round: number, timesDied: number, timesClicked: number, rows: number, cols: number, bombs: number }>>([]);

    const clearAll = () => {
        setRoundResults([]);
        localStorage.clear();
    }

    // result logic
    const [saveClickedPerRound, setSaveClickedPerRound] = useState<number>(0);

    // save each individual round
    const [rounds, setRounds] = useState<number>(0);

    const individualRound = (roundData) => {
        return (
            <div>
                <h2>Round: {roundData.roundNumber}</h2>
                <p>Times died: {roundData.timesDied}</p>
                <p>Times clicked: {roundData.timesClicked}</p>
            </div>
        );
    }

    const resetGame = () => {
        const newBoard = placeBombs(initializeBoard(rows, cols), bombs);
        setBoard(newBoard);
        setGameOver(false);
        setTimesClicked(0);
    };

    const revealAll = () => {
        const newBoard = [...board];
        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard[0].length; j++) {
                newBoard[i][j].isRevealed = true;
            }
        }
        setBoard(newBoard);
    }

    const handleCellClick = (row: number, col: number) => {
        if (gameOver || board[row][col].isRevealed) {
            return;
        }
        setTimesClicked(prevCount => prevCount + 1);
        let newBoard = [...board];
        newBoard[row][col].isRevealed = true;
        setBoard(newBoard);

        if (board[row][col].isBomb) {
            setGameOver(true);
            revealAll();
            setSaveClickedPerRound(timesClicked);
            setNumDeaths(prevCount => prevCount + 1);
            setRoundResults(prevResults => [...prevResults, { round: rounds, timesDied: numDeaths + 1, timesClicked, rows, cols, bombs }]);
            toast(`Too bad, you died on the ${timesClicked + 1} click`);
        } else if (!board[row][col].isRevealed) {
            setOpenedTilesCount(prevCount => prevCount + 1);
        }
    };

    useEffect(() => {
        resetGame();
    }, [rows, cols, bombs]);

    useEffect(() => {
        const savedRows = localStorage.getItem('rows');
        const savedCols = localStorage.getItem('cols');
        const savedBombs = localStorage.getItem('bombs');
        const savedBoard = localStorage.getItem('board');
        const savedOpenedTilesCount = localStorage.getItem('openedTilesCount');
        const savedGameOver = localStorage.getItem('gameOver');
        const savedNumDeaths = localStorage.getItem('numDeaths');

        if (savedRows) setRows(JSON.parse(savedRows));
        if (savedCols) setCols(JSON.parse(savedCols));
        if (savedBombs) setBombs(JSON.parse(savedBombs));
        if (savedBoard) setBoard(JSON.parse(savedBoard));
        if (savedOpenedTilesCount) setOpenedTilesCount(JSON.parse(savedOpenedTilesCount));
        if (savedGameOver) setGameOver(JSON.parse(savedGameOver));
        if (savedNumDeaths) setNumDeaths(JSON.parse(savedNumDeaths));
    }, []);

    useEffect(() => {
        localStorage.setItem('rows', JSON.stringify(rows));
        localStorage.setItem('cols', JSON.stringify(cols));
        localStorage.setItem('bombs', JSON.stringify(bombs));
        localStorage.setItem('board', JSON.stringify(board));
        localStorage.setItem('openedTilesCount', JSON.stringify(openedTilesCount));
        localStorage.setItem('gameOver', JSON.stringify(gameOver));
        localStorage.setItem('numDeaths', JSON.stringify(numDeaths));
    }, [rows, cols, bombs, board, openedTilesCount, gameOver, numDeaths]);

    return (
        <div className="text-center mt-8">
            <h1 className="text-3xl font-bold mb-4">Minesweeper</h1>

            <div className="flex justify-center mb-4">
                <label className="mr-2">Rows:</label>
                <input
                    type="number"
                    min="5"
                    max="9"
                    value={rows}
                    onChange={(e) => setRows(parseInt(e.target.value, 10))}
                    className="border p-2"
                />

                <label className="mx-2">Columns:</label>
                <input
                    type="number"
                    min="5"
                    max="9"
                    value={cols}
                    onChange={(e) => setCols(parseInt(e.target.value, 10))}
                    className="border p-2"
                />

                <label className="ml-2">Bombs:</label>
                <input
                    type="number"
                    min="3"
                    max={(rows - 1) * (cols - 1)}
                    value={bombs}
                    onChange={(e) => setBombs(parseInt(e.target.value, 10))}
                    className="border p-2"
                />
            </div>

            <button onClick={resetGame} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">
                Start New Game
            </button>
            <div className='flex '>
                <Wrapper className='mx-auto flex  justify-center items-start'>
                    <div className="grid grid-cols-5 gap-1 w-max  place-items-center w-max-[900px]">
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={classNames(
                                        'border border-gray-100 h-32 w-32 flex items-center justify-center cursor-pointer text-lg font-semibold',
                                        { 'flex bg-emerald-600': cell.isRevealed },
                                        { 'bg-red-500': cell.isRevealed && cell.isBomb },
                                    )}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >
                                    <span className='scale-175'>  {cell.isRevealed && cell.isBomb ? '💣' : ''}</span>
                                    <span className='scale-175'> {cell.isRevealed && !cell.isBomb ? '💎' : ''}</span>
                                </div>

                            )),
                        )}
                    </div>
                </Wrapper >
                <ResultsSidebar reset={clearAll} timesDied={numDeaths} saveClickedPerRound={saveClickedPerRound} roundResults={roundResults} />
            </div>
        </div>
    );
};

interface ResultsSidebarProps {
    timesDied: number | null;
    saveClickedPerRound: number | null;
    roundResults: Array<{ round: number, timesDied: number, timesClicked: number, rows: number, cols: number, bombs: number }>;
    reset: () => void;
}


const ResultsSidebar: React.FC<ResultsSidebarProps> = ({ reset, timesDied, saveClickedPerRound, roundResults }) => {
    return (
        <Wrapper>
            <Table>
                <ResetIcon height={30} width={30} className='absolute top-4 t right-4' onClick={reset} />
                <TableHeader className='mt-4 border-b'>
                    <TableCell>Round</TableCell>
                    <TableCell>Times Died</TableCell>
                    <TableCell>Times Clicked</TableCell>
                    <TableCell>Rows</TableCell>
                    <TableCell>Columns</TableCell>
                    <TableCell>Bombs</TableCell>
                </TableHeader>
                <TableBody>
                    {roundResults.map((result, index) => (
                        <TableRow key={index}>
                            <TableCell>{result.round}</TableCell>
                            <TableCell>{result.timesDied}</TableCell>
                            <TableCell>{result.timesClicked}</TableCell>
                            <TableCell>{result.rows}</TableCell>
                            <TableCell>{result.cols}</TableCell>
                            <TableCell>{result.bombs}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Wrapper>
    )
}

export default Minesweeper;
