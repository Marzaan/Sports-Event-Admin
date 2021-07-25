import React, {Component, Fragment} from 'react';
import NavBar from "../components/common/NavBar";
import Category from "../components/home/Category";
import SessionHelper from "../sessionHelper/SessionHelper";
import {Redirect} from "react-router";

class CategoryPage extends Component {
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
                    <Category/>
                </Fragment>
            );
        }
    }
}

export default CategoryPage;