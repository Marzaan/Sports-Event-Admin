import React, {Component, Fragment} from 'react';
import {toast, ToastContainer} from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import Validation from "../../validation/Validation";

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            name : "",
            email: "",
            password: "",
            loginRedirect: false
        }
    }
    onLoginRedirect(){
        if(this.state.loginRedirect === true){
            return(
                <Redirect to="/login"/>
            )
        }
    }
    nameOnChange=(event)=>{
        let name = event.target.value;
        this.setState({name:name});
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
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;

        if(name.length===0){
            toast.error("Name Required",{
                position:"top-center"
            });
        }
        else if(email.length===0){
            toast.error("Email Required",{
                position:"top-center"
            });
        }
        else if(password.length===0){
            toast.error("Enter the password",{
                position:"top-center"
            });
        }
        else if(!(Validation.nameRegex).test(name)){
            toast.error("Invalid Name Format",{
                position:"top-center"
            });
        }
        else if(!(Validation.emailRegex).test(email)){
            toast.error("Invalid Email",{
                position:"top-center"
            });
        }
        else{
            let myFormData = new FormData();
            myFormData.append("name",name);
            myFormData.append("email",email);
            myFormData.append("password",password);

            axios.post(ApiURL.register,myFormData)
                .then(response=>{
                    if(response.data===1){
                        alert("Registration Successful");
                        this.setState({loginRedirect:true});
                    }
                })
                .catch(error=>{
                    toast.error("Server is not responding",{
                        position:"top-center"
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
                            <Card.Header style={{backgroundColor:'black'}} className="text-center" as="h3"><b style={{color:'white'}}>Registration</b></Card.Header>
                            <Form onSubmit={this.onFormSubmit} style={{padding:10}}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control onChange={this.nameOnChange} type="text" placeholder="Enter username" />
                                    <Form.Text className="text-muted">
                                        Username should be valid identifier.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control onChange={this.emailOnChange} type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.passwordOnChange} type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Registration
                                </Button>
                            </Form>
                        </Card>
                    </Row>
                    <ToastContainer/>
                </Container>
                {this.onLoginRedirect()}
            </Fragment>
        );
    }
}

export default Registration;