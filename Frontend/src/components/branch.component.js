import React, { Component} from "react";

import axios from "axios";

const apiUrl = 'http://localhost:3001/api';


export default class Branch extends Component {


    constructor(props) {
        super(props);
        this.state = {
            branch_name: "",
            branch_id: "",
            bank : "",
            branches : []
        };

    }


    // fill list of banks available
    componentDidMount() {
        axios.get(`${apiUrl}/branch/`)
            .then(res => {
                const branches = res.data.data;
                this.setState({ branches: branches});
            })
            .catch(err => {
                alert('bank data retrieval error ' + err.toString());
            })
    }

    //submit data
    handleSubmit(event) {
        event.preventDefault();
        axios.post(`${apiUrl}/auth/register`, {
            bank_id: this.state.bank_id,
            bank_name: this.state.bank_name,
            bank_description: this.state.bank_description
        })
            .then((response) => {
                response.json();
                alert('Bank data submitted ');
            }, (error) => {
                alert('Bank data submission error ' + this.state.bank_name + error.toString());
            });
    }

    render() {

        const { branches } = this.state;

        return (
            <div className="tableView" >
                <form>
                    <h3>Branches</h3>
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
                                <button type="submit" className="btn btn-primary btn-block">Add Branch</button>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-info btn-block">Update Branch</button>
                            </div> <div className="col-4">
                                <button type="submit" className="btn btn-danger btn-block">Delete Branch</button>
                            </div>
                    </div>
                </form>
                <hr/>
                <div className="card">
                    <div className="card-header">
                        Branches
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Branch</th>
                                <th>Bank</th>
                            </tr>
                            </thead>
                            <tbody>
                            {branches &&
                            branches.length > 0 &&
                            branches.map(emp => {
                                return <tr key={emp._id}>
                                    <td>{emp._id}</td>
                                    <td>{emp.branch_id}</td>
                                    <td>{emp.branch_name}</td>
                                    <td>{emp.bank}</td>
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