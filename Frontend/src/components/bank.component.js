import React, { Component} from "react";

import axios from "axios";

const apiUrl = 'http://localhost:3001/api';


export default class Bank extends Component {


    constructor(props) {
        super(props);
        this.state = {
            bank_id : "",
            bank_name : "",
            bank_description : "",
            banks : []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBankId = this.handleChangeBankId.bind(this);
        this.handleChangeBankName = this.handleChangeBankName.bind(this);
        this.handleChangeBankDescription = this.handleChangeBankDescription.bind(this);
    }

    // handle change bank_id
    handleChangeBankId(event) {
        this.setState({
            bank_id: event.target.value
        });
    }

    // handle change bank_name
    handleChangeBankName(event) {
        this.setState({
            bank_name: event.target.value
        });
    }

    // handle change bank_description
    handleChangeBankDescription(event) {
        this.setState({
            bank_description: event.target.value
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
                alert('bank data retrieval error ' + err.toString());
            })
    }

    //submit data
    handleSubmit(event) {
        event.preventDefault();
        axios.post(`${apiUrl}/bank`, {
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

        const { banks } = this.state;

        return (
            <div className="tableView" >
                <form>
                    <h3>Banks</h3>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Bank ID</label>
                                <input type="number" name="bank_id" required value={this.state.bank_id} onChange={e => this.handleChangeBankId(e)} className="form-control" placeholder="Enter bank ID" />
                            </div>

                            <div className="form-group">
                                <label>Bank Name</label>
                                <input type="text" name="bank_name" required value={this.state.bank_name} onChange={e => this.handleChangeBankName(e)} className="form-control" placeholder="Enter bank name" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Description</label>
                                <textarea type="text" name="bank_description" rows="5" required value={this.state.bank_description} onChange={e => this.handleChangeBankDescription(e)} className="form-control" placeholder="Enter bank description" >{this.state.bank_description}</textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block">Add Bank</button>
                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-info btn-block">Update Bank</button>
                        </div> <div className="col-4">
                        <button type="submit" className="btn btn-danger btn-block">Delete Bank</button>
                    </div>
                    </div>
                </form>
                <hr/>
                <div className="card">
                    <div className="card-header">
                        Banks
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Bank</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {banks &&
                            banks.length > 0 &&
                            banks.map(bank => {
                                return <tr key={bank._id}>
                                    <td>{bank._id}</td>
                                    <td>{bank.bank_id}</td>
                                    <td>{bank.bank_name}</td>
                                    <td>{bank.bank_description}</td>
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