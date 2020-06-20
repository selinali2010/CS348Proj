import React from 'react';

const RecipeCard = ({recipe}) => {
    return Object.keys(recipe).length !== 0 && (
        <div className="card recipe-card">
            <div className={"recipe-card-top cuisine-"+recipe.cuisine}>
                <div className="recipe-card-top-text">
                    {recipe.cuisine}
                </div>
            </div>
            <img src={recipe.imageUrl} className="card-img-top" alt={"https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"}/>
            <div className="recipe-card-body">
                <div className="card-recipe-name"> {recipe.recipeName} </div>
                <div className="card-recipe-author"> {recipe.authorName} </div>
                <div className="card-recipe-time"> {recipe.cookTime} mins</div>
            </div>
        </div>
      );
}

export default RecipeCard;