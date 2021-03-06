import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import Explore from './Pages/Explore/Explore';
import Login from './Pages/Authentication/Login/Login/Login';
import Register from './Pages/Authentication/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './Pages/Shared/PrivateRoute/PrivateRoute';
import Purchase from './Pages/Purchase/Purchase';
import AuthProvider from './Context/AuthProvider';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/explore">
              <Explore />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/dasboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/buy/:id">
              <Purchase />
            </PrivateRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
