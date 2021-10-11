import Productlist from "./pages/Productlist";
import SingleProduct from "./pages/SingleProduct";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";
import Success from "./pages/Success";




const App = () => {

  const user = true;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route  path="/products/:category">
          <Productlist />
        </Route>
        <Route exact path="/products">
          <Productlist />
        </Route>
        <Route  path="/product/:id">
          <SingleProduct />
        </Route>
        <Route  path="/cart">
          <Cart />
        </Route>
        <Route  path="/success">
          <Success />
        </Route>
        <Route  path="/login">
          {user? <Redirect to= "/"/>:<Login />}
          
        </Route>
        <Route  path="/register">
        {user? <Redirect to= "/"/>:<Register />}
          
        </Route>
      </Switch>
    </Router>

  );
};

export default App;