import React, { forwardRef, useEffect, useState } from 'react';
import { getUserState, getUserFavourites } from '../redux/selectors'
import { setFavourites } from "../redux/actions";
import { connect } from "react-redux";
import Chart from './Chart';

const mapStateToProps = state => {
  const userId = getUserState(state);
  const favourites = getUserFavourites(state);
  return { userId, favourites };
};

const RecipeDetails = forwardRef(({recipe, handleClose, userId, favourites, setFavourites}, ref) => {
  const [ingredients, setIngredients] = useState(null);
  const [tags, setTags] = useState(null);
  const [mood, setMood] = useState(null);
  const [moodCount, setMoodCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if(Object.keys(recipe).length !== 0){
        // Fetch recipe ingredients
        fetch(process.env.REACT_APP_API_URL + "api/ingredients/" + recipe.recipeId, {method: 'GET'}).then(res => {
          res.json().then(ingredients => setIngredients(ingredients))
        });
        // Fetch recipe tags
        fetch(process.env.REACT_APP_API_URL + "api/tags/" + recipe.recipeId, {method: 'GET'}).then(res => {
          res.json().then(tags => setTags(tags))
        });
        // Fetch recipe moods
        fetch(process.env.REACT_APP_API_URL + "api/reactCount/" + recipe.recipeId, {method: 'GET'}).then(res => {
          res.json().then(moods => {
            for (let i = 1; i <= 6; i++){
              if (moods.findIndex(e => e["mood"] === i) === -1){
                moods.push({ count: 0, mood: i })
              }
            }
            setMoodCount(moods.sort((a,b) => a["mood"] - b["mood"]));
          })
        });
        // Fetch user-specific reacts
        if (userId) {
          fetch(process.env.REACT_APP_API_URL + "api/mood/userId=" + userId + "&recipeId=" + recipe.recipeId, {method: 'GET'}).then(res => {
            res.json().then(userReact => { setMood((userReact[0])? userReact[0].mood : 0)})
          });
        } else { setMood(0); }
      }
    }
    fetchData();
  }, [recipe, userId]);

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
    const temp = favourites;
    temp.push(recipe);
    setFavourites(temp);
  }

  const removeUserMood = async () => {
    await fetch(process.env.REACT_APP_API_URL + "api/react", {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        recipeId: recipe.recipeId
      }),
    });
    setMood(0);    
    setFavourites(favourites.filter(item => item.recipeId !== recipe.recipeId));
  }

  const setFavouritesButton = () =>{
    if (mood === 0 && userId) {
      return <button className="fm-button" onClick={setUserMood}>
        Add To Favourites!
      </button>
    } else if (userId && mood !== null) {
      return <button className="fm-button" onClick={removeUserMood}>
        Unfavorite Recipe
      </button>
    }
  }

  const getChart = () => {
    return <Chart moodCount={moodCount}/>
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
            <img srcSet={recipe.imageUrl} className="modal-img" src={"https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"} alt="Recipe"></img>
          </div>
          { moodCount && getChart() }
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
          {setFavouritesButton()}
        </div>
      </div>
    </div>
  );
});

export default connect(mapStateToProps, { setFavourites })(RecipeDetails)