import { BrowserRouter as Router, Route, Switch   } from 'react-router-dom'
import Home from './Home';
import NewLogin from './NewLogin';
import Sells from './Sells';
import ShowPrice from './ShowPrice';
import Purchase from './Purchase';

import Container from '../layouts/Container';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Parameters from './Parameters';

function PosLogin() {
  return (
    <Router>
      <Navbar />
    <Switch>
      <Container customClass="min-height">
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/showPrice'>
          <ShowPrice />
        </Route>
        <Route exact path='/sells'>
          <Sells />
        </Route>
        <Route exact path='/purchase'>
          <Purchase/>
        </Route>
        <Route exact path='/newlogin'>
          <NewLogin/>
        </Route>
        <Route exact path='/parameters'>
          <Parameters />
        </Route>
      </Container>
    </Switch>
    <Footer />
    </Router>
  );
}

export default PosLogin;