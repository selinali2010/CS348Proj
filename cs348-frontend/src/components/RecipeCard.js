import React from 'react';
import Card from 'react-bootstrap/Card';

const RecipeCard = ({recipe, handleClick}) => {
    return Object.keys(recipe).length !== 0 && (
        <div onClick={() => handleClick(recipe)}>
            <Card className="recipe-card">
                <div className={"recipe-card-top cuisine-"+recipe.cuisine}>
                    <div className="recipe-card-top-text">
                        {recipe.cuisine}
                    </div>
                </div>
                <img srcSet={recipe.imageUrl} className="card-img-top" src={"https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"} alt="Recipe"/>
                <div>
                    <div className="card-recipe-name"> {recipe.recipeName} </div>
                    <div className="card-recipe-author"> {recipe.authorName} </div>
                    <div className="card-recipe-time"> {recipe.cookTime} mins</div>
                </div>
            </Card>
        </div>
      );
}

export default RecipeCard;