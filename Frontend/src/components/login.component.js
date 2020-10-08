import React, { Component , useState} from "react";
import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/auth';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emp_id: '',
            emp_email: '',
            emp_password: ''
        };

        this.handleChangeEmpEmail = this.handleChangeEmpEmail.bind(this);
        this.handleChangeEmpPassword = this.handleChangeEmpPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmpEmail(event) {
        this.setState({
            emp_email: event.target.value
        });
    }

    handleChangeEmpPassword(event) {
        this.setState({
            emp_password: event.target.value
        });
    }

    handleSubmit(event) {
        axios.post(`${apiUrl}/login`, {
            emp_email: this.state.emp_email,
            emp_password: this.state.emp_password
        })
            .then((response) => {
                localStorage.setItem('token', response.token);
            }, (error) => {
                alert('User data submission error ' + error.toString());
            });

        event.preventDefault();
    }

    render() {
        return (
            <form className="login"  onSubmit={e => this.handleSubmit(e)}>
                <h3>Employee Login</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="emp_email" value={this.state.email} onChange={e => this.handleChangeEmpEmail(e)} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="emp_password"  value={this.state.password} onChange={e => this.handleChangeEmpPassword(e)} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <p className="forgot-password text-right">
                    Don't have an account? <a href="register">Register</a>
                </p>
            </form>
        );
    }
}
