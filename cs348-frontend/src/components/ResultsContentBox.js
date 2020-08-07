import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import RecipeCard from './RecipeCard';
import { getResultsState, getStrict, getPaginationState } from '../redux/selectors'
import { setResultsOrder, setResultsAsc, setPage } from "../redux/actions";
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

const mapStateToProps = state => {
    let page, pageCount;
    const results = getResultsState(state);
    const strictMode = getStrict(state);
    ({ page, pageCount } = getPaginationState(state));

    return { results, strictMode, page, pageCount };
};

const getIsEmpty = (results) => {
    return results && results.isEmpty ? <div className="results-message"> No results matched your search criteria. Displaying all recipes instead. </div> : null;
}   

const ResultsContentBox = ({handleClick, results, strictMode, page, pageCount, setResultsOrder, setResultsAsc, setPage}) => {
    const [asc, setAsc] = useState(1);
    const [order, setOrder] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const updateOrder = (e) => {
        let orderBy = parseInt(e.target.options[e.target.selectedIndex].value)
        setResultsOrder(orderBy);
        setOrder(orderBy);
    }

    // TODO: PAGINATION CONTROLS
    const incrementPage = () => {
        // If (currentPage === highestPage && highestPage < pageCount)
        //   setPaginationState(pageCount, highestPage++) // This will trigger searchContentBox to add more results
        // if (pageCount < highestPage)
        //   setCurrentPage(currentPage++)
    }

    useEffect(() => {
        if (strictMode && order === 3) {
            setResultsOrder(0);
            setOrder(0)
        }
    }, [strictMode, setResultsOrder, order])

    const handlePageChange = (e, newPage) => {
        setPage(newPage);
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
                </div>
                <div>
                    { (pageCount === 0 || page === 0) ? null :
                        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
                    }
                </div>
                <div className="section-title-controls">
                    <span className="section-title-controls-label">Order by:</span>
                    <select onChange={updateOrder} className="form-control form-control-lg section-title-dropdown results-order-control">
                        <option value={0}>Closest Match </option>
                        <option value={1}>Difficulty</option>
                        <option value={2}>Cook Time</option>
                        {(!strictMode)? <option value={3}>Missing Ingredients</option> : null}
                    </select>
                    {getAscButton()}
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

export default connect(
    mapStateToProps,
    { setResultsOrder, setResultsAsc, setPage }
)(ResultsContentBox);
