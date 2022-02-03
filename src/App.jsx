import "./App.scss";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
}

export default App;
