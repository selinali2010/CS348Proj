import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import RecipeCard from './RecipeCard';
import { getResultsState, getStrict } from '../redux/selectors'
import { setResultsOrder, setResultsAsc } from "../redux/actions";
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

const mapStateToProps = state => {
    const results = getResultsState(state);
    const strictMode = getStrict(state);
    return { results, strictMode };
};

const getIsEmpty = (results) => {
    return results && results.isEmpty ? <div className="results-message"> No results matched your search criteria. Displaying all recipes instead. </div> : null;
}   

const ResultsContentBox = ({results, handleClick, setResultsOrder, setResultsAsc, strictMode}) => {
    const [asc, setAsc] = useState(1);
    const [order, setOrder] = useState(0);

    const updateOrder = (e) => {
        let orderBy = parseInt(e.target.options[e.target.selectedIndex].value)
        setResultsOrder(orderBy);
        setOrder(orderBy);
    }

    useEffect(() => {
        if (strictMode && order === 3) {
            setResultsOrder(0);
            setOrder(0)
        }
    }, [strictMode, setResultsOrder, order])

    const getAscButton = () => {
        if (asc === 1) {
            return <button onClick={() => {setResultsAsc(0); setAsc(0)}} className='btn btn-light results-order-control-asc'>
                <ArrowUpward className="asc-button-icon" fontSize="small"/>
            </button>
        } else {
            return <button onClick={() => {setResultsAsc(1); setAsc(1)}} className='btn btn-light results-order-control-asc'>
                <ArrowDownward className="asc-button-icon" fontSize="small"/>
            </button>
        }
    }
    return (
        <div className="section section-fill-height">
            <div className="section-title">
                <div className="section-title-text">
                    Search Results
                    {getAscButton()}
                    <select onChange={updateOrder} className="form-control form-control-lg results-order-control">
                        <option value={0}>Closest Match </option>
                        <option value={1}>Difficulty</option>
                        <option value={2}>Cook Time</option>
                        {(!strictMode)? <option value={3}>Missing Ingredients</option> : null}
                    </select>
                    <div className="results-order-control-tag">
                        Order by:
                    </div>                 
                </div>
            </div>
            <div className="section-body">
                { getIsEmpty(results) }
                <div className="results-container">
                    { results.recipes && results.recipes.map(e => <RecipeCard key={e.recipeId} recipe={e} handleClick={handleClick}></RecipeCard>) }
                </div>
            </div>
        </div>
      );
}

export default connect(mapStateToProps, {setResultsOrder, setResultsAsc})(ResultsContentBox);