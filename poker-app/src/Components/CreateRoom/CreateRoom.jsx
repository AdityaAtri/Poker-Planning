import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Formsy from "formsy-react";
import Input from "../Resuable/Input";
import axios from "axios";
import { withRouter } from 'react-router'

class CreateRoom extends Component {

    constructor(props) {
        super(props);
    }

    submit = (event) => {

        const passingData = event;
        console.log(passingData);
        axios.post("http://localhost:5000/planningpoker/createroom", event, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((event) => {
                alert("Room Created");
                this.props.history.push({
                    pathname: '/poker-room/' + passingData.roomId + "/" + passingData.hostId,
                    state: { passingData }
                })
            })
            .catch((err) => {
                alert("Room Not Created : Either Room is already created or HostId not registered");
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
                            Create Room
                        </div>
                        <Formsy onSubmit={this.submit} onChange={this.handleInputChange}>
                            <Input
                                name="hostId"
                                id="hId"
                                type="text"
                                placeholder="Enter the Host Oracle ID"
                                label="Host Oracle ID"
                                required={true}
                            />
                            <Input
                                name="roomId"
                                id="rId"
                                type="text"
                                placeholder="Enter the Room ID"
                                label="Planning Room ID"
                                required={true}
                            />
                            <button
                                type="submit"
                                id="submit-btn"
                                className="btn btn-outline-primary"
                            >
                                Create
                            </button>
                        </Formsy>
                    </div >
                </div>
            </React.Fragment >
        );
    }
}

export default withRouter(CreateRoom);
