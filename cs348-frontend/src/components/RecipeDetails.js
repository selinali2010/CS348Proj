import React, { useEffect, useState } from 'react';

const RecipeDetails = ({recipe, handleClose}) => {
  const [ingredients, setIngredients] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if(Object.keys(recipe).length !== 0){
        // const response = await fetch(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL: 'http://localhost:8080/'+ "api/recipes");          
        const res1 = await fetch(process.env.REACT_APP_API_URL + "api/ingredients/" + recipe.recipeId, {method: 'GET'});
        const ingData = await res1.json();
        setIngredients(ingData);

        const res2 = await fetch(process.env.REACT_APP_API_URL + "api/tags/" + recipe.recipeId, {method: 'GET'});
        const tagsData = await res2.json();
        setTags(tagsData);
      }
    }
    fetchData();
  }, [recipe]);

  return (
    <div className="row modal-recipe">
      <button className="close" aria-label="Close" onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      <div className="col-6 modal-recipe-left-col">
        <img src={recipe.imageUrl} className="modal-img" alt={"https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"}></img>
        <img src={recipe.imageUrl} className="modal-img" alt={"https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"}></img>
      </div>
      <div className="col-6 modal-recipe-right-col">
        <div className="modal-recipe-header"> {recipe.recipeName} </div>
        <div className="modal-recipe-details"> Author: {recipe.authorName} </div>
        <div className="modal-recipe-details"> Cuisine: {recipe.cuisine} </div>
        <div className="modal-recipe-details"> CookTime: {recipe.cookTime} mins</div>
        <div className="modal-recipe-details"> Serves: {recipe.servings} </div>
        <a className="modal-recipe-url" href={"https://" + recipe.instructionsLink} target="_blank" className="button">View Full Recipe</a>
        
        <div className="modal-recipe-subheader"> Tags </div>
        <ul>
          {tags && tags.map((ele, index) => <li key={index} className="modal-recipe-details">{ele.tagName}</li>)}
        </ul>
        
        <div className="modal-recipe-subheader"> Ingredients </div>
        <ul>
          {ingredients && ingredients.map(
            (ele, index) => <li key={index} className="modal-recipe-details">{ele.quantity} {ele.unit} {ele.foodName}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default (RecipeDetails);