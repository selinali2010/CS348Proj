import React, { useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import ChipInput from "./ChipInput";
import IngredientInput from "./IngredientInput";

import "./RecipeDialog.css"

const CreateDialog = ({open, handleClose, userName}) => {
    const emptyIngredient = {foodName: "", quantity: 1, unit: "", substitutions: []};
    const [recipeName, setRecipeName] = useState("");
    const [cookTime, setCookTime] = useState(0);
    const [difficulty, setDifficulty] = useState(null);
    const [cuisine, setCuisine] = useState("");
    const [servings, setServings] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [instructionsLink, setInstructionsLink] = useState("");
    const [ingredients, setIngredients] = useState([emptyIngredient]);
    const [numIngredients, setNumIngredients] = useState(1);
    const [tags, setTags] = useState([]);

    const validateInput = () => {
        let errors = "";
        // let requiredFields = [];
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

    const updateIngredient = (index, ingredientData) => {
        let temp = ingredients;
        console.log(index);
        temp[index] = ingredientData;
        console.log(temp[0].foodName)
        setIngredients(temp);
    }
    const addIngredient = () => {
        let temp = ingredients;
        temp.push(emptyIngredient);
        setIngredients(temp);
        setNumIngredients(numIngredients+1);
    }
    const removeIngredient = (index) => {
        let temp = ingredients;
        temp.splice(index, 1);
        setIngredients(temp);  
        console.log(temp[0].foodName);  
        setNumIngredients(numIngredients-1);
    }
    const getIngredientsRow = () => {
        return <div> 
            {ingredients.map((item, index) => 
                <div key={item.foodName}>
                    <IngredientInput index={index} updateIngredient={updateIngredient} foodNameProp={item.foodName}/>
                    <button onClick={()=>{removeIngredient(index)}}> - </button>
                </div>
            )}
        </div>
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
                        <input type="number" min="1" max="5" className="fm-text-input col-8" placeholder="Difficulty Rating..."
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
                <div className="row">
                    <div className="col-3"> Ingredient Name </div>
                    <div className="col-1"> Quantity </div>
                    <div className="col-2"> Unit </div>
                    <div className="col-5"> Substitute Ingredients</div>
                </div>
                { getIngredientsRow() }
                <button onClick={addIngredient}>
                    +
                </button>
                
            </div>
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
