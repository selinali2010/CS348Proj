import React from 'react';
import { Cancel } from '@material-ui/icons';

const Chip = (props) => {
    return (
        <div class="fm-chip">
            <span class="fm-chip-label">{props.label}</span>
        </div>
    );
}

export default Chip;
