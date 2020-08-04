/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ChipInput from "./ChipInput";
import { Checkbox, Collapse, FormControlLabel } from "@material-ui/core";
import { AddSharp, RemoveSharp, Search } from '@material-ui/icons';
import { addResults } from "../redux/actions";
import { getResultsOrder } from '../redux/selectors';


const mapStateToProps = state => {
    let orderBy, asc;
    ({orderBy, asc} = getResultsOrder(state));
    if (orderBy === "Closest Match") orderBy = 0;
    else if (orderBy === "Difficulty") orderBy = 1;
    else orderBy = 2;
    return { orderBy, asc };
};

const SearchContentBox = ({orderBy, asc, addResults}) => {
    const [activeSearch, setActiveSearch] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);
    const [isCollapse, setIsCollapse] = useState(false);
    const [exclude, setExclude] = useState([]);
    const [isStrict, setIsStrict] = useState(false);
    const [isSubs, setIsSubs] = useState(false);

    useEffect(() => {
        if (activeSearch) {
            searchRecipes();
        }
    }, [orderBy, asc])

    const searchRecipes = () => {
        const fetchData = async () => {
            // const response = await fetch(process.env.NODE_ENV == "production" ? process.env.REACT_APP_API_URL: "http://localhost:8080/"+ "api/search");
            const response = await fetch(process.env.REACT_APP_API_URL+"api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  recipeName: recipeName, 
                  ingredients: ingredients, 
                  tags: tags, 
                  orderBy: orderBy, 
                  isAsc: asc,
                  isStrict: isStrict, 
                  isSubs: isSubs,
                  exclude: exclude
                }),
            });
            const data = await response.json();
            addResults(data);
            setActiveSearch(true);
        }
        fetchData();
    }

    const handleCollapseChange = (e) => {
      if (!e.target.checked){
        setExclude([]);
        setIsStrict(false);
        setIsSubs(false);
      }
      setIsCollapse(e.target.checked)
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
                        onChange={ (e) => setRecipeName(e.target.value) } />

                    <div> Search By Ingredients: </div>
                    <ChipInput typeName="ingredient"
                        values={ingredients}
                        setValues={ (values) => setIngredients(values) } />

                    <div> Search By Tags: </div>
                    <ChipInput typeName="tag"
                        values={tags}
                        setValues={ (values) => setTags(values) } />
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="default"
                          size="small"
                          checked={isCollapse}
                          icon={<AddSharp/>}
                          checkedIcon={<RemoveSharp/>}
                          onChange={handleCollapseChange}
                        />
                      }
                      label={<div className="fm-checkbox-label">{isCollapse ? "Close Advanced Search" : "See Advanced Search"}</div>}
                    />
                    <Collapse in={isCollapse}>
                      <div> Ingredients to Exclude: </div>
                      <ChipInput typeName="ingredient"
                          values={exclude}
                          setValues={(values) => setExclude(values)} />
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="default"
                            size="small"
                            checked={isStrict}
                            onChange={(event) => setIsStrict(event.target.checked)}
                          />
                        }
                        label={<div className="fm-checkbox-label">Strict Mode</div>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="default"
                            size="small"
                            checked={isSubs}
                            onChange={(event) => setIsSubs(event.target.checked)}
                          />
                        }
                        label={<div className="fm-checkbox-label">Allow Substitutions</div>}
                      />
                    </Collapse>
                </form>
                <div className="fm-centered-button">
                    <button className="fm-button" onClick={searchRecipes}>
                    <Search className="asc-button-icon" fontSize="small"/> Search
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
