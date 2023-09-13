import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth"


function Home() {
    const { logout } = useContext(AuthContext);
    var firstName = JSON.parse(localStorage.getItem('login')).firstName

    const handleLogout = () => {
        logout();
    }

    return (
    <div>
        <h1>Bem-vindo, {firstName}!</h1>
        <p>O <span>Market Souza</span> é um software desenvolvido para ajudá-lo a gerenciar seu mercado</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
    )
}

export default Home