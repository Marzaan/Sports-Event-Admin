import React, {Component, Fragment} from 'react';
import NavBar from "../components/common/NavBar";
import Login from "../components/common/Login";
import SessionHelper from "../sessionHelper/SessionHelper";

class LoginPage extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                {SessionHelper.getUserEmail()===null &&
                    <Login/>
                }
            </Fragment>
        );
    }
}

export default LoginPage;