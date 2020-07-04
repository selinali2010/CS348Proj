import React from 'react';
import Chip from './Chip';

const ChipInput = (props) => {
    const [chips, setChips] = React.useState([
        "Flour",
        "Baking soda",
    ]);

    const handleDelete = (chipToDelete) => () => {
        setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const tryAddChip = (e) => {
        if (e.key === "Enter" ||
            e.key === "Tab" ||
            e.key === ",")
        {
            let newChip = e.target.value;
            setChips((chips) => chips.concat(newChip))
            e.target.value = "";
        }
    }

    let placeholderText = "Add " + props.typeName + "...";

    return (
        <div class="fm-chip-input">
            { chips.map(chip => 
                <Chip label={chip} 
                    onDelete={handleDelete(chip)}
                />
            )}
            <input class="fm-chip-input-add-chip" type="text" placeholder={placeholderText} size={placeholderText.length} onKeyDown={tryAddChip} />
        </div>
    );
}

export default ChipInput;
