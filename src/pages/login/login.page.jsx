import React from "react";
import UserService from "../../services/user.service";
import {User} from '../../models/user'

export default class Loginpage extends React.Component{

    constructor(props) {
        super(props);

        if(UserService.currentUserValue){
            this.props.history.push('/');
        }

        this.state = {
            user: new User(","),
            submitted: false,
            loading: false,
            errorMessage: ''
        }
    }

    handleChange(e) {
        var {name, value} = e.target;
        var user = this.state.user;
        user[name] = value;
        this.setState({user: user});
    }
    
    handleLogin(e){
        e.preventDefault();

        this.setState({submitted: true});
        const{user} = this.state;

        if (!(user.username && user.password)){
            return;
        }

        this.setState({loading: true});
        UserService.login(user).then(data => {
            this.props.history.push("/home");
        }, error => {
            this.setState({
                errorMessage: "Username or password is not valid",
                loading: false
            });
        });
    }
}