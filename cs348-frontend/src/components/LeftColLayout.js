import React from 'react';
import { connect } from "react-redux";
import { getUserState } from '../redux/selectors'

import Title from './Title';
import SearchContentBox from './SearchContentBox';
import AccountContentBox from './AccountContentBox'

const mapStateToProps = state => {
    const userId = getUserState(state);
    return { userId };
};

const LeftColLayout = ({ userId }) => {

    const ShowAccountContentBox = () => {
        if (userId !== "") {
            return <AccountContentBox />
        }
    }

    return (        
        <div className="col-layout left-col">
            <Title />
            {ShowAccountContentBox()}
            <SearchContentBox />
        </div>
      );
}

export default connect(mapStateToProps)(LeftColLayout)