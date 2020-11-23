/* A recursive utility function to solve N Queen problem */
export function SolveNQueen(board, col, listOfQueens, animations) {
    /* base case: If all queens are placed then return true */
    const N = board.length;
    if (col >= N)
        return true;

    /* Consider this column and try placing this queen in all rows one by one */
    for (let i = 0; i < N; i++) {
        /* Check if the queen can be placed on board[i][col] */
        if (Number(col) === Number(listOfQueens[0].col)) {
            /* recur to place rest of the queens */
            if (SolveNQueen(board, col + 1, listOfQueens, animations))
                return true;
            
            return false;
        }
        
        if (!board[i][col].invalid) {
            /* Place this queen in board[i][col] */
            board = addQueen(board, { row: i, col });
            listOfQueens.push({ row: i, col });
            animations.push(listOfQueens.slice());
            /* recur to place rest of the queens */
            if (SolveNQueen(board, col + 1, listOfQueens, animations))
                return true;

            /* If placing queen in board[i][col] 
               doesn't lead to a solution, then 
               remove queen from board[i][col] */
            listOfQueens.pop(); // BACKTRACK
            animations.push(listOfQueens.slice());
            board = createBoard(listOfQueens);
        }
    }

    /* If the queen cannot be placed in any row in this colum col then return false */
    return false;
}

export function addQueen(board, pos) {
    board[pos.row][pos.col] = { hasQueen: true };
    for (let i = 0; i < board.length; i++) {
        board[i][pos.col] = { ...board[i][pos.col], invalid: true };
    }
    for (let i = 0; i < board[0].length; i++) {
        board[pos.row][i] = { ...board[pos.row][i], invalid: true };
    }
    let upRow = Number(pos.row) - 1;
    let downRow = Number(pos.row) + 1;
    let leftCol = Number(pos.col) - 1;
    let rightCol = Number(pos.col) + 1;
    while (upRow >= 0) {
        if (leftCol >= 0) {
            board[upRow][leftCol] = { ...board[upRow][leftCol], invalid: true };
            leftCol--;
        }
        if (rightCol < board[0].length) {
            board[upRow][rightCol] = { ...board[upRow][rightCol], invalid: true };
            rightCol++;
        }
        upRow--;
    }
    leftCol = Number(pos.col) - 1;
    rightCol = Number(pos.col) + 1;
    while (downRow < board.length) {
        if (leftCol >= 0) {
            board[downRow][leftCol] = { ...board[downRow][leftCol], invalid: true };
            leftCol--;
        }
        if (rightCol < 8) {
            board[downRow][rightCol] = { ...board[downRow][rightCol], invalid: true };
            rightCol++;
        }
        downRow++;
    }
    return board;
}

export function createBoard(listOfQueens) {
    let board = new Array(8).fill(0).map(() => (new Array(8).fill(0).map(() => { return { invalid: false }; })));
    for (let i = 0; i < listOfQueens.length; i++) {
        board = addQueen(board, listOfQueens[i]);
    }
    return board;
}