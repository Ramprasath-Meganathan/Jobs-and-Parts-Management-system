import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  state = {
    partId: "",
    partName: "",
    qoh: "",
    message: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { partId, partName, qoh } = this.state;
    const { usage } = this.props;

    if (usage === "create" && partId !== "" && partName !== "" && qoh !== "") {
      await axios
        .post(
          "https://us-central1-cloudprojects-279901.cloudfunctions.net/companyy/parts/create",
          this.state
        )
        .then((res) => {
          this.setState({
            message: res.data,
          });
        });
    }

    if (usage === "update") {
      await axios
        .put(
          "https://us-central1-cloudprojects-279901.cloudfunctions.net/companyy/parts/update",
          this.state
        )
        .then((res) => {
          this.setState({
            message: res.data,
          });
        });
    }

    this.props.getAllParts();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { partId, partName, qoh, message } = this.state;
    const { usage } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className="ui form">
        <div className="field">
          <label>Part Id</label>
          <input
            type="number"
            name="partId"
            value={partId}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Part Name</label>
          <input
            type="text"
            name="partName"
            value={partName}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Qoh</label>
          <input
            type="number"
            name="qoh"
            value={qoh}
            onChange={this.handleChange}
          />
        </div>
        <input
          className="ui button"
          name="submit"
          type="submit"
          value={usage === "update" ? "Update" : "Create"}
        />
        <br />
        <div className={message.length > 15 ? "red message" : "green message"}>
          {message}
        </div>
      </form>
    );
  }
}

export default Form;
