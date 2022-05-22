import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Navbar extends Component {
  state = { sidebarIsOpen: false };
  logOut = () => {
    localStorage.removeItem("token");
    this.props.setUser(null);
  };

  toogleSidebar = () => {
    this.setState({
      sidebarIsOpen: !this.state.sidebarIsOpen,
    });
  };

  render() {
    let { user } = this.props;

    return (
      <React.Fragment>
        <div className="me-top-header">
          <p style={{ color: "#ffb628", margin: 0 }}>a</p>
        </div>
        <div className="me-main-header">
          <div className="container">
            <div className="row">
              <div className="col-sm-3 col-7">
                <div className="me-logo">
                  <Link to="/">
                    <i lt="logo" className="img-fluid fas fa-medal"></i>
                  </Link>
                </div>
              </div>
              <div className="col-sm-9 col-5">
                <div
                  className={`me-menu ${
                    this.state.sidebarIsOpen ? "me-menu-open" : ""
                  }`}
                >
                  <div
                    id="toggle-nav"
                    className="me-toggle-nav"
                    onClick={this.toogleSidebar}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <ul
                    className={`me-menu-ul ${
                      this.state.sidebarIsOpen ? "d-block" : ""
                    }`}
                  >
                    {user && (
                      <li className="me-active-menu">
                        <NavLink onClick={this.toogleSidebar} to="/">
                          עמוד הבית
                        </NavLink>
                      </li>
                    )}
                    {user && (
                      <li>
                        <NavLink onClick={this.toogleSidebar} to="/stock">
                          הוספה למאגר
                        </NavLink>
                      </li>
                    )}
                    {user && (
                      <li>
                        <NavLink onClick={this.toogleSidebar} to="/favorites">
                          מועדפים
                        </NavLink>
                      </li>
                    )}
                    {user && (
                      <li>
                        <NavLink onClick={this.toogleSidebar} to="/profile">
                          הפרופיל שלי
                        </NavLink>
                      </li>
                    )}
                    {user && (
                      <li>
                        <NavLink onClick={this.toogleSidebar} to="/contact">
                          צור קשר
                        </NavLink>
                      </li>
                    )}
                    {user ? (
                      <li onClick={this.logOut}>
                        <NavLink onClick={this.toogleSidebar} to="/login">
                          התנתק
                        </NavLink>
                      </li>
                    ) : (
                      <li>
                        <NavLink to="/login" onClick={this.toogleSidebar}>
                          התחבר
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
