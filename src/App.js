import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Addproducts from "./pages/Addproducts";
import Users from "./pages/Users";
import secureLocalStorage from "react-secure-storage";
import Allproducts from "./pages/Allproducts";
import Categories from "./pages/Categories";



function App() {
  const auth = secureLocalStorage.getItem("auth");
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        {auth==='authenticatedUser'? 
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables}/>
            
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/products" component={Allproducts} />
          <Route exact path="/addproducts" component={Addproducts} />
          <Route exact path="/categories" component={Categories} />
          
        </Main>: <Redirect to = "/sign-in"/>}
      </Switch>
    </div>
  );
}

export default App;
