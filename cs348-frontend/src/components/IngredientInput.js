import React, { useState, useEffect } from 'react';
import ChipInput from "./ChipInput";

import "./RecipeDialog.css"

const IngredientInput = ({index, updateIngredient, foodNameProp}) => {
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState("");
    const [substitutions, setSubstititions] = useState([]);

  useEffect(() => {
    updateIngredient(index, {
        foodName: foodName,
        quantity: quantity,
        unit: unit,
        substitutions: substitutions,
    });
  }, [foodName, quantity, unit, substitutions]);

  return (
    <div className="row">
        <div className="col-3">
            <input type="text" className="fm-text-input" placeholder="Ingredient Name"
                onChange={ (e) => setFoodName(e.target.value) } />
        </div>
        <div className="col-1">
            <input type="number" className="fm-text-input" placeholder="#"
                onChange={ (e) => setQuantity(e.target.value) } />
        </div>
        <div className="col-2">
            <input type="text" className="fm-text-input" placeholder="Unit"
                onChange={ (e) => setUnit(e.target.value)} />
        </div>
        <div className="col-5">
            <ChipInput typeName="tag" values={substitutions} 
                setValues={ (values) => setSubstititions(values)} />
        </div>
    </div>
  );
};

export default IngredientInput
