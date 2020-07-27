import React, { useState, useEffect } from 'react';
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
                onChange={ (e) => updateVal('foodName', e.target.value) } />
        </div>
        <div className="col-1">
            <input type="number" className="fm-text-input" placeholder="#"
                onChange={ (e) => updateVal('quantity', e.target.value) } />
        </div>
        <div className="col-2">
            <input type="text" className="fm-text-input" placeholder="Unit"
                onChange={ (e) => updateVal('unit', e.target.value)} />
        </div>
        <div className="col-5">
            <ChipInput typeName="tag" values={ingredient.substitutions} 
                setValues={ (values) => updateVal('substitutions', values)} />
        </div>
    </div>
  );
};

export default IngredientInput
