import React, { Component } from "react";
import axios from "axios";


const apiUrl = 'http://localhost:3001/api';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emp_id: '',
            emp_name: '',
            emp_email: '',
            emp_bank: '',
            emp_branch: '',
            emp_password: '',
            emp_photo: '',
            banks : [],
            branches: []
        };

        this.handleChangeEmpId = this.handleChangeEmpId.bind(this);
        this.handleChangeEmpBranch = this.handleChangeEmpBranch.bind(this);
        this.handleChangeEmpBank = this.handleChangeEmpBank.bind(this);
        this.handleChangeEmpName = this.handleChangeEmpName.bind(this);
        this.handleChangeEmpEmail = this.handleChangeEmpEmail.bind(this);
        this.handleChangeEmpPassword = this.handleChangeEmpPassword.bind(this);
        this.handleChangeEmpPhoto = this.handleChangeEmpPhoto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    // handle change emp_id
    handleChangeEmpId(event) {
        this.setState({
            emp_id: event.target.value
        });
    }

    // handle change emp_photo
    handleChangeEmpPhoto(event) {
        this.setState({
            emp_photo: event.target.value
        });
    }

    // handle change emp_name
    handleChangeEmpName(event) {
        this.setState({
            emp_name: event.target.value
        });
    }

    // handle change emp_bank
    handleChangeEmpBank(event) {
        this.setState({
            emp_bank: event.target.value
        });

        axios.get(`${apiUrl}/branch/`)
            .then(res => {
                const branches = res.data.data;
                this.setState({ branches: branches});
            })
            .catch(err => {
                alert('bank data retrieval error ' + err.toString());
            })

    }

    // handle change emp_branch
    handleChangeEmpBranch(event) {
        this.setState({
            emp_branch: event.target.value
        });
    }

    // handle change emp_email
    handleChangeEmpEmail(event) {
        this.setState({
            emp_email: event.target.value
        });
    }

    // handle change emp_password
    handleChangeEmpPassword(event) {
        this.setState({
            emp_password: event.target.value
        });
    }

    // fill list of banks available
    componentDidMount() {
        axios.get(`${apiUrl}/bank/`)
            .then(res => {
                const banks = res.data.data;
                this.setState({ banks: banks});
            })
            .catch(err => {
                console.log('bank data retrieval error ' + err.toString());
            })
    }

    //submit data
    handleSubmit(event) {
        event.preventDefault();
        axios.post(`${apiUrl}/auth/register`, {
            emp_email: this.state.emp_email,
            emp_password: this.state.emp_password,
            emp_name: this.state.emp_name,
            emp_bank: this.state.emp_bank,
            emp_branch: this.state.emp_branch,
            emp_photo: this.state.emp_photo,
            emp_id: this.state.emp_id
        })
            .then((response) => {
                response.json();
                console.log('User data submitted ');
            }, (error) => {
                console.log('User data submission error ' + this.state.emp_email + error.toString());
            });
    }

    render() {

        const { banks } = this.state;
        const { branches } = this.state;

        return (
            <form className="register" onSubmit={this.handleSubmit}>
                <h3>Register Employee</h3>

                <div className="form-group">
                    <label>Employee ID</label>
                    <input type="number" required value={this.state.emp_id} onChange={e => this.handleChangeEmpId(e)} className="form-control" placeholder="Employee ID" />
                </div>

                <div className="form-group">
                    <label>Employee Name</label>
                    <input type="text" required value={this.state.emp_name} onChange={e => this.handleChangeEmpName(e)} className="form-control" placeholder="Employee Name" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" required value={this.state.emp_password} onChange={e => this.handleChangeEmpPassword(e)} className="form-control" placeholder="Password" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" required value={this.state.emp_email} onChange={e => this.handleChangeEmpEmail(e)} className="form-control" placeholder="Email" />
                </div>

                <div className="form-group">
                    <label>Bank</label>
                    <select  required className="form-control" onChange={e => this.handleChangeEmpBank(e)}>
                        {banks &&
                        banks.length > 0 &&
                        banks.map(bank => {
                            return <option key={bank._id} value={bank._id}>{bank.bank_name}</option>;
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label>Branch</label>
                    <select  required className="form-control" onChange={e => this.handleChangeEmpBank(e)}>
                        {branches &&
                        branches.length > 0 &&
                        branches.map(branch => {
                            return <option key={branch._id} value={branch._id}>{branch.branch_name}</option>;
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label>Photo</label>
                    <input type="text" required className="form-control" value={this.state.emp_photo} onChange={e => this.handleChangeEmpPhoto(e)} placeholder="Photo URL" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already have an account? <a href="login">Login</a>
                </p>
            </form>
        );
    }
}