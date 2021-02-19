import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="homebox">
          <div className="home">
            <h5 className="text-danger pt-3 ml-3">Welcome to Our Company Z</h5>
            <h6 className="text-dark pt-3 ml-3">About Us</h6>
            <div className="border rounded ml-3" style={{ width: "50%" }}>
              <p className="text-dark pt-3 ml-5 mr-3 ">
                A web-application that offers the client users to select a
                particular job (either by selecting a job name from a list of
                job-names (obtained from the company X) in <b>Get All Jobs</b>{" "}
                page or by doing a search for a job with a particular name
                supplied by the user in <b>Search</b> page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
