import React from 'react';
import { connect } from "react-redux";
import { getUserName } from '../redux/selectors'
import { logoutUser } from '../redux/actions';

const mapStateToProps = state => {
    const userName = getUserName(state);
    return { userName };
};

const AccountContentBox = ({userName, logoutUser}) => {
    return (        
        <div className="account-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    My Account
                </div>
            </div>
            <div className="section-body results-content-body">
                <div className="welcome-text">
                    Welcome, {userName}!
                </div>
                <div className="logout-button">
                    <button onClick={logoutUser}>
                        Log out
                    </button>
                </div>
                
            </div>
        </div>
      );
}

export default connect(
    mapStateToProps,
    { logoutUser }
  )(AccountContentBox);