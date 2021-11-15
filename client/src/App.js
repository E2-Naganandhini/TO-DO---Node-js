import React from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Collection from "./Components/Pages/Collection";
import NotFound from "./Components/Pages/NotFound";

import LoginForm from "./Components/User/LoginForm";
import RegistrationForm from "./Components/User/RegistrationForm";

function App() {
    return (
        <Switch>
            <Route path="/" exact>
                <Redirect to="/registration" />
            </Route>
            <Route path="/registration" exact>
                <RegistrationForm />
            </Route>
            <Route path="/login" exact>
                <LoginForm />
            </Route>
            <Route path="/collection" exact>
                <Collection />
            </Route>
            <Route path="/collection/*" exact>
                <Collection />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}

export default App;
