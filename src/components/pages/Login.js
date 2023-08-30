import React, { useState } from "react"

function Login() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    const handleSubmit = () => {
        console.log('submit');
    }

    return (
    <div>
        <h1>Faça seu login para iniciar!</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input placeholder="Login" type="username" name="username" id="username"
                value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Senha</label>
                <input placeholder="Senha" type="password" name="password" id="password"
                value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <button type="submit">Entrar</button>
            </div>
        </form>
    </div>
    )
}

export default Login