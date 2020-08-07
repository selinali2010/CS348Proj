/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ChipInput from "./ChipInput";
import { Checkbox, Collapse, FormControlLabel } from "@material-ui/core";
import { AddSharp, RemoveSharp, Search } from '@material-ui/icons';
import { addResults, setStrict, setIngredientsState, setPaginationState } from "../redux/actions";
import { getResultsOrder, getPaginationState } from '../redux/selectors';

const mapStateToProps = state => {
    let highestPage, pageCount, orderBy, asc;
    ({orderBy, asc} = getResultsOrder(state));
    ({ highestPage, pageCount } = getPaginationState(state));

    return { orderBy, asc, highestPage };
};

const SearchContentBox = ({orderBy, asc, addResults, setStrict, setIngredientsState, highestPage, pageCount }) => {
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

    useEffect(() => {
      // If highest page changes, it is because the user has requested the next page of results
      console.log(highestPage);
      // TODO : REQUERY FOR THE NEXT PAGE
      // then, add the next page to the results list using searchRecipes() / addResults
    }, [highestPage])

    const searchRecipes = () => {
        // TODO: If this function is being called directly from search button, set getCount = true
        // otherwise (page updates) then getCount should be false

        const fetchData = async () => {
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
                  exclude: exclude,
                  resultsPerPage: 15,
                  // page: highestPage
                  // getCount: true or false :)
                }),
            });
            const data = await response.json();
            addResults(data);
            setActiveSearch(true);
        }
        fetchData();

        // TODO: add the total number of pages to the state such that the results page knows when to requery
        // if (getCount = true && highestPage === 0)
        //   setPaginationState(pageCount, 1);
        // else 
        //   setPaginationState(pageCount, highestPage);
    }

    const handleCollapseChange = (e) => {
      if (!e.target.checked){
        setExclude([]);
        setIsStrict(false);
        setStrict(false);
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
                        setValues={ (values) => {setIngredients(values); setIngredientsState(values)} } />

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
                            onChange={(event) => {setIsStrict(event.target.checked); setStrict(event.target.checked)}}
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
    { addResults, setStrict, setIngredientsState, setPaginationState}
)(SearchContentBox);
