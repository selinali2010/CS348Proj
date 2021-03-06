import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { loginUser } from '../redux/actions';
import {ArrowForward, PersonAdd} from '@material-ui/icons';

const UserContentBox = ({loginUser}) => {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [errorState, setErr] = useState('');

    useEffect(() => {
      const uId = localStorage.getItem("userId")
      const uName = localStorage.getItem("username")

      if(uId && uName){
        loginUser(uId, uName)
      }
    }, [loginUser])

    const getAccountDetails = () => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },                
            body: JSON.stringify({
                username: username,
                password: password
            }),
        }
    }

    const login = async (event) => {
        event.preventDefault();
        const response = await fetch(process.env.REACT_APP_API_URL+"api/login", getAccountDetails());
        if (response.status === 200) {
            const data = await response.json(); 
            loginUser(data.userId, username)
            localStorage.setItem("userId", data.userId)
            localStorage.setItem("username", username)
        } else if (response.status === 401) {
            setErr("Invalid username or password.")
        } else {
            setErr("Cannot connect to the server. Please try again later.")
        }
    }

    const register = async (event) => {
        event.preventDefault();
        let registerError = "";
        if (username.length < 8 || username.length > 30) {
            registerError += "Username must be betweeen 8 and 30 characters. "
        }
        if (password.length < 8 || password.length > 30) {
            registerError += "Password must be betweeen 8 and 30 characters."
        }

        if (registerError !== "") {
            return setErr(registerError);
        }

        const response = await fetch(process.env.REACT_APP_API_URL+"api/register", getAccountDetails());
        const data = await response.json();
        if (response.status === 200) {
            loginUser(data.userId, username)
            localStorage.setItem("userId", data.userId)
            localStorage.setItem("username", username)
        } else if (response.status === 400) {
            setErr("The username " + username + " has already been taken! Please try again. ")
        } else {
            setErr("Cannot connect to the server. Please try again later.")
        }
    }

    const getErrorMessage = () => {
        if (errorState !== "") {
            return  <div className="user-box-error">
                <div className="alert alert-danger" role="alert">
                    {errorState}
                </div>
            </div>
        }
        else return <div className="empty-error-message"></div>
    }

    const handleUserChange = (event) => {setUser(event.target.value)}
    const handlePassChange = (event) => {setPass(event.target.value)}

    return (        
        <div className="section user-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    Register / Login
                </div>
            </div>
            <form>
            <div className="section-body user-content-body">
                <div className="row">
                    <div className="col-4">
                        <div className="username-column">
                            <div> Username: </div>
                            <input type="text" className="fm-text-input" id="username" name="username" onChange={handleUserChange} placeholder='Enter your username...'
	                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="password-column">
                            <div> Password: </div>
                            <input type="password" className="fm-text-input" id="password" name="password" onChange={handlePassChange}
                                placeholder='Enter your password...' autoComplete="new-password current-password"
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="user-content-buttons">
                            <button className="fm-button login-button" onClick={login}>
                                <ArrowForward className="fm-button-icon"/>
                                <span className="fm-button-text">Login</span>
                            </button>
                            <button className="fm-button" onClick={register}>
                                <PersonAdd className="fm-button-icon"/>
                                <span className="fm-button-text">Register</span>
                            </button>
                        </div>
                    </div>
                </div>
                {getErrorMessage()}
            </div>
            </form>
        </div>
      );
}

export default connect(
    null,
    { loginUser }
)(UserContentBox);
