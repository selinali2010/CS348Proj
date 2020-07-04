import React from 'react';
import { connect } from "react-redux";
import { getUserState } from '../redux/selectors'

import UserContentBox from './UserContentBox';
import ResultsContentBox from './ResultsContentBox';
import FavoriteContentBox from './FavoriteContentBox';

const mapStateToProps = state => {
    const userId = getUserState(state);
    return { userId };
};

const RightColLayout = ({ userId }) => {

    const SelectUserContentBox = () => {
        if (userId === "") {
            return <UserContentBox />
        } else {
            return <FavoriteContentBox />
        }
    }

    return (        
        <div className="right-col-layout">
            <div className="right-col">
                {SelectUserContentBox()}
                <ResultsContentBox />
            </div>
        </div>
      );
}

export default connect(mapStateToProps)(RightColLayout)