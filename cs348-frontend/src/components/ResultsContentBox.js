import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import RecipeCard from './RecipeCard';
import RecipeDetails from '././RecipeDetails';
import { connect } from "react-redux";
import { getResultsState } from '../redux/selectors'

const mapStateToProps = state => {
    const results = getResultsState(state);
    return { results };
};

const ResultsContentBox = ({results}) => {
    const [show, setShow] = useState(false);
    const [displayRecipe, setDisplayRecipe] = useState({});

    const handleShow = recipe => {
        setDisplayRecipe(recipe);
        setShow(true);
    }

    const handleClose = () => setShow(false);

    return (        
        <div className="section section-fill-height results-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    Search Results
                </div>
            </div>
            <div className="section-body results-content-body">
                <div className="results-container">
                    {results.map(e => <RecipeCard key={e.recipeId} recipe={e} handleClick={handleShow}></RecipeCard>)}
                </div>
            </div>
            <Modal show={show} onHide={handleClose} className="modal-recipe">
                <RecipeDetails recipe={displayRecipe} handleClose={handleClose}></RecipeDetails>
            </Modal>
        </div>
      );
}

export default connect(mapStateToProps)(ResultsContentBox);