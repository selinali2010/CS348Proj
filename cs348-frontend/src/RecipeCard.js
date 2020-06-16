import React from 'react';

const RecipeCard = ({recipe}) => {
    return Object.keys(recipe).length !== 0 && (
        <div className="card" style={{width: '18rem', margin: '5px'}}>
            <img src={recipe.imageUrl} className="card-img-top" alt={"https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"}/>
            <div className="card-body">
                <h5 className="card-text">{recipe.recipeName}</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" key="authorName">By: {recipe.authorName}</li>
                    <li className="list-group-item" key="cookTime">Cook Time: {recipe.cookTime}</li>
                    <li className="list-group-item" key="cuisine">Cuisine: {recipe.cuisine}</li>
                    <li className="list-group-item" key="difficulty">Difficulty: {recipe.difficulty}</li>
                    <li className="list-group-item" key="servings">Servings: {recipe.servings}</li>
                </ul>
                <a href={"//" + recipe.instructionsLink} className="card-link" target="_blank">More information</a>
            </div>
        </div>
      );
}

export default RecipeCard;