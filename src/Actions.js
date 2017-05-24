import React from 'react'
import './Actions.css'

const Actions = ({thing, removeThing}) => {
    return (
        <span className="Actions">
            <button
                className="remove"
                onClick={()=>removeThing(thing)}
            >
                <i className="fa fa-trash"></i>
            </button>
        </span>
    )
}
export default Actions
