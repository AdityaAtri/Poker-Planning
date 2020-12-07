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

        const passingData = model;
        axios.post("http://localhost:5000/planningpoker/joinexistingroom", model, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((model) => {
                alert("Room Joined");
                this.props.history.push({
                    pathname: '/participant-poker-room/' + passingData.roomId + "/" + passingData.empId,
                    state: { passingData }
                })
            })
            .catch((err) => {
                alert("Room not Joined");
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
                            Join the Room
                        </div>
                        <Formsy onValidSubmit={this.submit}>
                            <Input
                                name="roomId"
                                id="existingRoomID"
                                placeholder="Enter Planning Room ID"
                                label="Planning Room ID"
                                required
                            ></Input>
                            <Input
                                name="empId"
                                id="empOracleId"
                                placeholder="Enter Employee Oracle ID"
                                label="Oracle ID"
                                required
                            ></Input>

                            <button
                                type="submit"
                                id="submit-btn"
                                className="btn btn-outline-primary"
                            >
                                Enter
                            </button>
                        </Formsy>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default EnterExistingRoom;
