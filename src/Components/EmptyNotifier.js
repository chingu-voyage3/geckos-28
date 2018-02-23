import React from 'react';
import '../styles/EmptyNotifier.css';

//Shows a message when a list is empty
function EmptyNotifier(props) {
    return(
        <div className="empty">
            <h3>Whhow! Such emptiness! <i className="material-icons">sentiment_very_dissatisfied</i></h3>
            <p>Click the <i className="material-icons" onClick={props.toggleInput}>add</i> button to add a new item.</p>
        </div>
    )
}

export default EmptyNotifier;