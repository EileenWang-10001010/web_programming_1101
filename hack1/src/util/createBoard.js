/****************************************************************************
  FileName      [ createBoard.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the pattern of mines and the board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import randomNum from "./randomFixSeed";

export default (boardSize, mineNum,{setBoard}) => {
    let board = [];
    let mineLocations = [];

    // Print Board function (For testing)
    const printBoard = () => {
        console.log("Current Board")
        for(let x = 0; x < boardSize; x++){
            console.log(board[x].map((x) => {
                return(x.value !=='💣' ? x.value.toString()+" " : x.value)
            }))
        }
    }

    // Create a blank board
    for(let x = 0; x < boardSize; x++){
        let subCol = [];
        for(let y = 0; y < boardSize; y++){
            subCol.push({
                value: 0,                   // To store the number of mines around the cell.
                revealed: false,            // To store if the cell is revealed.
                x: x,                       // To store the x coordinate (the column index) of the cell.
                y: y,                       // To store the y coordinate (the row index) of the cell.
                flagged: false,             // To store if the cell is flagged.
            });
        }
        board.push(subCol);
    }
    

    // Random bombs locations
    let mineCount = 0;
    while(mineCount < mineNum){
        let x = randomNum(0, boardSize - 1);
        let y = randomNum(0, boardSize - 1);

        if(board[x][y].value === 0){            // Check this location has not been located a mine.
            board[x][y].value = '💣';           // Change the value of the cell to '💣'
            mineLocations.push([x, y]);
            mineCount++;
        }
    }
    

    {/* -- TODO 2 -- */}
    {/* Useful Hints: Calculate and update the value of each cell in the board. The value means the number of mines adjacent to the cell. */}
    {/* Reminder: Some cells in the board do not have "Top" position, some do not have "Top-Right" position .... */}
    {/* Warning: The value of any cell will not be bigger than 8 logically. */}
    {/* Testing: printBoard() */}
    

    const getNeighbors = (board, mineNum) => {
        const level = mineNum.y;
        const levelUp = level - 1;
        const levelDown = level + 1;
        const xLeft = mineNum.x - 1;
        const xRight = mineNum.x + 1;

        const boardCopy = JSON.parse(JSON.stringify(board));
      
        const sameLevel = boardCopy.filter(
          m => (m.x === xLeft || m.x === xRight) && m.y === level
        );
      
        const upLevel = boardCopy.filter(
          m => (m.x === xLeft || m.x === xRight || m.x === mineNum.x) && m.y === levelUp
        );
      
        const downLevel = boardCopy.filter(
          m =>
            (m.x === xLeft || m.x === xRight || m.x === mineNum.x) && m.y === levelDown
        );
      
        return [...sameLevel, ...upLevel, ...downLevel];
      };

      const getCountOfNeighborsWithBombs = board => {
        const map = board.map(mine => {
          const neighborArray = getNeighbors(board, mineNum);
          const neighbors = neighborArray.filter(neighbor => neighbor.value==='💣').length;
      
          return { ...mine, value : neighbors };
        });
      
        return map;
      };

      setBoard(getCountOfNeighborsWithBombs(board));

      //printBoard()

    return { board, mineLocations };
};