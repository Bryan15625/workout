import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, createSearchParams } from "react-router-dom"
import Axios from "axios"
import Workout from './Workout';

function Login() {
    let navigate = useNavigate();
    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [loginStatus, setLoginStatus] = useState("")


    const login = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:4000/login", {
            username: loginUsername,
            password: loginPassword
        })
            .then(res => {
                if (res.data.message) {
                    setLoginStatus(res.data.message)
                }
                else {
                    navigate("/workout", {
                        state: {
                            username: loginUsername,
                            authorized: true
                        }
                    })
                }
            }, (error) => {
                console.log(error);
              });
    }

    return (
        <div style = {{ textAlign:'center', paddingRight: "5%"}}>
            <form action="/workout">
                <h1>Login Page</h1>
                <div style={{ color: "red" }}>{loginStatus}</div>
                <div>
                    <label for="username">Username:&nbsp;</label>
                    <input 
                        type="username" 
                        id="username" 
                        name="username" 
                        required
                        onChange = {(e) => {
                            setLoginUsername(e.target.value)
                        }}
                        ></input>
                </div>
                <div>
                    <label for="password">Password:&nbsp;</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required
                        onChange = {(e) => {
                            setLoginPassword(e.target.value)
                        }}
                    ></input>
                </div>
                {/* <button type="submit" onClick={(e) => {
                    navigate("/workout")
                }}>Login</button> */}
                <br></br>
                <button type="submit" onClick={login}
                >Login</button>
                <button type="submit" onClick={(e) => {
                    navigate("/register")
                }}>Register</button>
            </form>

        </div>
    )
}

export default Login