import React, { useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import ChipInput from "./ChipInput";

import "./RecipeDialog.css"

const CreateDialog = ({open, handleClose, userName}) => {
    const [recipeName, setRecipeName] = useState("");
    const [cookTime, setCookTime] = useState(0);
    const [difficulty, setDifficulty] = useState(null);
    const [cuisine, setCuisine] = useState("");
    const [servings, setServings] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [instructionsLink, setInstructionsLink] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);

    const validateInput = () => {
        let errors = "";
        let requiredFields = [];
        // TODO input validation
        if (errors === "") sendCreateRequest();
    }

    const sendCreateRequest = () => {
        let data = {
            recipe : {
                recipeName: recipeName,
                servings: servings,
                cookTime: cookTime,
                cuisine: cuisine,
                difficulty: difficulty,
                imageUrl: imageUrl,
                instructionsLink: instructionsLink
            },
            ingredient: ingredients,
            tags: tags
        }
        console.log(data);
    }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogContent className="fm-dialog-content">
        <div className="no-gutters recipe-details">
            <button className="close" aria-label="Close" onClick={handleClose}>
                <Close aria-hidden="true" />
            </button>
            <div className="recipe-details-section">
                <h1>Add a Recipe: </h1>
            </div>
            <div className="recipe-details-section row">
                <div className ="col-6">
                    <div className="row"> <div className="col-4"> Recipe Name: </div>
                        <input type="text" className="fm-text-input col-8" placeholder="Recipe name..."
                            onChange={ (e) => setRecipeName(e.target.value) } /></div>
                    <div className="row"> <div className="col-4"> Cuisine: </div>
                        <input type="number" className="fm-text-input col-8" placeholder="Cuisine..."
                            onChange={ (e) => setCuisine(e.target.value) } /></div>
                    <div className="row"> <div className="col-4"> Cook Time: </div>
                        <input type="number" className="fm-text-input col-8" placeholder="Cook Time in minutes"
                            onChange={ (e) => setCookTime(e.target.value) } /></div>
                    <div className="row"> <div className="col-4"> Difficulty: </div>
                        <input type="number" className="fm-text-input col-8" placeholder="Difficulty Rating..."
                            onChange={ (e) => setDifficulty(e.target.value) } /></div>
                </div>
                <div className ="col-6">
                    <div className="row"> <div className="col-4">Servings:</div>
                        <input type="number" className="fm-text-input col-8" placeholder="Servings..."
                            onChange={ (e) => setServings(e.target.value) } /></div>
                    <div className="row"> <div className="col-4"> Image URL: </div>
                        <input type="text" className="fm-text-input col-8" placeholder="Image URL..."
                            onChange={ (e) => setImageUrl(e.target.value) } /></div>
                    <div className="row"> <div className="col-4"> Instructions Link: </div>
                        <input type="text" className="fm-text-input col-8" placeholder="Instructions Link..."
                            onChange={ (e) => setInstructionsLink(e.target.value) } /> </div>
                </div>
            </div>
            <div className="recipe-details-section"> Ingredients:
                <div>
                    Somethings will go here eventually...
                </div></div>
            <div className="recipe-details-section"> Tags: 
            <ChipInput typeName="tag"
                values={tags}
                setValues={ (values) => setTags(values) } /></div>
            <div className="fm-centered-button">
                <button className="fm-button" onClick={validateInput}>
                    <Add className="asc-button-icon" fontSize="small"/> Create Recipe
                </button>
            </div>   
        </div>
        </DialogContent>
    </Dialog>
  );
};

export default CreateDialog
