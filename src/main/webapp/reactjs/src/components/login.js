import React from "react";
import axios from "axios";

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            login : "",
            password : "",
            token : ""
        }
    }



    usernamehandler = (event) => {
        this.setState({
            login: event.target.value
        })
    };
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    loginUser = () => {
        const user = {
            login: this.state.login,
            password: this.state.password
        };
        axios.post("http://localhost:8080/auth", user).then(res => {
            this.setState({
                token : res.data.token
            } );
            console.log(this.state.token);
            document.cookie = "token = " + this.state.token;
            console.log(document.cookie);
        })
            .catch(error => alert(error.response));
    };

    render() {
        return (
            <div>
                <h2>Вход в систему</h2>
                <div>
                    <input name="login" type="text" placeholder="login" autoFocus="true" value={this.state.login} onChange={this.usernamehandler}/>
                    <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.passwordhandler}/>
                    <button onClick={this.loginUser}>Log In</button>
                    <h4><a href="/registration">Зарегистрироваться</a></h4>
                </div>
            </div>
        );
    }

}

export default Login;