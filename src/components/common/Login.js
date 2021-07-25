import React, {Component, Fragment} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import ApiURL from "../../api/ApiURL";
import SessionHelper from "../../sessionHelper/SessionHelper";
import axios from "axios";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            homeRedirect: false
        }
    }
    onHomeRedirect(){
        if(this.state.homeRedirect === true){
            return(
                <Redirect to="/"/>
            )
        }
    }
    emailOnChange=(event)=>{
        let email = event.target.value;
        this.setState({email:email});
    }
    passwordOnChange=(event)=>{
        let pass = event.target.value;
        this.setState({password:pass});
    }
    onFormSubmit=(event)=>{
        event.preventDefault();
        let email = this.state.email;
        let password = this.state.password;

        if(email===null){
            toast.error("Name Required",{
                position:"top-center"
            });
        }
        else if(password===null){
            toast.error("Password Required",{
                position:"top-center"
            });
        }
        else{
            let myFormData = new FormData();
            myFormData.append("email",email);
            myFormData.append("password",password);

            axios.post(ApiURL.login,myFormData)
                .then(response=>{
                    if(response.data===1){
                        SessionHelper.setUserEmail(email);
                        this.setState({homeRedirect:true});
                    }
                    else{
                        console.log(response.data);
                        toast.error("Invalid Information",{
                            position:"bottom-center"
                        });
                    }
                })
                .catch(error=>{
                    toast.error("Server is not responding",{
                        position:"bottom-center"
                    });
                })
        }
    }
    render() {
        return (
            <Fragment>
                <Container>
                    <Row style={{marginTop:80}} className="justify-content-center">
                        <Card style={{padding:20,width:'30rem'}}>
                            <Card.Header style={{backgroundColor:'black'}} className="text-center" as="h3"><b style={{color:'white'}}>Login</b></Card.Header>
                            <Form onSubmit={this.onFormSubmit} style={{padding:10}}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control onChange={this.emailOnChange} type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.passwordOnChange} type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Card>
                    </Row>
                    <ToastContainer/>
                </Container>
                {this.onHomeRedirect()}
            </Fragment>
        );
    }
}

export default Login;