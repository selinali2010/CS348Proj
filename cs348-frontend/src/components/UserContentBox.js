import React, { useState } from 'react';
import { connect } from "react-redux";
import { loginUser } from '../redux/actions';

const UserContentBox = ({loginUser}) => {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');

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

    const login = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL+"api/login", getAccountDetails());
        if (response.status === 200) {
            console.log("Login Succeeded!")
            loginUser(response.json().userId, username)
        } else {
            // Output the error message
            console.log("Login Failed!")
        }
    }

    const register = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL+"api/register", getAccountDetails());
        if (response.status === 200) {
            console.log("Register Succeeded!")
            loginUser(response.json().userId, username)
        } else {
            // Output the error message
            console.log("Register Failed!")
        }
    }

    const handleUserChange = (event) => {setUser(event.target.value)}
    const handlePassChange = (event) => {setPass(event.target.value)}

    return (        
        <div className="user-content-box">
            <div className="section-title">
                <div className="section-title-text">
                    Register / Login
                </div>
            </div>
            <div className="section-body user-content-body">
                <div className="row">
                    <div className="col-4">
                        <div className="username-column">
                            <div> Username: </div>
                            <input type="text " id="username" name="username" onChange={handleUserChange} placeholder='Enter your username...'/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="password-column">
                            <div> Password: </div>
                            <input type="password" id="password" name="password" onChange={handlePassChange} placeholder='Enter your password...'/>
                        </div>
                    </div>
                    <div className="col-4">
                        <button onClick={login}>
                            Login!
                        </button>
                        <button onClick={register}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default connect(
    null,
    { loginUser }
)(UserContentBox);