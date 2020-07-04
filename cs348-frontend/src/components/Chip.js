import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

const Chip = (props) => {
    return (
        <div className="fm-chip">
            <span className="fm-chip-label">{props.label}</span>
            {(props.onDelete) &&
                <CloseIcon className="fm-chip-delete-icon" onClick={props.onDelete} />
            }
        </div>
    );
}

Chip.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
}


export default Chip;
