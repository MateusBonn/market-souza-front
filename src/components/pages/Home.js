import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth"
import Cookies from "universal-cookie";


function Home() {
    const { logout } = useContext(AuthContext);
    var cookie = new Cookies();
    var firstName = cookie.get('user')

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