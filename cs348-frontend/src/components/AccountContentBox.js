import React from 'react';
import { connect } from "react-redux";
import { getUserName } from '../redux/selectors'
import { logoutUser } from '../redux/actions';
import { ExitToApp } from '@material-ui/icons';

const mapStateToProps = state => {
    const userName = getUserName(state);
    return { userName };
};

const AccountContentBox = ({userName, logoutUser}) => {
    const handleLogout = () => {
      localStorage.removeItem("userId")
      localStorage.removeItem("username")
      logoutUser()
    }

    return (        
        <div className="section">
            <div className="section-title">
                <div className="section-title-text">
                    My Account
                </div>
            </div>
            <div className="section-body">
                <div className="welcome-text">
                    Welcome, {userName}!
                </div>
                <div className="fm-centered-button">
                    <button className="fm-button" onClick={handleLogout}>
                        <ExitToApp className="asc-button-icon" fontSize="small"/> Log out
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