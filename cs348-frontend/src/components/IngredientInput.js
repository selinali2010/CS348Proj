import React from 'react';
import ChipInput from "./ChipInput";

import "./RecipeDialog.css"

const IngredientInput = ({index, updateIngredient, ingredient}) => {
  const updateVal = (field, data) => {
    ingredient[field] = data;
    updateIngredient(index, ingredient);
  }

  return (
    <div className="row">
        <div className="col-3">
            <input type="text" id={"name"+index} className="fm-text-input" placeholder="Ingredient Name"
                value={ingredient.foodName} onChange={ (e) => updateVal('foodName', e.target.value) } />
        </div>
        <div className="col-1 no-padding">
            <input type="number" className="fm-text-input" placeholder="#"
                value={ingredient.quantity} onChange={ (e) => updateVal('quantity', e.target.value) } />
        </div>
        <div className="col-2">
            <input type="text" className="fm-text-input" placeholder="Unit"
                value={ingredient.unit} onChange={ (e) => updateVal('unit', e.target.value)} />
        </div>
        <div className="col-6 no-padding">
            <ChipInput typeName="substitute" values={ingredient.substitutes} 
                setValues={ (values) => updateVal('substitutes', values)} />
        </div>
    </div>
  );
};

export default IngredientInput
