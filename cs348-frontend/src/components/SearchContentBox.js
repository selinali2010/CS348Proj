import React from 'react';
import { connect } from "react-redux";
import { addResults } from '../redux/actions';
import ChipInput from './ChipInput';

const SearchContentBox = ({addResults}) => {

    const searchRecipes = () => {
        async function fetchData() {
            let recipeName = document.getElementById('recipeName').value;
            let ingredients = document.getElementById('ingredientName').value;
            let tags = document.getElementById('tagName').value;
            let searchParams = {};
            if (recipeName.length > 0) {
                searchParams["recipeName"] = recipeName;
            }
            if (ingredients.length > 0) {
                searchParams["ingredients"] = ingredients.split(" ");
            }
            if (tags.length > 0) {
                searchParams["tags"] = tags.split(" ");
            }
            // const response = await fetch(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL: 'http://localhost:8080/'+ "api/recipes");          
            const response = await fetch(process.env.REACT_APP_API_URL+"api/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },                
                body: JSON.stringify(searchParams),
            });
            //fetch(process.env.REACT_APP_API_URL + "api/recipes");
            const data = await response.json();
            addResults(data);
        }
        fetchData();
    }

    return (        
        <div className="search-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    Search
                </div>
            </div>
            <div className="section-body search-content-body">
                <form action="/action_page.php">
                    <div> Search By Recipe Name: </div>
                    <input type="text" id="recipeName" name="recipeName" placeholder='Search by recipe name...' />
                    <div> Search By Ingredients: </div>
                    <ChipInput id="ingredientName" name="ingredientName" typeName="ingredient" />
                    <div> Search By Tags: </div>
                    <ChipInput id="tagName" name="tagName" typeName="tag" />
                </form>
                <button onClick={searchRecipes}>
                    Search!
                </button>
            </div>
        </div>
      );
}
export default connect(
    null,
    { addResults }
  )(SearchContentBox);