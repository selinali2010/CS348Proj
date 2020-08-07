/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ChipInput from "./ChipInput";
import { Checkbox, Collapse, FormControlLabel } from "@material-ui/core";
import { AddSharp, RemoveSharp, Search } from '@material-ui/icons';
import { addResults, setStrict, setIngredientsState, setPageCount } from "../redux/actions";
import { getResultsOrder, getPaginationState } from '../redux/selectors';

const mapStateToProps = state => {
    let page, pageCount, orderBy, asc;
    ({ orderBy, asc } = getResultsOrder(state));
    ({ page, pageCount } = getPaginationState(state));

    return { orderBy, asc, page, pageCount };
};

const SearchContentBox = ({orderBy, asc, page, pageCount, addResults, setStrict, setIngredientsState, setPageCount }) => {
    const [activeSearch, setActiveSearch] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);
    const [isCollapse, setIsCollapse] = useState(false);
    const [exclude, setExclude] = useState([]);
    const [isStrict, setIsStrict] = useState(false);
    const [isSubs, setIsSubs] = useState(false);
    const [lastSearch, setLastSearch] = useState([]);

    useEffect(() => {
        if (activeSearch) {
            searchRecipes(false)();
        }
    }, [orderBy, asc])

    useEffect(() => {
        console.log(page);
        if (activeSearch) {
            searchRecipes(false)();
        }
    }, [page])

    const searchRecipes = (isNewSearch) => () => {
        let searchParams = lastSearch;
        if (isNewSearch) {
            searchParams = {
                recipeName: recipeName, 
                ingredients: ingredients, 
                tags: tags,
                isStrict: isStrict, 
                isSubs: isSubs,
                exclude: exclude
            };
            setLastSearch(searchParams)
        }
        (async () => {
            const response = await fetch(process.env.REACT_APP_API_URL+"api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...searchParams,
                    orderBy: orderBy,
                    isAsc: asc,
                    page: isNewSearch ? 1 : page,
                    getCount: isNewSearch
                }),
            });
            const data = await response.json();
            addResults(data);
            setActiveSearch(true);
            if (isNewSearch) {
                setPageCount(data.pageCount);
            }
        })();
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
                    <button className="fm-button" onClick={searchRecipes(true)}>
                    <Search className="asc-button-icon" fontSize="small"/> Search
                    </button>
                </div>
            </div>
        </div>
    );
}

export default connect(
    mapStateToProps,
    { addResults, setStrict, setIngredientsState, setPageCount }
)(SearchContentBox);
