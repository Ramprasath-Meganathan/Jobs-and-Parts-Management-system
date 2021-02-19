import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = (e) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("session_token");
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div className="header">
          <Navbar className="navHeader bg-primary mt-3" expand="lg">
            <Navbar.Brand className="text-light font-weight-bold" href="/">
              Home
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="text-light font-weight-bold"
            >
              Menu
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link
                  className="text-light font-weight-bold"
                  href="/search"
                >
                  Search
                </Nav.Link>
                <Nav.Link
                  className="text-light font-weight-bold"
                  href="/getAll"
                >
                  Get All Jobs
                </Nav.Link>
              </Nav>
              {localStorage.session_token ? (
                <Button
                  className="text-light ml-auto mr-2"
                  onClick={this.handleLogout}
                  variant=""
                >
                  <i className="fas fa-sign-out-alt" />
                </Button>
              ) : null}
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
