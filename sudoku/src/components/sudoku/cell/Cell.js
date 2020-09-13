import React, { PureComponent } from 'react'

export function Cell(props) {
    return (
        <div className={`cell ${props.className || ''}`}>{props.value > 0 ? props.value : ''}</div>
    )
}

export default Cell