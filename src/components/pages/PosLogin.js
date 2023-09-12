import { BrowserRouter as Router, Route, Routes, Navigate   } from 'react-router-dom'
import { useContext } from 'react';

import { AuthContext, AuthProvider } from '../../contexts/Auth';
import Home from './Home';
import NewLogin from './NewLogin';
import Sells from './Sells';
import ShowPrice from './ShowPrice';
import Purchase from './Purchase';
import Container from '../layouts/Container';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Parameters from './Parameters';
import Login from './Login/Login';


function PosLogin() {

  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
      return <Navigate to="/" />
    }

    return children;
  }
  
  return (
    <Router>
      <AuthProvider>
     <Private><Navbar /></Private> 
      
      <Container customClass="min-height">
    <Routes>
        <Route exact path='/' element= {<Login />} />
        <Route exact path='/home' element= {<Private><Home /></Private>} />
        <Route exact path='/showPrice' element= {<Private><ShowPrice /></Private>} />
        <Route exact path='/sells' element= {<Private><Sells /></Private>} />
        <Route exact path='/purchase' element= {<Private><Purchase /></Private>} />
        <Route exact path='/newlogin' element= {<Private><NewLogin /></Private>} />
        <Route exact path='/parameters' element= {<Private><Parameters /></Private>} />
    </Routes>
    </Container>
    <Private><Footer /></Private> 
    </AuthProvider>
    </Router>
  );
}

export default PosLogin;