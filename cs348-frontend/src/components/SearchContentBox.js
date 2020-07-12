import React, { useState } from "react";
import { connect } from "react-redux";
import { addResults } from "../redux/actions";
import { getResultsOrder, getResultsState } from '../redux/selectors'
import ChipInput from "./ChipInput";

const mapStateToProps = state => {
    let orderBy, asc;
    let recipes = getResultsState(state).recipes;
    ({orderBy, asc} = getResultsOrder(state));
    if (orderBy === "Closest Match") orderBy = 0;
    else if (orderBy === "Difficulty") orderBy = 1;
    else orderBy = 2;
    return { orderBy, asc, recipes };
};

const SearchContentBox = ({orderBy, asc, addResults, recipes}) => {
    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);

    const searchRecipes = () => {
        console.log(orderBy);
        console.log(asc);
        const fetchData = async () => {
            // const response = await fetch(process.env.NODE_ENV == "production" ? process.env.REACT_APP_API_URL: "http://localhost:8080/"+ "api/search");
            const response = await fetch(process.env.REACT_APP_API_URL+"api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({recipeName: recipeName, ingredients: ingredients, tags: tags, orderBy: orderBy, isAsc: asc}),
            });
            const data = await response.json();
            addResults(data);
        }
        fetchData();
    }  

    return (
        <div className="section section-fill-height">
            <div className="section-title">
                <div className="section-title-text">
                    Search
                </div>
            </div>
            <div className="section-body search-section-body">
                <form>
                    <div> Search By Recipe Name: </div>
                    <input type="text" className="fm-text-input" placeholder="Search by recipe name..."
                        value={recipeName}
                        onChange={ (e) => setRecipeName({recipeName: e.target.value}) } />

                    <div> Search By Ingredients: </div>
                    <ChipInput typeName="ingredient"
                        values={ingredients}
                        setValues={ (values) => setIngredients({ingredients: values}) } />

                    <div> Search By Tags: </div>
                    <ChipInput typeName="tag"
                        values={tags}
                        setValues={ (values) => setTags({tags: values}) } />
                </form>
                <div className="fm-centered-button">
                    <button className="fm-button" onClick={searchRecipes}>
                        Search!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default connect(
    mapStateToProps,
    { addResults }
)(SearchContentBox);
