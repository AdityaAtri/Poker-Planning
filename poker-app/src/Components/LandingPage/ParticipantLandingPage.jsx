import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Formsy from "formsy-react";
import Input from "../Resuable/Input";

class ParticipantLandingPage extends Component {
    constructor(props) {
        super(props);
        const roomId = this.props.location.state.passingData.roomId;
        const empId = this.props.location.state.passingData.empId;
        this.state = {
            empId, roomId, roomDetails: [], hostName: '', participantName: ''
        }
        this.leaveRoom = this.leaveRoom.bind(this);
    };

    componentDidMount() {
        axios.get("http://localhost:5000/planningpoker/gethostprofiledetails/" + this.state.empId).then((res) => {
            this.setState({ participantName: res.data });
        });
        axios.get("http://localhost:5000/planningpoker/gethostname/" + this.state.roomId).then((res) => {
            this.setState({ hostName: res.data });
        });
    }

    componentDidUpdate() {
        axios.get("http://localhost:5000/planningpoker/getroomdetails/" + this.state.roomId).then((res) => {
            this.setState({ roomDetails: res.data });
            console.log(this.state.roomDetails)
        });
    }

    isPerfectSquare(x) {
        return x > 0 && Math.sqrt(x) % 1 === 0;
    }

    isFibonacci(n) {
        const x1 = 5 * n * n + 4;
        const x2 = 5 * n * n - 4;
        var result1 = this.isPerfectSquare(x1);
        var result2 = this.isPerfectSquare(x2);
        var result = Boolean(result1 == true || result2 == true);
        return result;
    }

    submit = (model) => {

        const passingNumberChoosen = model.numberchoosen;
        var number = parseInt(passingNumberChoosen);

        if (this.isFibonacci(number)) {
            const passingRoomId = this.state.roomId;
            const passingEmpId = this.state.empId;
            axios.post("http://localhost:5000/planningpoker/putStorypointestimation", { numberChoosen: passingNumberChoosen, empId: passingEmpId, roomId: passingRoomId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((model) => {
                    alert("Story Point Decided");
                })
                .catch((err) => {
                    alert("Story Point Not Passed");
                });
        }
        else {
            alert("Entered Number Is Not Fibonacci One :(");
        }
    };

    leaveRoom() {
        const passingRoomId = this.state.roomId;
        const passingEmpId = this.state.empId;
        axios.delete("http://localhost:5000/planningpoker/leaveroom/" + passingRoomId + "/" + passingEmpId, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((model) => {
                alert("Room Left");
                this.props.history.push({
                    pathname: '/PokerPlanning'
                })
            })
            .catch((err) => {
                alert("Room Not Left");
            });

    }
    render() {
        return (
            <div className="container-fluid mt-2 md-2" >
                <div className="row justify-content-center">
                    <div className="col-md-10 ml-auto mr-auto">
                        <h1 style={{ color: "#0275d8" }}>Story Point Estimation</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 mt-2 ml-auto mr-auto">
                        <div className="card">
                            <h3
                                className="card-header text-left"
                                style={{ color: "#0275d8", borderLeft: "5px solid #0275d8" }}
                            >
                                Room Details
                            </h3>
                            <div className="card-body align-items-center">
                                <img
                                    src="https://i.imgur.com/iwpQi9G.png"
                                    alt="participant"
                                    style={{ width: "150px", alignContent: "center" }}
                                />
                                {this.state.roomDetails.map((e) => {
                                    return (
                                        <div className="card card-text mt-2 md-3 pd-4 pt-1 ml-auto">
                                            <h6 className="mb-0">
                                                <b>{("Planning Room ID")}</b>
                                            </h6>
                                            <span className="text-capitalize">
                                                {e.roomId}
                                            </span>
                                            <h6 className="mb-0">
                                                <b>{("Host Oracle ID")}</b>
                                            </h6>
                                            <span className="text-capitalize">
                                                {e.hostId}
                                            </span>
                                            <h6 className="mb-0">
                                                <b>{("Participant Name")}</b>
                                            </h6>
                                            <span className="text-capitalize">
                                                {this.state.participantName}
                                            </span>
                                            <h6 className="mb-0">
                                                <b>{("Host Name")}</b>
                                            </h6>
                                            <span className="text-capitalize">
                                                {this.state.hostName}
                                            </span>
                                        </div>
                                    );
                                })}
                                <br></br>
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary"
                                    onClick={this.leaveRoom}>
                                    <span>Leave Room</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mt-2 ml-auto mr-auto">
                        <div className="card">
                            <h3
                                className="card-header text-left"
                                style={{
                                    color: "#0275d8",
                                    borderLeft: "5px solid #0275d8",
                                }}
                            >
                                Story To Be Discussed
                            </h3>
                            <div className="card-body  align-items-center">
                                {this.state.roomDetails.map((e) => {
                                    return (
                                        <div>
                                            <h6 className="mb-0 mt-2">
                                                <b>{("Story ID")}</b>
                                            </h6>
                                            <span>{e.storyId}</span>
                                            <br></br>
                                            <h6 className="mb-0 mt-2">
                                                <b>{("Story Description")}</b>
                                            </h6>
                                            <span>{e.story}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="form-signin container-fluid mt-2">
                            <div className="col-md-4 mb-2 ml-auto mr-auto">
                            </div>
                            <Formsy onSubmit={this.submit}>
                                <Input
                                    name="numberchoosen"
                                    id="numberchoosenId"
                                    type="text"
                                    placeholder="Enter the story point estimation"
                                    label="Story Point"
                                    required={true}
                                />
                                <button
                                    type="submit"
                                    id="submit-btn"
                                    className="btn btn-outline-primary"
                                >
                                    Submit
                            </button>
                            </Formsy>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ParticipantLandingPage;