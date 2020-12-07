import { withFormsy } from "formsy-react";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";

class Input extends React.Component {
    static defaultProps = {
        required: true,
    };

    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget.value);
    }

    render() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label
                        id={this.props.id + "-label"}
                        className="input-group-text"
                        htmlFor={this.props.id}
                    >
                        {this.props.label}
                    </label>
                </div>
                <input
                    autoComplete={this.props.autoComplete || "off"}
                    className={this.props.className || "form-control"}
                    type={this.props.type || "text"}
                    id={this.props.id}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.changeValue}
                    value={this.props.value || ""}
                    aria-label={this.props.label}
                    aria-describedby={this.props.id + "-label"}
                    required={this.props.required}
                />
            </div>
        );
    }
}

export default withFormsy(Input);
