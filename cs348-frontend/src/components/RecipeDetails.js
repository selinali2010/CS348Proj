import React, { forwardRef, useEffect, useState } from 'react';
import { getUserState } from '../redux/selectors'
import { connect } from "react-redux";

const mapStateToProps = state => {
  const userId = getUserState(state);
  return { userId };
};

const RecipeDetails = forwardRef(({recipe, handleClose, userId}, ref) => {
  const [ingredients, setIngredients] = useState(null);
  const [tags, setTags] = useState(null);
  const [mood, setMood] = useState(null);

  useEffect(() => {
    console.log(userId);
    const fetchData = async () => {
      if(Object.keys(recipe).length !== 0){
        const res1 = await fetch(process.env.REACT_APP_API_URL + "api/ingredients/" + recipe.recipeId, {method: 'GET'});
        const ingData = await res1.json();
        setIngredients(ingData);

        const res2 = await fetch(process.env.REACT_APP_API_URL + "api/tags/" + recipe.recipeId, {method: 'GET'});
        const tagsData = await res2.json();
        setTags(tagsData);

        if (userId) {
          const res3 = await fetch(process.env.REACT_APP_API_URL + "api/mood/userId=" + userId + "&recipeId=" + recipe.recipeId, {method: 'GET'});
          const userMoodData = await res3.json();
          if (userMoodData[0]) {
            setMood(userMoodData[0].mood);
          } else {
            setMood(0);
          }
        } else {
          setMood(0);
        }
      }
    }
    fetchData();
  }, [recipe]);

  const setUserMood = async () => {
    let mood = 1;
    const res = await fetch(process.env.REACT_APP_API_URL + "api/react", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        recipeId: recipe.recipeId,
        mood: mood // DEFAULT - change this later
      }),
    });
    setMood(mood);
  }

  const removeUserMood = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + "api/react", {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        recipeId: recipe.recipeId
      }),
    });
    const data = await res.json();
    setMood(0);
  }

  const setFavoritesButton = () =>{
    if (mood === 0 && userId) {
      return <button className="fm-button" onClick={setUserMood}>
        Add To Favorites!
      </button>
    } else if (userId && mood !== null) {
      return <button className="fm-button" onClick={removeUserMood}>
        Unfavorite Recipe
      </button>
    }
  }

  return (
    <div className="modal-content">
      <div className="fm-modal-header">
        <button className="close" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="row modal-recipe" ref={ref}>
        <div className="col-6 modal-recipe-left-col">
          <div className="modal-recipe-image">
            <span className="recipe-dot dot1"></span>
            <span className="recipe-dot dot2"></span>
            <span className="recipe-dot dot3"></span>
            <span className="recipe-dot dot4"></span>
            <img src={recipe.imageUrl} className="modal-img" alt={"https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"}></img>
          </div>
          <img src={recipe.imageUrl} className="modal-img" alt={"https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"}></img>
        </div>
        <div className="col-6 modal-recipe-right-col">
          <div className="modal-recipe-header"> {recipe.recipeName} </div>
          <div className="modal-recipe-details"> Author: {recipe.authorName} </div>
          <div className="modal-recipe-details"> Cuisine: {recipe.cuisine} </div>
          <div className="modal-recipe-details"> CookTime: {recipe.cookTime} mins</div>
          <div className="modal-recipe-details"> Serves: {recipe.servings} </div>
          <a className="modal-recipe-url button" href={"https://" + recipe.instructionsLink} target="_blank" rel="noopener noreferrer">View Full Recipe</a>
          
          <div className="modal-recipe-subheader"> Tags </div>
          <ul>
            {tags && tags.map((ele, index) => <li key={index} className="modal-recipe-details">{ele.tagName}</li>)}
          </ul>
          
          <div className="modal-recipe-subheader"> Ingredients </div>
          <ul>
            {ingredients && ingredients.map(
              (ele, index) => <li key={index} className="modal-recipe-details">{ele.quantity} {ele.unit} {ele.foodName}</li>)}
          </ul>
          {setFavoritesButton()}
        </div>
      </div>
    </div>
  );
});

export default connect(mapStateToProps)(RecipeDetails)