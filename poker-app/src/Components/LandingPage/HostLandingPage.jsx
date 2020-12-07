import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Formsy from "formsy-react";
import Input from "../Resuable/Input";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class HostLandingPage extends Component {
    constructor(props) {
        super(props);
        const hostId = this.props.location.state.passingData.hostId;
        const roomId = this.props.location.state.passingData.roomId;
        const roomName = this.props.location.state.passingData.roomName;
        this.state = { hostId, roomId, roomName, hostName: "", voteData: [], empName: "", storyData: [], minPoint: "", maxPoint: "", meanPoint: "" };
        this.deleteRoom = this.deleteRoom.bind(this);
        this.isFibonacci = this.isFibonacci.bind(this);
        this.isPerfectSquare = this.isPerfectSquare.bind(this);
        this.getAnalytics = this.getAnalytics.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:5000/planningpoker/gethostprofiledetails/" + this.state.hostId).then((res) => {
            this.setState({ hostName: res.data });
        });
        axios.get("http://localhost:5000/planningpoker/getstory/" + this.state.roomId).then((res) => {
            this.setState({ storyData: res.data });
        });

    }

    componentDidUpdate() {
        axios.get("http://localhost:5000/planningpoker/getallroomvotedetails/" + this.state.roomId).then((res) => {
            this.setState({ voteData: res.data });
            console.log(this.state.voteData);
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
            const passingHostId = this.state.hostId;
            axios.post("http://localhost:5000/planningpoker/putStorypointestimation", { numberChoosen: passingNumberChoosen, empId: passingHostId, roomId: passingRoomId }, {
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

    getAnalytics() {
        var maxNumber = Number.MIN_VALUE;
        var minNumber = Number.MAX_VALUE;
        var count = 0;
        var sum = 0;

        this.state.voteData.map((e) => {
            var number = parseInt(e.numberChoosen);
            if (number > maxNumber) maxNumber = number;
            if (number < minNumber) minNumber = number;
            if (!isNaN(number)) {
                sum = sum + number;
                count = count + 1;
            }
        });
        var average = (sum) / count;
        average = average.toFixed(2);
        if (maxNumber == Number.MIN_VALUE) maxNumber = 0;
        if (minNumber == Number.MAX_VALUE) minNumber = 0;
        this.setState({ minPoint: minNumber, maxPoint: maxNumber, meanPoint: average });
    }
    deleteRoom() {
        axios.delete("http://localhost:5000/planningpoker/deleteroom/" + this.state.roomId, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((model) => {
                alert("Room Deleted");
                this.props.history.push({
                    pathname: '/PokerPlanning'
                })
            })
            .catch((err) => {
                alert("Room Not Deleted");
            });

    }
    updateStory = (model) => {
        const passingStoryId = model.storyId;
        const passingStory = model.story;
        const passingRoomId = this.state.roomId;
        const passingHostId = this.state.hostId;
        this.setState({ storyData: [{ storyId: passingStoryId, story: passingStory }] });
        axios.post("http://localhost:5000/planningpoker/updatestory/", { storyId: passingStoryId, story: passingStory, roomId: passingRoomId, hostId: passingHostId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((model) => {
                alert("Story Updated");
            })
            .catch((err) => {
                alert("Story Not Updated");
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
                                    src="https://i.imgur.com/tgRDqf8.png"
                                    alt="user"
                                    style={{ width: "200px", alignContent: "center" }}
                                />
                                <div className="card card-text mt-2 md-3 pd-4 pt-1 ml-auto">
                                    <h6 className="mb-0">
                                        <b>{("Planning Room ID")}</b>
                                    </h6>
                                    <span className="text-capitalize">
                                        {this.state.roomId}
                                    </span>
                                    <h6 className="mb-0 mt-2">
                                        <b>{("Host Oracle ID")}</b>
                                    </h6>
                                    <span>{this.state.hostId}</span>
                                    <h6 className="mb-0 mt-2">
                                        <b>{("Host Name")}</b>
                                    </h6>
                                    <span>{this.state.hostName}</span>
                                </div>
                                <br></br>
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary"
                                    onClick={this.deleteRoom}>
                                    <span>Delete Room</span>
                                </button>
                            </div>
                        </div>
                        <br></br>
                        <div className="card">
                            <h3
                                className="card-header text-left"
                                style={{
                                    color: "#0275d8",
                                    borderLeft: "5px solid #0275d8",
                                }}
                            >
                                Analytics
                            </h3>
                            <br></br>
                            <h6 className="mb-0">
                                <b>{("Max Story Point")}</b>
                            </h6>
                            <span className="text-capitalize">
                                {this.state.maxPoint}
                            </span>
                            <h6 className="mb-0">
                                <b>{("Min Story Point")}</b>
                            </h6>
                            <span className="text-capitalize">
                                {this.state.minPoint}
                            </span>
                            <h6 className="mb-0">
                                <b>{("Mean Story Point")}</b>
                            </h6>
                            <span className="text-capitalize">
                                {this.state.meanPoint}
                            </span>
                            <br></br>
                        </div>
                        <br></br>
                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                            onClick={this.getAnalytics}>
                            <span>Get Analytics</span>
                        </button>
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
                                {this.state.isEditing ? (
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm">
                                                <button
                                                    className="btn btn-info a-btn-slide-text float-right"
                                                    onClick={() => {
                                                        this.setState({ isEditing: false });
                                                    }}
                                                >
                                                    <span>
                                                        <strong>View</strong>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <br />
                                        <Formsy
                                            onSubmit={this.updateStory}
                                        >
                                            <Input
                                                name="storyId"
                                                id="storyId"
                                                type="text"
                                                label="Story ID"
                                                required
                                            />
                                            <Input
                                                name="story"
                                                id="story"
                                                type="text"
                                                label="Story"
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className="btn btn-outline-primary"
                                            >
                                                <span>Update</span>
                                            </button>
                                        </Formsy>
                                    </div>
                                ) : (
                                        <div>
                                            <button
                                                className="btn btn-warning a-btn-slide-text float-right"
                                                onClick={() => {
                                                    this.setState({ isEditing: true });
                                                }}
                                            >
                                                <strong>Edit Story</strong>
                                            </button>
                                            <br />
                                            <br />
                                            <div className="container-fluid">
                                                <div className="card">
                                                    <div className="card-body">
                                                        {this.state.storyData.map((e) => {
                                                            return (
                                                                <div>
                                                                    <h6 className="mb-0 mt-2">
                                                                        <b>{("Story ID")}</b>
                                                                    </h6>
                                                                    <span>{e.storyId}</span>
                                                                    <br />
                                                                    <h6 className="mb-0 mt-2">
                                                                        <b>{("Story Description")}</b>
                                                                    </h6>
                                                                    <span>{e.story}</span>
                                                                    <br />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
                        <br></br>
                        <div className="container">
                            {this.state.voteData.map((e) => {
                                return (
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                    {e.empName}
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>Hey, I have choosen - {e.numberChoosen}</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HostLandingPage;