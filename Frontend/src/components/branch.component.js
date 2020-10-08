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
            branches : [],
            banks : []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBranchId = this.handleChangeBranchId.bind(this);
        this.handleChangeBranchName = this.handleChangeBranchName.bind(this);
        this.handleChangeBank = this.handleChangeBank.bind(this);

    }

    // handle change bank_id
    handleChangeBranchId(event) {
        this.setState({
            branch_id: event.target.value
        });
    }

    // handle change bank_name
    handleChangeBranchName(event) {
        this.setState({
            branch_name: event.target.value
        });
    }

    // handle change bank_description
    handleChangeBank(event) {
        this.setState({
            bank: event.target.value
        });
    }

    // fill list of banks available
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
    }

    //submit data
    handleSubmit(event) {
        event.preventDefault();
        axios.post(`${apiUrl}/branch`, {
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

        const { branches } = this.state;

        const { banks } = this.state;

        return (
            <div className="tableView" >
                <form>
                    <h3>Branches</h3>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Branch ID</label>
                                <input type="number" name="branch_id"  required value={this.state.branch_id} onChange={e => this.handleChangeBranchId(e)} className="form-control" placeholder="Enter branch ID" />
                            </div>

                            <div className="form-group">
                                <label>Branch name</label>
                                <input type="text" name="branch_name"  required value={this.state.branch_name} onChange={e => this.handleChangeBranchName(e)} className="form-control" placeholder="Enter branch name" />
                            </div>


                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Bank</label>
                                <select  required className="form-control" onChange={e => this.handleChangeBank(e)}>
                                    {banks &&
                                    banks.length > 0 &&
                                    banks.map(bank => {
                                        return <option key={bank._id} value={bank._id}>{bank.bank_name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                            <div className="col-4">
                                <button type="submit" onClick={this.handleSubmit}  className="btn btn-primary btn-block">Add Branch</button>
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