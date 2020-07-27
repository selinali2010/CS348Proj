import React, { useState } from 'react';
import { Dialog, DialogContent, useRadioGroup } from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import ChipInput from "./ChipInput";
import IngredientInput from "./IngredientInput";

import "./RecipeDialog.css"

const CreateDialog = ({open, handleClose, userName}) => {
    const emptyIngredient = {foodName: "", quantity: 0, unit: "", substitutions: []};
    const [recipeName, setRecipeName] = useState("");
    const [cookTime, setCookTime] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [cuisine, setCuisine] = useState("");
    const [servings, setServings] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [instructionsLink, setInstructionsLink] = useState("");
    const [ingredients, setIngredients] = useState([{...emptyIngredient}]);
    const [tags, setTags] = useState([]);
    const [errorState, setErr] = useState('');

    const validateInput = () => {
        let errors = "";
        let requiredFields = [];
        if (recipeName === "") requiredFields.push("Recipe Name");
        if (cuisine === "") requiredFields.push("Cuisine");
        if (cookTime <= 0) requiredFields.push("Cook Time");
        if (difficulty <= 0) requiredFields.push("Difficulty");
        if (servings <= 0) requiredFields.push("Servings");
        if (imageUrl === "") requiredFields.push("ImageUrl");
        if (instructionsLink === "") requiredFields.push("Instructions Link");
        ingredients.forEach(ing => {
            if (ing.foodName === "" && !requiredFields.includes("Ingredient Name")) requiredFields.push("Ingredient Name");
            if (ing.quantity <= 0 && !requiredFields.includes("Ingredient Quantity")) requiredFields.push("Ingredient Quantity");
            if (ing.unit === "" && !requiredFields.includes("Ingredient Unit")) requiredFields.push("Ingredient Unit");
        })
        if (requiredFields.length === 1) errors += requiredFields[0] + " is a required field"
        if (requiredFields.length === 2) errors += requiredFields[0] + " and " + requiredFields[1] +  " are required fields"
        else if (requiredFields.length > 2) {
            for (let i = 0; i < requiredFields.length -1; i++) {
                errors += requiredFields[i] + ', ';
            }
            errors += "and " + requiredFields[requiredFields.length-1] +  " are required fields"
        }
        
        if (errors === "") {
            sendCreateRequest();
        }
        else {
            setErr(errors);
        }
    }

    const sendCreateRequest = () => {
        let data = {
            recipe : {
                recipeName: recipeName,
                servings: servings,
                cookTime: cookTime,
                cuisine: cuisine,
                difficulty: difficulty,
                imageURL: imageUrl,
                instructionsLink: instructionsLink,
                authorName: userName
            },
            ingredient: ingredients,
            tags: tags
        }
        fetch(process.env.REACT_APP_API_URL+"api/newRecipe", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},                
            body: JSON.stringify(data),
        });
        closeModal();
    }

    const closeModal = () => {
        // Reset state to default
        setRecipeName("");
        setCookTime(0);
        setDifficulty(0);
        setCuisine("");
        setServings(0);
        setImageUrl("");
        setInstructionsLink("");
        setIngredients([{...emptyIngredient}]);
        setTags([]);
        setErr('');
        // Close modal
        handleClose();
    }

    const updateIngredient = (index, ingredientData) => {
        const temp = ingredients.map((el, i) => i === index ? ingredientData: el)
        setIngredients(temp);
    }
    const addIngredient = () => {
        const temp = ingredients.concat({...emptyIngredient});
        setIngredients(temp);
    }
    const removeIngredient = (index) => {
        const temp = ingredients.filter((e, i) => i !== index);
        setIngredients(temp);
    }

    const getErrorMessage = () => {
        if (errorState !== "") {
            return  <div className="user-box-error">
                <div className="alert alert-danger" role="alert">
                    {errorState}
                </div>
            </div>
        }
        else return <div className="empty-error-message"></div>
    }

return (
    <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="md">
        <DialogContent className="fm-dialog-content">
        <div className="no-gutters recipe-details" style={{'overflowY': 'auto'}} >
            <button className="close" aria-label="Close" onClick={closeModal}>
                <Close aria-hidden="true" />
            </button>
            <div className="recipe-details-section">
                <h1>Add a Recipe: </h1>
            </div>
            <h2> Recipe Details </h2>
            <div className="recipe-details-section row">
                <div className ="col-6">
                    <div className="row"> <div className="col-4"> Recipe Name: </div>
                        <input type="text" className="fm-text-input col-8" placeholder="Recipe name..."
                            onChange={ (e) => setRecipeName(e.target.value) } /></div>
                    <div className="row"> <div className="col-4"> Cuisine: </div>
                        <input type="text" className="fm-text-input col-8" placeholder="Cuisine..."
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
            <div className="recipe-details-section"> 
                <h2> Ingredients </h2>
                <div className="row"> <div className="col-11"> <div className="row">
                    <div className="col-3"> Ingredient Name </div>
                    <div className="col-1 no-padding"> Quantity </div>
                    <div className="col-2"> Unit </div>
                    <div className="col-6 no-padding"> Substitute Ingredients</div>
                </div></div></div>
                {ingredients.map((item, index) =>
                    <div key={index} className="row no-gutter">
                        <div className="col-11">
                        <IngredientInput index={index} updateIngredient={updateIngredient} ingredient={item}/>
                        </div>
                        <div className="col-1">
                        {(ingredients.length > 1)? 
                            <button className="delete-ing-button" onClick={()=>{removeIngredient(index)}}>
                                <Close className="asc-button-icon" fontSize="small"/>
                            </button> : <div/>}
                        </div>
                    </div>
                )}
                <div className="fm-centered-button">
                    <button className="fm-button" onClick={addIngredient}>
                        <Add className="asc-button-icon" fontSize="small"/> Add Ingredient
                    </button>
                </div>
            </div>
            <div className="recipe-details-section">
            <h2> Tags </h2>
            <ChipInput typeName="tag"
                values={tags}
                setValues={ (values) => setTags(values) } /></div>
            {getErrorMessage()}
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
