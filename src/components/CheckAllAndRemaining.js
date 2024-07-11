import React from 'react'

export default function CheckAllAndRemaining({remainingTodos, checkAllTodos}) {
    return (
        <div className="check-all-container">
            <div>
                <div className="button" onClick={checkAllTodos}>Check All</div>
            </div>

            <span>{remainingTodos} item{remainingTodos > 1 ? 's' : ''} remaining</span>
        </div>
    )
}
