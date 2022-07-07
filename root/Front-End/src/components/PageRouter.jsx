import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import SignIn from "./auth/Login";
import SignUp from './auth/SignUp';





const PageRouter = () => {
    return (
        <Switch>
            <Route exact path="/login" render={() => <SignIn/>}  />
            <Route exact path="/signup" render={() => <SignUp/>} />
        </Switch>
    );
}

export default PageRouter;