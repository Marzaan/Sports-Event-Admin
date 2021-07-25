import React, {Component, Fragment} from 'react';
import NavBar from "../components/common/NavBar";
import Home from "../components/home/Home";
import SessionHelper from "../sessionHelper/SessionHelper";
import {Redirect} from "react-router";

class HomePage extends Component {
    render() {
        if(SessionHelper.getUserEmail()===null){
            return (
                <Redirect to="/login"/>
            )
        }
        else{
            return (
                <Fragment>
                    <NavBar/>
                    <Home/>
                </Fragment>
            );
        }

    }
}

export default HomePage;