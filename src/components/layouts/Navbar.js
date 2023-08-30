import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './Navbar.module.css'
import Container from './Container';

function Navbar() {
    return (
    <nav className={styles.navbar}>
        <Container>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="/">Home</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/showPrice">Mostra preço</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/sells">Vendas</Link>
                </li>  
                <li className={styles.item}>
                    <Link to="/purchase">Compra</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/newlogin">Criar Login</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/parameters">Parâmetros</Link>
                </li>
            </ul>  
        </Container>        
    </nav>
)}

export default Navbar