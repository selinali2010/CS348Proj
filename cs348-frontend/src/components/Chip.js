import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const Chip = (props) => {
    return (
        <div class="fm-chip">
            <span class="fm-chip-label">{props.label}</span>
            {(props.onDelete) &&
                <CloseIcon className="fm-chip-delete-icon" onClick={props.onDelete} />
            }
        </div>
    );
}

export default Chip;
