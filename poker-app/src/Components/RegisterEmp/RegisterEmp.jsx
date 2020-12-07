import React, { Component } from "react";
import Formsy from "formsy-react";
import "bootstrap/dist/css/bootstrap.css";
import Input from "../Resuable/Input";
import axios from "axios";

class EnterExistingRoom extends Component {

    constructor(props) {
        super(props);
    }

    submit = (model) => {
        console.log(model);
        axios.post("http://localhost:5000/planningpoker/register", model, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((model) => {
                alert("Employee Created");
                this.props.history.push({
                    pathname: '/PokerPlanning'
                })
            })
            .catch((err) => {
                alert("Employee Already Created");
            });
    };

    render() {
        return (
            <React.Fragment>
                <div
                    className="container-fluid mt-5"
                    id="main"
                    style={{ backgroundColor: "white" }}
                >
                    <div className="col-md-4 mb-2 ml-auto mr-auto">
                        <div className="p-3 mb-2 bg-primary text-white">
                            Register Yourself
                        </div>
                        <Formsy onValidSubmit={this.submit}>
                            <Input
                                name="empOracleId"
                                id="empOracleId"
                                placeholder="Enter Employee Oracle ID"
                                label="Oracle ID"
                                required
                            ></Input>
                            <Input
                                name="empName"
                                id="empName"
                                placeholder="Enter Your Name"
                                label="Name"
                                required
                            ></Input>

                            <button
                                type="submit"
                                id="submit-btn"
                                className="btn btn-outline-primary"
                            >
                                Register
                            </button>
                        </Formsy>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default EnterExistingRoom;
