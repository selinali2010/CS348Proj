import React from 'react';
import PropTypes from 'prop-types';
import Chip from './Chip';

import "./ChipInput.css";

const ChipInput = (props) => {

    const tryAddChip = (newChip) => {
        if (newChip === "")
            return false;
        for (const c of props.values)
        {
            if (c.toUpperCase() === newChip.toUpperCase())
                return false;
        }
        props.setValues(props.values.concat(newChip));
        return true;
    }

    const handleDelete = (chipToDelete) => {
        return () => {
            props.setValues(props.values.filter((chip) => chip !== chipToDelete));
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" ||
            e.key === ",")
        {
            e.preventDefault();
            if (tryAddChip(e.target.value.trim()))
                e.target.value = "";
        }
        else if (e.key === "Backspace" && e.target.value === "")
        {
            props.setValues(props.values.slice(0,-1));
            e.preventDefault();
        }
    }

    const handleFocusLost = (e) => {
        if (tryAddChip(e.target.value.trim()))
            e.target.value = "";
    }

    let placeholderText = "Add " + props.typeName + "...";

    return (
        <div className="fm-chip-input">
            { props.values.map((chip, index) => 
                <Chip key={index} label={chip} 
                    onDelete={handleDelete(chip)}
                />
            )}
            <input className="fm-chip-input-add-chip" type="text" placeholder={placeholderText} size={placeholderText.length} onKeyDown={handleKeyDown} onBlur={handleFocusLost} />
        </div>
    );
}

ChipInput.propTypes = {
    typeName: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    setValues: PropTypes.func.isRequired,
}

export default ChipInput;
