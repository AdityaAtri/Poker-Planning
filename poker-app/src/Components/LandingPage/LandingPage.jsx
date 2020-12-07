import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class LandingPage extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid mt-2 md-2">
                    <div className="row justify-content-center">
                        <div className="col-md-10 ml-auto mr-auto">
                            <h1 style={{ color: "#0275d8" }}>Poker Planning</h1>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row justify-content-center">
                        <div className="col-md-5 mt-2 ml-auto mr-auto">
                            <div className="card">
                                <h3
                                    className="card-header text-left"
                                    style={{ color: "#0275d8", borderLeft: "5px solid #0275d8" }}
                                >
                                    Choose The Option
                                </h3>
                                <div className="card-body align-items-center">
                                    <img
                                        src="https://i.imgur.com/PMTeJtl.png"
                                        alt="pokerImage"
                                        style={{ width: "300px", alignContent: "center" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="col-md-2 my-auto mx-auto align-self-center">
                        <a href="/create-room" className="btn btn-outline-primary mb-2 w-100">
                            Create Room
                        </a>
                        <br></br>
                        <a href="/join-existing-room" className="btn btn-outline-primary w-100">
                            Enter Existing Room
                        </a>
                        <hr></hr>
                        <a href="/register-yourself" className="btn btn-outline-primary w-100">
                            Register
                        </a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default LandingPage;