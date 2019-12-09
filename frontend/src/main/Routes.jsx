import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Registrar from "../pages/Registrar"

const Routes = () => (
  <BrowserRouter>
    <Switch >
      <Route exact path="/" component={Login} />  
      <Route path="/login" component={Login} />
      <Route path="/registrar" component={Registrar} />
      <PrivateRoute path="/home" component={Home} />
      <Route path="*" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;