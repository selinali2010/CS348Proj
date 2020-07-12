import React, {useState} from 'react';
import { connect } from "react-redux";
import RecipeCard from './RecipeCard';
import { getResultsState } from '../redux/selectors'
import { setResultsOrder, setResultsAsc } from "../redux/actions";
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';

const mapStateToProps = state => {
    const results = getResultsState(state);
    return { results };
};

const getIsEmpty = (results) => {
    return results && results.isEmpty ? <div className="results-message"> No search results, showing all results </div> : null;
}

const ResultsContentBox = ({results, handleClick, setResultsOrder, setResultsAsc}) => {
    const [asc, setAsc] = useState(1);
    const updateOrder = (e) => {
        setResultsOrder(e.target.value); // This has been defaulted to 1 for now
    }
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
                        <option>Closest Match </option>
                        <option>Difficulty</option>
                        <option>Cook Time</option>
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