import React, {Component, Fragment} from 'react';
import NavBar from "../components/common/NavBar";
import SessionHelper from "../sessionHelper/SessionHelper";
import Event from "../components/home/Event";
import {Redirect} from "react-router";

class EventPage extends Component {
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
                    <Event/>
                </Fragment>
            );
        }
    }
}

export default EventPage;