/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getUserState, getUserFavourites, getFavouritesFilter } from '../redux/selectors'
import { setFavourites } from "../redux/actions";
import { connect } from "react-redux";
import { Dialog, DialogContent, Popover } from '@material-ui/core';
import { Close, Launch, Info } from '@material-ui/icons';
import { capitalizeFirstLetter } from "./stringhelpers"
import Chart from './Chart';
import Chip from './Chip';
import "./RecipeDialog.css"

const mapStateToProps = state => {
  const userId = getUserState(state);
  const favourites = getUserFavourites(state);
  const favouritesFilter = getFavouritesFilter(state);
  return { userId, favourites, favouritesFilter };
};

const RecipeDialog = ({open, recipe, handleClose, userId, favourites, favouritesFilter , setFavourites}) => {
  const [ingredients, setIngredients] = useState(null);
  const [tags, setTags] = useState(null);
  const [mood, setMood] = useState(null);
  const [moodCount, setMoodCount] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (ingredients != null) {
        setIngredients(null);
        setTags(null);
        setMood(null);
        setMoodCount(null);
        setAnchorEl(null);
      }
      if(Object.keys(recipe).length !== 0){
        // Fetch recipe ingredients and merge substition results
        fetch(process.env.REACT_APP_API_URL + "api/ingredients/" + recipe.recipeId, {method: 'GET'}).then(res1 => {
          res1.json().then(ingredients => {
            fetch(process.env.REACT_APP_API_URL + "api/substitutions/" + recipe.recipeId, {method: 'GET'}).then(res2 => {
              res2.json().then(substitutions => {
                for (let ing of ingredients) {
                  ing.subs = substitutions.filter((sub) => sub.foodName === ing.foodName).map((sub) => sub.substituteName);
                }
                setIngredients(ingredients);          
              })
            });
          })
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

  const setUserMood = async (newMood) => {
    if(mood !== 0){
      await removeUserMood(false);
    }

    await fetch(process.env.REACT_APP_API_URL + "api/react", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        recipeId: recipe.recipeId,
        mood: newMood
      }),
    });

    setMoodCount(moodCount.map(e => {
      if(e["mood"] === mood) e["count"]--
      else if(e["mood"] === newMood) e["count"]++
      return e
    }))
    setMood(newMood);

    if(newMood === favouritesFilter) {
      const temp = favourites;
      temp.push(recipe);
      setFavourites(temp);
    } else {
      if (favourites.filter(item => item.recipeId === recipe.recipeId).length > 0) {
        setFavourites(favourites.filter(item => item.recipeId !== recipe.recipeId));
      }
    }
  }

  const removeUserMood = async (setChanges = true) => {
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
    if(setChanges){
      setMoodCount(moodCount.map(e => { if(e["mood"] === mood) e["count"]--; return e}))
      if(mood === favouritesFilter && favourites.filter(item => item.recipeId !== recipe.recipeId).length > 0) {
        setFavourites(favourites.filter(item => item.recipeId !== recipe.recipeId));
      }
      setMood(0);
    }
  }

  const toggleMood = (newMood) => {
    if(!userId) return;
    if (mood !== newMood) {
      setUserMood(newMood);
    } else {
      removeUserMood();
    }
  }

  const getChart = () => {
    return <Chart moodCount={moodCount} toggleMood={toggleMood} userMood={mood} userId={userId}/>
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const getPopOverText = () => {
    if (anchorEl == null) {
      return "";
    }
    else {
      let ing = ingredients[anchorEl.value];
      let subSpan;
      if (ing.subs.length === 1) subSpan = <span className="sub"> {ing.subs[0]}</span>;
      else if (ing.subs.length === 2) subSpan = <span>
          <span className="sub">{ing.subs[0]}</span> or <span className="sub">{ing.subs[1]}</span>
        </span>;
      else {
        subSpan = <span>
            {ing.subs.slice(0, ing.subs.length-1).map((ele, index) => <span> <span key={index} className="sub"> {ele}</span>, </span>)}
            or<span className="sub"> {ing.subs[ing.subs.length-1]}</span>
        </span>
      }
      return <div>
        <span className="foodname">{capitalizeFirstLetter(ing.foodName)}</span> can be substituted in this recipe for {subSpan}.
      </div>
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}
        fullWidth={true}
        maxWidth="md">
      <DialogContent className="fm-dialog-content">
        <div className="row no-gutters recipe-details">
          <button className="close" aria-label="Close" onClick={handleClose}>
            <Close aria-hidden="true" />
          </button>
          <div className="col-md-6 recipe-details-col recipe-details-left-col">
            <div className="recipe-details-image">
              <span className="recipe-dot dot1"></span>
              <span className="recipe-dot dot2"></span>
              <span className="recipe-dot dot3"></span>
              <span className="recipe-dot dot4"></span>
              <img srcSet={recipe.imageUrl} src={"https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"} alt="Recipe" />
            </div>
            <div className="recipe-details-chart">
              { moodCount && getChart() }
            </div>
          </div>
          <div className="col-md-6 recipe-details-col recipe-details-right-col">
            <div className="recipe-details-section">
              <h1>{(recipe.recipeName)? capitalizeFirstLetter(recipe.recipeName) : recipe.recipeName}</h1>
            </div>

            <div className="recipe-details-section">
              <table><tbody>
                <tr>
                  <th>Author:</th>
                  <td>{recipe.authorName} </td>
                </tr>
                <tr>
                  <th>Cuisine:</th>
                  <td>{recipe.cuisine} </td>
                </tr>
                <tr>
                  <th>Cook Time:</th>
                  <td>{recipe.cookTime} mins</td>
                </tr>
                <tr>
                  <th>Serves:</th>
                  <td>{recipe.servings} </td>
                </tr>
                <tr>
                  <th>Difficulty:</th>
                  <td>{recipe.difficulty} </td>
                </tr>
              </tbody></table>
            </div>

            <div className="recipe-details-section">
              <h2>Tags</h2>
              <div className="chips">
                { tags && tags.map((tag, index) => 
                    <Chip key={index} label={tag.tagName} />
                )}
              </div>
            </div>

            <div className="recipe-details-section">
              <h2>Ingredients</h2>
              <ul>
                {ingredients && ingredients.map(
                  (ele, index) => <li key={index} id="">
                    {ele.quantity} {ele.unit} {ele.foodName}
                    {(ele.subs.length > 0)? <button value={index} 
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        className="ingredients-more-info">
                      <Info aria-hidden="true" />
                    </button> : ""}
                  </li>)}
                  <Popover
                    id="mouse-over-popover"
                    open={anchorEl !== null}
                    style={{'pointerEvents': 'none'}}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    {getPopOverText()}
                  </Popover>
              </ul>
            </div>

            <div className="recipe-details-section">
              <a className="fm-button" 
                  href={recipe.instructionsLink} target="_blank" rel="noopener noreferrer">
                <Launch className="asc-button-icon" fontSize="small"/> View Full Recipe
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default connect(mapStateToProps, { setFavourites })(RecipeDialog)
