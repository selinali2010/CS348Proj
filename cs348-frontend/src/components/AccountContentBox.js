import React, { useState } from 'react';
import { connect } from "react-redux";
import { getUserName } from '../redux/selectors'
import { logoutUser } from '../redux/actions';
import { ExitToApp, Add } from '@material-ui/icons';
import CreateDialog from './CreateDialog';

const mapStateToProps = state => {
    const userName = getUserName(state);
    return { userName };
};

const AccountContentBox = ({userName, logoutUser}) => {
    const [show, setShow] = useState(false);

    const handleLogout = () => {
      localStorage.removeItem("userId")
      localStorage.removeItem("username")
      logoutUser()
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (   
        <div>
            <CreateDialog open={show} userName={userName} handleClose={handleClose} />
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
                        <button className="fm-button" onClick={handleShow}>
                            <Add className="fm-button-icon"/>
                            <span className="fm-button-text">Add Recipe</span>
                        </button>
                    </div>
                    <div className="fm-centered-button">
                        <button className="fm-button" onClick={handleLogout}>
                            <ExitToApp className="fm-button-icon"/>
                            <span className="fm-button-text">Log out</span>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
      );
}

export default connect(
    mapStateToProps,
    { logoutUser }
  )(AccountContentBox);