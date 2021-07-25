import React, {Component, Fragment} from 'react';
import NavBar from "../components/common/NavBar";
import Registration from "../components/common/Registration";
import SessionHelper from "../sessionHelper/SessionHelper";

class RegistrationPage extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                {SessionHelper.getUserEmail()===null &&
                    <Registration/>
                }
            </Fragment>
        );
    }
}

export default RegistrationPage;