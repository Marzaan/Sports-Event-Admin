import React, {Component,Fragment} from 'react';
import {Route, Switch} from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import CategoryPage from "../pages/CategoryPage";
import EventPage from "../pages/EventPage";

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/register" component={RegistrationPage}/>
                    <Route exact path="/category" component={CategoryPage}/>
                    <Route exact path="/event" component={EventPage}/>
                </Switch>
            </Fragment>
        );
    }
}
export default AppRoute;