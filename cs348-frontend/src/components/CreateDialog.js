import React, { useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import ChipInput from "./ChipInput";
import IngredientInput from "./IngredientInput";
import { multiStringListify } from "./stringhelpers"

import "./RecipeDialog.css"

const CreateDialog = ({open, handleClose, userName}) => {
    const emptyIngredient = {foodName: "", quantity: 0, unit: "", substitutes: []};
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
        if (recipeName === "") requiredFields.push("Recipe Title");
        if (cookTime <= 0) requiredFields.push("Cook Time");
        if (servings <= 0) requiredFields.push("Servings");
        if (difficulty <= 0) requiredFields.push("Difficulty");
        if (cuisine === "") requiredFields.push("Cuisine");
        if (instructionsLink === "") requiredFields.push("Instructions Link");
        if (imageUrl === "") requiredFields.push("Image URL");
        ingredients.forEach(ing => {
            if (ing.foodName === "" && !requiredFields.includes("Ingredient Name")) requiredFields.push("Ingredient Name");
            if (ing.quantity <= 0 && !requiredFields.includes("Ingredient Quantity")) requiredFields.push("Ingredient Quantity");
            if (ing.unit === "" && !requiredFields.includes("Ingredient Unit")) requiredFields.push("Ingredient Unit");
        })
        if (requiredFields.length === 1) errors += requiredFields[0] + " is a required field."
        else if (requiredFields.length > 1) {
            errors = multiStringListify(requiredFields, 'and') + " are required fields."
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
        <div className="row no-gutters recipe-details recipe-create" >
            <button className="close" aria-label="Close" onClick={closeModal}>
                <Close aria-hidden="true" />
            </button>
            <div className="col-12 recipe-details-col">
                <div className="recipe-details-section">
                    <input type="text" className="fm-text-input fm-text-input-large" placeholder="Recipe Title..." />
                </div>
            </div>
            <div className="col-md-5 recipe-details-col">
                <div className="recipe-details-section">
                    <table className="recipe-create-table"><tbody>
                        <tr>
                            <th>Cook&nbsp;Time:</th>
                            <td>
                                <span><input type="number" className="fm-text-input fm-text-input-number" placeholder="Cook Time..."
                                    onChange={ (e) => setCookTime(e.target.value) } /></span>
                                <span>&nbsp;mins</span>
                            </td>
                        </tr>
                        <tr>
                            <th>Serves:</th>
                            <td>
                                <input type="number" min="1" className="fm-text-input fm-text-input-number" placeholder="Servings..."
                                    onChange={ (e) => setServings(e.target.value) } />
                            </td>
                        </tr>
                        <tr>
                            <th>Difficulty:</th>
                            <td>
                                <input type="number" min="1" className="fm-text-input fm-text-input-number" placeholder="Difficulty Rating..."
                                    onChange={ (e) => setDifficulty(e.target.value) } />
                            </td>
                        </tr>
                    </tbody></table>
                </div>
            </div>
            <div className="col-md-7 recipe-details-col">
                <div className="recipe-details-section">
                    <table className="recipe-create-table"><tbody>
                        <tr>
                            <th>Cuisine:</th>
                            <td>
                                <input type="text" className="fm-text-input" placeholder="Cuisine..."
                                    onChange={ (e) => setCuisine(e.target.value) } />
                            </td>
                        </tr>
                        <tr>
                            <th>Instructions:</th>
                            <td>
                                <input type="text" className="fm-text-input" placeholder="Instructions Link..."
                                    onChange={ (e) => setInstructionsLink(e.target.value) } />
                            </td>
                        </tr>
                        <tr>
                            <th>Image:</th>
                            <td>
                                <input type="text" className="fm-text-input" placeholder="Image URL..."
                                    onChange={ (e) => setImageUrl(e.target.value) } />
                            </td>
                        </tr>
                    </tbody></table>
                </div>
            </div>
            <div className="col-12 recipe-details-col recipe-details-section">
                <h2> Tags </h2>
                <ChipInput typeName="tag"
                    values={tags}
                    setValues={ (values) => setTags(values) } />
            </div>
            <div className="col-12 recipe-details-col recipe-details-section"> 
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
                        <button className="fm-button delete-ing-button" onClick={()=>{removeIngredient(index)}}>
                            <Close className="fm-button-icon"/>
                        </button>
                        </div>
                    </div>
                )}
                <div className="fm-centered-button">
                    <button className="fm-button" onClick={addIngredient}>
                        <Add className="fm-button-icon"/>
                        <span className="fm-button-text">Add Ingredient</span>
                    </button>
                </div>
            </div>
            <div className="col-12 recipe-details-col recipe-details-section"> 
                {getErrorMessage()}
                <div className="fm-centered-button">
                    <button className="fm-button" onClick={validateInput}>
                        <Add className="fm-button-icon"/>
                        <span className="fm-button-text">Create Recipe</span>
                    </button>
                </div>
            </div>
        </div>
        </DialogContent>
    </Dialog>
  );
};

export default CreateDialog
