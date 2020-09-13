import React, { PureComponent } from 'react'
import Cell from './cell/Cell';
import {Sudoku} from '../../utils/sudoku';
import {delay} from '../../utils/helpers';
import './SudokuComponent.scss';
class SudokuComponent extends PureComponent {
    running = false;
    constructor(props) {
        super(props)
        this.sudoku = new Sudoku(9);
        
        this.state = {
            matrix: this.sudoku.getMatrix()
        }
        this.solve = this.solve.bind(this);
        this.reset = this.reset.bind(this);
    }

    async solve() {
        if (!this.running) {
            this.running = true;
            const animations = this.sudoku.getSteps();
        
            for (let item of animations) {
                if (!this.running)
                    break;
                let matrix = this.state.matrix.slice();
                matrix[item.row][item.col] = { value: item.value, type: item.type }
                this.setState({ matrix });
                await delay(200);
            }
            this.running = false;
        }
    }

    reset() {
        this.running = false;
        this.sudoku.reset();
        this.setState({ matrix: this.sudoku.getMatrix() });
    }

    getClass(i, j, item) {
        let className = '';
        if ( !(j % 3) && j !== 0 ) {
            className += 'border-left';
        }

        if ( !(i % 3) && i !== 0 ) {
            className += ' border-top';
        }
        if (item.type) {
            className += ` ${item.type}`;
        }
        return className;
    }

    render() {
        const {matrix} = this.state;
        return (
            <div className="sudoku-container">
                { 
                    matrix.map((row, i) => {
                        return (
                            <div className="row" key={i}>
                                {
                                    row.map((col, j) => {
                                        return (
                                            <Cell 
                                                key={j}
                                                className={this.getClass(i, j, col)} 
                                                value={col.value} />
                                        )
                                    }) 
                                }
                            </div>
                        )
                    }) 
                }
            </div>
        )
    }
}

export default SudokuComponent