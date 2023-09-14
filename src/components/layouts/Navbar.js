import { Link  } from 'react-router-dom'
import Cookies from 'universal-cookie';

import styles from './Navbar.module.css'
import Container from './Container';


function Navbar() {
    var cookie = new Cookies();
    const role = cookie.get('role');
    console.log("Variavel login", role, "Sem variavel",cookie.get('role'), "tentando acessar role", )
    return (
    <nav className={styles.navbar}>
        <Container>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="/home">Home</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/showPrice">Mostra preço</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/sells">Vendas</Link>
                </li>
                {role === "ADMIN" && (
                    <>
                        <li className={styles.item}>
                            <Link to="/purchase">Compra</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/newlogin">Criar Login</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/parameters">Parâmetros</Link>
                        </li>
                    </>
                )}
            </ul>  
        </Container>        
    </nav>
)}

export default Navbar