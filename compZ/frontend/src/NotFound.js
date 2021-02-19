import React, { Component } from "react";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="notfound">
          The page is not found in the application.
        </div>
      </div>
    );
  }
}

export default NotFound;
