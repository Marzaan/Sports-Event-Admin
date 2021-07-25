import React, {Component, Fragment} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {Link, Redirect} from "react-router-dom";
import SessionHelper from "../../sessionHelper/SessionHelper";

class NavBar extends Component {
    logout=()=>{
        SessionHelper.removeUserEmail();
        return(
                <Redirect to="/"/>
            )
    }
    render() {
        let login = SessionHelper.getUserEmail();
        return (
            <Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Sports-Event</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                {login ?(
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Navbar.Brand>
                                                <Link style={{color:'white',textDecoration:'none'}} to="/category">Category</Link>
                                            </Navbar.Brand>
                                            <Navbar.Brand>
                                                <Link style={{color:'white',textDecoration:'none'}} to="/event">Events</Link>
                                            </Navbar.Brand>
                                        </Nav>
                                        <Nav>
                                        <Navbar.Brand>
                                            <Link onClick={this.logout} style={{color:'white'}} to="">Logout</Link>
                                        </Navbar.Brand>
                                        </Nav>
                                    </Navbar.Collapse>
                                    ):(
                                    <Navbar.Collapse>
                                        <Nav className="me-auto">
                                        </Nav>
                                        <Nav>
                                        <Navbar.Brand>
                                            <Link style={{color:'white'}} to="/login">Login</Link>
                                        </Navbar.Brand>
                                        <Navbar.Brand>
                                            <Link style={{color:'white'}} to="/register">Registration</Link>
                                        </Navbar.Brand>
                                        </Nav>
                                    </Navbar.Collapse>
                                    )}
                    </Container>
                </Navbar>
            </Fragment>
        );
    }
}

export default NavBar;