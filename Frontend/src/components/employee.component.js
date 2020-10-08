import React, { Component} from "react";

import axios from "axios";

const apiUrl = 'http://localhost:3001/api';


export default class Employee extends Component {


    constructor(props) {
        super(props);
        this.state = {
            employees : []
        };

    }


    // fill list of banks available
    componentDidMount() {
        axios.get(`${apiUrl}/employee/`)
            .then(res => {
                const emps = res.data.data;
                this.setState({ employees: emps});
            })
            .catch(err => {
                console.log('bank data retrieval error ' + err.toString());
            })
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
                                <label>Email address</label>
                                <input type="email" name="emp_email"  className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="emp_password" className="form-control" placeholder="Enter password" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" name="emp_email"  className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="emp_password" className="form-control" placeholder="Enter password" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <button type="submit" className="btn btn-info btn-block">Update Employee</button>
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
                                    <td><img src={emp.emp_photo.toString()} width="64px" /></td>
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
