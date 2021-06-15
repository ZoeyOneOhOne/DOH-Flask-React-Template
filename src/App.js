import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Screens/Home/Home';
import About from './Screens/About/About';
import Contact from './Screens/Contact/Contact';
import UserEdit from './Screens/UserEdit/UserEdit'
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import logo from "./Assets/WVDOT.png";
import login from "./Assets/login.png";

function App() {
  return (
    <Fragment>
          <Router>
            {/* Nav bar that is included in all pages */}
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/"><img src={logo} style={{ width: 30, height: 30}} alt="It didn't load."/></Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/About">About</Nav.Link>
                  <Nav.Link as={Link} to="/Contact">Contact Us</Nav.Link>
                </Nav>
                {/*Nav item on right*/}
                <Nav.Link as={Link} to="/Contact"><img src={login} style={{ width: 30, height: 35}} alt="It didn't load."/></Nav.Link>
            </Navbar>

            
            <Fragment>
              <Switch>
                <Route exact path="/" component={Home}>
                  <Home/>
                </Route>
                <Route exact path="/About" component={About}>
                  <About/>
                </Route>
                <Route exact path="/Contact" component={Contact}>
                  <Contact/>
                </Route>
                <Route exact path="/UserEdit" component={UserEdit}>
                  <UserEdit/>
                </Route>
              </Switch>
            </Fragment>
          </Router>

          <div style={{bottom: 20, textAlign: 'center', position: 'absolute', marginLeft: 20}}>
            <p>DOT copywrite 2021.</p>
          </div>
    </Fragment>
  );
}

export default App;
