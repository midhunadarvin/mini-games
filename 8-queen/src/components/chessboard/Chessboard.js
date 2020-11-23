import React, { useEffect, useState } from 'react';
import { delay } from '../../util/common';
import { addQueen, createBoard, SolveNQueen } from '../../util/SolveNQueen';
import './Chessboard.css';

const ChessBoard = () => {
    const [currentQueenPos, setCurrentQueenPos] = useState({ row: 5, col: 3 });
    const [board, setBoard] = useState(createBoard([currentQueenPos]));

    useEffect(() => {
        console.log(
            "This only happens ONCE.  But it happens AFTER the initial render."
        );
        setQueenPos(currentQueenPos, board);
    }, []);

    const setQueenPos = (pos, newBoard) => {
        newBoard = addQueen(newBoard, pos);
        currentQueenPos.row = pos.row;
        currentQueenPos.col = pos.col;
        setCurrentQueenPos({ row: pos.row, col: pos.col });
        setBoard(newBoard);
    };

    const handleClick = (e) => {
        const oldRow = currentQueenPos.row;
        const oldCol = currentQueenPos.col;
        
        const newRow = e.target.dataset.row;
        const newCol = e.target.dataset.col;
        if (!newRow || !newCol || (oldRow == newRow && oldCol == newCol))
            return;
        
        const newBoard = clearBoard();
        newBoard[oldRow][oldCol] = { hasQueen: false };
        setBoard(newBoard);
        setQueenPos({ row: newRow, col: newCol }, newBoard);
    }

    const clearBoard = () => {
        const newBoard = board.slice();
        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard.length; j++) {
                newBoard[i][j] = { invalid: false };
            }
        }
        return newBoard;
    }

    const solve = async () => {
        let newBoard = board.slice();
        console.log(currentQueenPos);
        const listOfQueens = [currentQueenPos];
        const animations = [];
        const isSolvable = SolveNQueen(newBoard, 0, listOfQueens, animations);
        console.log(isSolvable);
        console.log(listOfQueens);
        console.log(animations);
        if (isSolvable) {
            for (let i = 0; i < animations.length; i++) {
                newBoard = createBoard(animations[i]);
                setBoard(newBoard);
                await delay(1000);
            }
        }
    }

    const reset = () => {
        const newBoard = createBoard([currentQueenPos]);
        setBoard(newBoard);
    }

    return (
        <>
            <div className="chessboard" onClick={handleClick}>
                {
                    board.map((row, i) => row.map((col, j) =>
                        <div
                            key={i + j}
                            data-row={i}
                            data-col={j}
                            className={`${!((i + j) % 2) ? 'white' : 'black'} ${col.invalid && !col.hasQueen ? 'invalid' : ''} ${col.hasQueen ? 'has-queen' : ''}`}>
                                {col.hasQueen ? <span>&#9819;</span> : ''}
                        </div>
                    ))
                }
            </div>
            <div className="flex align-center justify-center btn-wrapper">
                <button className="solve-button" onClick={solve}>Solve</button>
                <button className="solve-button" onClick={reset}>Reset</button>
            </div>
        </>
    );
}

export default ChessBoard;