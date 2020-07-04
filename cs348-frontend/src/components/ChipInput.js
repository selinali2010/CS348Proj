import React from 'react';
import PropTypes from 'prop-types';
import Chip from './Chip';

import "./ChipInput.css";

const ChipInput = (props) => {

    const handleDelete = (chipToDelete) => {
        return () => {
            props.setValues(props.values.filter((chip) => chip !== chipToDelete));
        }
    }

    const tryAddChip = (e) => {
        if (e.key === "Enter" ||
            e.key === "Tab" ||
            e.key === ",")
        {
            let newChip = e.target.value;
            if (newChip === "")
                return;
            for (const c of props.values)
            {
                if (c.toUpperCase() === newChip.toUpperCase())
                    return;
            }
            e.target.value = "";
            props.setValues(props.values.concat(newChip))
        }
    }

    let placeholderText = "Add " + props.typeName + "...";

    return (
        <div className="fm-chip-input">
            { props.values.map((chip, index) => 
                <Chip key={index} label={chip} 
                    onDelete={handleDelete(chip)}
                />
            )}
            <input className="fm-chip-input-add-chip" type="text" placeholder={placeholderText} size={placeholderText.length} onKeyDown={tryAddChip} />
        </div>
    );
}

ChipInput.propTypes = {
    typeName: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    setValues: PropTypes.func.isRequired,
}

export default ChipInput;
