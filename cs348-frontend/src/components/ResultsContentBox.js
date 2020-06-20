import React from 'react';
import RecipeCard from './RecipeCard';
import { connect } from "react-redux";
import {getResultsState} from '../redux/selectors'

const mapStateToProps = state => {
    const results = getResultsState(state);
    return { results };
};

const ResultsContentBox = ({results}) => {

    return (        
        <div className="results-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    Search Results
                </div>
            </div>
            <div className="section-body results-content-body">
                <div className="results-container">
                    {results.map(e => <RecipeCard recipe={e}></RecipeCard>)}
                </div>
            </div>
        </div>
      );
}

export default connect(mapStateToProps)(ResultsContentBox);