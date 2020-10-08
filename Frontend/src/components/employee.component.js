import React, { Component} from "react";

import axios from "axios";

const apiUrl = 'http://localhost:3001/api';


export default class Employee extends Component {


    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            emp_name : "",
            emp_photo : "",
            emp_email  : "",
            emp_id : "",
            bank_branch : "",
            bank : "",
            employees : [],
            banks : [],
            branches : []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmployeeId = this.handleChangeEmployeeId.bind(this);
        this.handleChangeEmployeeName = this.handleChangeEmployeeName.bind(this);
        this.handleChangeBank = this.handleChangeBank.bind(this);
        this.handleChangeBankBranch = this.handleChangeBankBranch.bind(this);
        this.handleChangePhoto = this.handleChangePhoto.bind(this);
        this.handleChangeEmployeePassword = this.handleChangeEmployeePassword.bind(this);
        this.handleChangeEmployeeEmail = this.handleChangeEmployeeEmail.bind(this);
        this.handleChange_id = this.handleChange_id.bind(this);

    }


    // handle change bank
    handleChangeBank(event) {
        this.setState({
            bank: event.target.value
        });
    }

    // handle change email
    handleChangeEmployeeEmail(event) {
        this.setState({
            emp_email: event.target.value
        });
    }

    // handle change _id
    handleChange_id(event) {
        this.setState({
            _id: event.target.value
        });
    }

    // handle change branch
    handleChangeBankBranch(event) {
        this.setState({
            banks_branch: event.target.value
        });
    }

    // handle change photo
    handleChangePhoto(event) {
        this.setState({
            emp_photo: event.target.value
        });
    }


    // handle change name
    handleChangeEmployeeName(event) {
        this.setState({
            emp_name: event.target.value
        });
    }


    // handle change id
    handleChangeEmployeeId(event) {
        this.setState({
            emp_id: event.target.value
        });
    }


    // handle change pw
    handleChangeEmployeePassword(event) {
        this.setState({
            emp_password: event.target.value
        });
    }

    // fill the table of branches and fill banks drop down
    componentDidMount() {
        axios.get(`${apiUrl}/branch/`)
            .then(res => {
                const branches = res.data.data;
                this.setState({ branches: branches});
            })
            .catch(err => {
                console.log('branch data retrieval error ' + err.toString());
            })

        axios.get(`${apiUrl}/bank/`)
            .then(res => {
                const banks = res.data.data;
                this.setState({ banks: banks});
            })
            .catch(err => {
                console.log('bank data retrieval error ' + err.toString());
            })

        axios.get(`${apiUrl}/employee/`)
            .then(res => {
                const emps = res.data.data;
                this.setState({ employees: emps});
            })
            .catch(err => {
                console.log('bank data retrieval error ' + err.toString());
            })
    }

    //submit data
    handleSubmit(event) {
        event.preventDefault();
        axios.put(`${apiUrl}/employee/${this.state._id}`, {
            branch_id: this.state.branch_id,
            branch_name: this.state.branch_name,
            bank: this.state.bank
        })
            .then((response) => {
                response.json();
                console.log('Branch data submitted ');
            }, (error) => {
                console.log('Branch data submission error ' + this.state.branch_name + error.toString());
            });
    }

    render() {

        const { employees } = this.state;

        return (
            <div className="tableView" >
                <form>
                    <h3>Employees</h3>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>ID</label>
                                <input type="email" name="emp_email"  required value={this.state.branch_id} onChange={e => this.handleChangeEmployeeId(e)}  className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Employee Name</label>
                                <input type="password" name="emp_password"  required value={this.state.branch_id} onChange={e => this.handleChangeEmployeeName(e)}  className="form-control" placeholder="Enter password" />
                            </div>

                            <div className="form-group">
                                <label>Photo</label>
                                <input type="password" name="emp_password"  required value={this.state.emp_photo} onChange={e => this.handleChangePhoto(e)}  className="form-control" placeholder="Enter password" />
                            </div>

                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" name="emp_email"  required value={this.state.emp_email} onChange={e => this.handleChangeEmployeeEmail(e)}  className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="emp_password"  required value={this.state.emp_password} onChange={e => this.handleChangeEmployeePassword(e)}  className="form-control" placeholder="Enter password" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <button type="submit"  onClick={this.handleSubmit}  className="btn btn-info btn-block">Update Employee</button>
                        </div> <div className="col-4">
                        <button type="submit" className="btn btn-danger btn-block">Delete Employee</button>
                    </div>
                    </div>
                </form>
                <hr/>
                <div className="card">
                    <div className="card-header">
                        Employees
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Bank</th>
                                <th>Branch</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees &&
                            employees.length > 0 &&
                            employees.map(emp => {
                                return <tr key={emp._id}>
                                    <td>{emp._id}</td>
                                    <td>{emp.emp_id}</td>
                                    <td><img src={emp.emp_photo} width="64px" /></td>
                                    <td>{emp.emp_name}</td>
                                    <td>{emp.emp_email}</td>
                                    <td>{emp.bank.bank_name}</td>
                                    <td>{emp.bank_branch}</td>
                                </tr> ;
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
