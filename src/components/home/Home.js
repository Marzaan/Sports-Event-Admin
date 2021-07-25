import React, {Component} from 'react';
import axios from "axios";
import SessionHelper from "../../sessionHelper/SessionHelper";
import ApiURL from "../../api/ApiURL";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            userData: []
        }
    }
    componentDidMount() {
        axios.get(ApiURL.userDetails(SessionHelper.getUserEmail()))
            .then(response=>{
                this.setState({userData:response.data});
                this.setState({userName:this.state.userData[0].name})
            })
            .catch(error=>{
                console.log(error);
            })
    }

    render() {
        const userName = this.state.userName;
        return (
            <div style={{
                display:'flex',
                justifyContent:'center',
                alignItems: "center",
                height:'100vh'}}
            >
                <div style={{
                    textAlign:'center'
                }}>
                    <h2>Hi, <b>{userName}</b> {'\n'}</h2>
                    <h1>Welcome to the Admin Panel</h1>
                </div>

            </div>
        );
    }
}

export default Home;