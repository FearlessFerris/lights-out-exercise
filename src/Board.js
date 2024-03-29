import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for( let i = 0; i < nrows; i++ ){
      let row = [];
      for( let j = 0; j < ncols; j++ ){
        let lit = Math.random() < chanceLightStartsOn;
        row.push( lit );
      }
      initialBoard.push( row );
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.

    return board.every( row => row.every( cell => !cell ));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
  
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
  
      const newBoard = oldBoard.map(row => [...row]);
  
      flipCell(y, x, newBoard);
      flipCell(y + 1, x, newBoard); // below
      flipCell(y - 1, x, newBoard); // above
      flipCell(y, x + 1, newBoard); // right
      flipCell(y, x - 1, newBoard); // left
  
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if( hasWon()){
    return <div> Congratulations, you Won!!! </div>
  }

  // make table board

  // TODO
  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
          <Cell
              key={coord}
              isLit={board[y][x]}
              flipCellsAroundMe={evt => flipCellsAround(coord)}
          />,
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
  );
}

export default Board;
