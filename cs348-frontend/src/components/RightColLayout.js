import React, { useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { connect } from "react-redux";
import FavoriteContentBox from './FavoriteContentBox';
import RecipeDetails from './RecipeDetails';
import ResultsContentBox from './ResultsContentBox';
import UserContentBox from './UserContentBox';
import { getUserState } from '../redux/selectors'


const mapStateToProps = state => {
    const userId = getUserState(state);
    return { userId };
};

const RightColLayout = ({ userId }) => {
    const [show, setShow] = useState(false);
    const [displayRecipe, setDisplayRecipe] = useState({});

    const handleShow = recipe => {
        setDisplayRecipe(recipe);
        setShow(true);
    }

    const handleClose = () => setShow(false);

    const SelectUserContentBox = () => {
        if (userId === "") {
            return <UserContentBox />
        } else {
            return <FavoriteContentBox handleClick={handleShow}/>
        }
    }

    return (        
        <div className="col-layout full-height right-col">
            {SelectUserContentBox()}
            <ResultsContentBox handleClick={handleShow}/>
            <Dialog open={show} onClose={handleClose}
                fullWidth={true}
                maxWidth="md">
                <DialogContent className="fm-dialog-content">
                    <RecipeDetails recipe={displayRecipe} handleClose={handleClose}></RecipeDetails>
                </DialogContent>
            </Dialog>
        </div>
      );
}

export default connect(mapStateToProps)(RightColLayout)
