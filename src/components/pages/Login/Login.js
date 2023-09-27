import React, { useState, useContext } from "react"
import { AuthContext } from "../../../contexts/Auth";

import './Login.css';

function Login() {
    const {authenticated, login } = useContext(AuthContext)

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit', {username, password});
        login(username, password)
    }

    return (
    <div id="login">
        <h1 className="title">Faça seu login para iniciar!</h1>
        <form className="form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input placeholder="Login" type="username" name="username" id="username"
                value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="field">
                <label htmlFor="password">Senha</label>
                <input placeholder="Senha" type="password" name="password" id="password"
                value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="actions">
                <button type="submit">Entrar</button>
            </div>
        </form>
    </div>
    )
}

export default Login