import React, { PureComponent, Ref } from 'react'
import SudokuComponent from '../components/sudoku/SudokuComponent';
import './HomeLayout.scss';
class HomeLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.sudoku = React.createRef();
        this.solveSudoku = this.solveSudoku.bind(this);
        this.resetSudoku = this.resetSudoku.bind(this);
    }

    solveSudoku() {
        this.sudoku.current.solve();
    }

    resetSudoku() {
        this.sudoku.current.reset();
    }

    render() {
        return (
            <div className="home-container">
                <div className="sudoku-wrapper">
                    <SudokuComponent ref={this.sudoku}/>
                </div>
                <div className="button-wrapper">
                    <button onClick={this.resetSudoku}>Reset</button>
                    <button onClick={this.solveSudoku}>Solve</button>
                </div>
            </div>
        );
    }
}

export default HomeLayout