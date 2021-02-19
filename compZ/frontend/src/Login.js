import React, { Component } from "react";
import errMsg from "./errormessages";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    const { jobName } = this.props.match.params;
    this.state = {
      email: "",
      password: "",
      errorMsg: "",
      jobName: jobName,
    };

    if (localStorage.userId && localStorage.session_token) {
      this.props.history.push({
        pathname: `/homepage`,
        state: {
          userId: localStorage.userId,
          jobName: this.state.jobName,
        },
      });
    }
  }

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({
      errorMsg: "",
      [e.target.name]: e.target.value,
      validationErrorFlag: false,
    });
  };

  async apiCall() {
    try {
      let obj = {
        password: this.state.password,
        username: this.state.email,
      };
      await axios
        .post(`https://compzbackend-bzedu2xpga-uc.a.run.app/api/users`, obj)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("userId", this.state.email);
            localStorage.setItem("session_token", res.data);
            this.props.history.push({
              pathname: `/homepage`,
              state: {
                userId: this.state.email,
                jobName: this.state.jobName,
              },
            });

            this.setState({
              email: "",
              password: "",
              errorMsg: "",
            });
          }
        })
        .catch((err) => {
          if (err && err.response && err.response.data) {
            this.setState({
              errorMsg: err.response.data,
            });
          } else {
            this.setState({
              errorMsg: errMsg["4"],
            });
          }
        });
    } catch (err) {
      this.setState({
        errorMsg: err,
      });
    }
  }

  onLoginSubmit = (e) => {
    e.preventDefault();

    this.setState({
      validationErrorFlag: false,
      errorMsg: "",
    });

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail = re.test(String(this.state.email).toLowerCase());

    if (
      this.state &&
      this.state.email &&
      this.state.password &&
      this.state !== {} &&
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
      //email address validation
      if (!validEmail) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["2"],
        });
        return;
      }

      this.apiCall();
    } else {
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["1"],
      });
    }
  };

  render() {
    return (
      <div>
        <div className="container pt-4 pb-4">
          <div className="row justify-content-center pt-4">
            <div className="col-12 col-sm-6 col-md-4 pt-4 signup-div border rounded">
              <h3 className="registerTitle text-center">Login</h3>

              <form className="form-container pt-2 pb-5">
                <p className="error-msg" style={{ color: "red" }}>
                  {this.state.errorMsg ? this.state.errorMsg : null}
                </p>
                <div className="form-group">
                  <label htmlFor="email"> Email Address </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter Email Address"
                    required
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    required
                  />
                </div>
                <div className="form-group text-center">
                  <button
                    onClick={this.onLoginSubmit}
                    type="submit"
                    className="btn btn-info btn-centre"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
