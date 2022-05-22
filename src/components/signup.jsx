import React, { Component } from "react";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import { signup } from "../services/userService";

class Register extends Component {
  state = { user: "", email: "", password: "" };

  joiSchema = {
    user: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = (event) => {
    event.preventDefault();

    const data = {
      user: this.state.user,
      email: this.state.email,
      password: this.state.password,
    };

    const valid = Joi.validate(data, this.joiSchema, {
      abortEarly: false,
    });

    if (valid.error) {
      console.log(valid.error);
      valid.error.details.forEach((err) => {
        console.log(err.message);
      });
      return;
    } else {
      signup(data)
        .then( (res)=> {
          Swal.fire({
            title: "נרשמת בהצלחה!!",
            icon: "success",
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            width:'60%'
          });
          this.props.history.push("/login");
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: 'הדוא"ל כבר קיים',
            icon: "error",
            position: "top-end",
            showConfirmButton: false,
            timer: 2500,
            width:'60%'
          });
          console.log(error);
        });
    }
  };
  render() {
    return (
      <React.Fragment>
                 <div className= "me-breadcrumb">
        <div className= "container">
            <div className= "row">
                <div className= "col-12">
                    <div className= "me-breadcrumb-box">
                        <h1>הרשמה</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>        <div id="meSignup">
          <div className="me-banner-two">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <form onSubmit={this.handleClick}>
                    <div className="me-login-form">
                      <input
                        onChange={this.handleChange}
                        name="user"
                        type="text"
                        placeholder="שם משתמש"
                        minLength="2" required
                      />
                      <input
                        onChange={this.handleChange}
                        name="email"
                        type="text"
                        placeholder='דוא"ל' required
                      />
                      <input
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        placeholder="סיסמא"
                        minLength="3"
                        required
                      />
                      <div className="me-login-btn">
                        <button className="me-btn">
                          הרשמה
                        </button>
                        <p>
                          יש לך כבר חשבון?{" "}
                          <a
                            href="/login"
                            data-toggle="modal"
                            data-target="#meLogin"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            התחבר
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

export default Register;
