import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import Swal from "sweetalert2";
import { UserContext } from "../context";
import { login } from "../services/userService";

class Login extends Component {
  static contextType = UserContext;

  state = { email: "", password: "" };
  handleChance = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    login(data)
      .then((res) => {
        let token = res.data.token;
        let user = res.data.user;
        this.context.setUser(user);
        if (res.status === 200) {
          localStorage.setItem("token", token);
          Swal.fire({
            title: "התחברת בהצלחה!!",
            icon: "success",
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            width:'60%'
          }).then((res) => {
            this.props.history.push("/");
          });
        }
      })
      .catch((err) => {
        console.log("error", err.response);
        Swal.fire({
          title: 'שגיאה!',
          text: "נסה שנית",
          icon: "error",
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          width:'60%'
        });
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="me-breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="me-breadcrumb-box">
                  <h1>התחבר</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="meLogin">
          <div className="me-banner-two">
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content">
                <div className="modal-body">
                  <form>
                    <div className="me-login-form">
                      <input
                        onChange={this.handleChance}
                        type="text"
                        name="email"
                        placeholder='דוא"ל'
                      />
                      <input
                        onChange={this.handleChance}
                        type="password"
                        name="password"
                        placeholder="סיסמא"
                      />
                      <div className="me-login-btn">
                        <button onClick={this.handleClick} className="me-btn">
                          התחבר
                        </button>
                        <p>
                          אין לך חשבון?{" "}
                          <a
                            href="/signup"
                            data-toggle="modal"
                            data-target="#meSignup"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            הרשמה
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
