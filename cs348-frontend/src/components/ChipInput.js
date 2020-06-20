import React from 'react';
import { Chip } from '@material-ui/core';
import search from '../redux/reducers/search';
import { connect } from "react-redux";
import { addResults } from '../redux/actions';

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

    return (
        <div class="chipInputBase">
            <div class="chipList">
                { chips.map(chip => 
                    <Chip label={chip} 
                        onDelete={handleDelete(chip)}
                    />
                )}
            </div>
            <input class="addChipInput" type="text" onKeyDown={tryAddChip} />
        </div>
    );
}

export default ChipInput;
