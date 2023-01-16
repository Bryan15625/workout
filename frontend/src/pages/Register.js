import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Axios from "axios"

function Register() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [registerStatus, setRegisterStatus] = useState("")

    const register = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:4000/", {
            username: username,
            email: email,
            password: password
        })
            .then(res => {
                if (res.data.message) {
                    setRegisterStatus(res.data.message)
                }
                else {
                    navigate("/login")
                }
            }, (error) => {
                console.log(error);
            });
    }

    console.log(username, email, password)
    return (
        <div style={{ textAlign:'center', paddingRight: "5%"}}>
            <h1>Create an account</h1>
            <div style={{ color: "red" }}>{registerStatus}</div>
            <form action="/register">
                <div>
                    <label for="username">Username:&nbsp;</label>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        required
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    ></input>
                </div>
                <div>
                    <label for="email">Email:&nbsp;</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={(e) => {
                            setEmail(e.target.value)
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
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    ></input>
                </div>
                <br></br>
                <button type="submit" onClick={register}
                >Register</button>
                <button type="submit" onClick={(e) => {
                navigate("/login")
            }}>Login</button>
            </form>
        </div>
    )
}

export default Register