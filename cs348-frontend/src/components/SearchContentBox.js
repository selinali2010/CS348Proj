import React from "react";
import { connect } from "react-redux";
import { addResults } from "../redux/actions";
import ChipInput from "./ChipInput";

class SearchContentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeName: "",
            ingredients: [],
            tags: [],
        };
    }

    searchRecipes = () => {
        const fetchData = async () => {
            // const response = await fetch(process.env.NODE_ENV == "production" ? process.env.REACT_APP_API_URL: "http://localhost:8080/"+ "api/recipes");
            const response = await fetch(process.env.REACT_APP_API_URL+"api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state),
            });
            //fetch(process.env.REACT_APP_API_URL + "api/recipes");
            const data = await response.json();
            this.props.addResults(data);
        }
        fetchData();
    }

    render() {
        return (
            <div className="section section-fill-height search-content-box">
                <div className="section-title">
                    <div className="section-title-text">
                        Search
                    </div>
                </div>
                <div className="section-body search-content-body">
                    <form>
                        <div> Search By Recipe Name: </div>
                        <input type="text" className="fm-text-input" placeholder="Search by recipe name..."
                            value={this.state.recipeName}
                            onChange={ (e) => this.setState({recipeName: e.target.value}) } />

                        <div> Search By Ingredients: </div>
                        <ChipInput typeName="ingredient"
                            values={this.state.ingredients}
                            setValues={ (values) => this.setState({ingredients: values}) } />

                        <div> Search By Tags: </div>
                        <ChipInput typeName="tag"
                            values={this.state.tags}
                            setValues={ (values) => this.setState({tags: values}) } />
                    </form>
                    <div className="fm-centered-button">
                        <button className="fm-button" onClick={this.searchRecipes}>
                            Search!
                        </button>
                    </div>
                    <div>{JSON.stringify(this.state)}</div>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { addResults }
)(SearchContentBox);
