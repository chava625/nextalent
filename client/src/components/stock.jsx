import React, { Component } from "react";
import Joi from "joi-browser";
import { auth } from "../services/auth";
import Swal from "sweetalert2";
import { subsAdd } from "../services/subService";

class Stock extends Component {
  state = {
    name: "",
    email: "",
    profession: "",
    seniority: "",
    info: "",
    location: "",
    links: [],
    errors: [],
  };
  joiSchema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    profession: Joi.string().min(3).required(),
    seniority: Joi.number().required(),
    info: Joi.string().min(3).required(),
    location: Joi.string().required(),
    links: Joi.array().required(),
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = (e) => {
    auth();
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      profession: this.state.profession,
      seniority: this.state.seniority,
      info: this.state.info,
      location: this.state.location,
      links: [this.state.links, this.state.links2],
    };
    const valid = Joi.validate(data, this.joiSchema, {
      abortEarly: false,
    });
    if (valid.error) {
      valid.error.details.forEach((err) => {
        this.setState({ errors: valid.error.details });
        Swal.fire({
          title: err.message,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
          width:'50%'
        });
      });
      return;
    } else {
      subsAdd(data)
      .then((res) => {
          Swal.fire({
            title: "נוסף למאגר",
            icon: "success",
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            width:'60%'
          });
          this.props.history.push("/profile");
        })
        .catch((err) => {
          Swal.fire({
            title:  `יש לך כבר פרופיל לעדכון עבור לפרופיל שלי `,
            icon: "error",
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            width:'60%'
          });
        });
    }
  };
  componentDidMount() {
    auth();
  }
  render() {
    return (
      <React.Fragment>
        <div className="me-breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="me-breadcrumb-box">
                  <h1>הוספה למערכת</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="me-my-account me-padder-top me-banner-two">
          <form onSubmit={this.handleClick}  className="container">
            <div className="row justify-content-center">
              <div className="col-10 col-lg-6">
                <div className="me-my-account-profile">
                  <div
                    className="me-my-profile-head mb-2"
                    style={{ height: "20px" }}
                  >
                    <h3 className="m-0 p-0 text-light">הכנס פרטים</h3>
                  </div>
                  <div className="me-my-profile-body">
                    <ul>
                      <li>
                        <input
                          type="text"
                          required
                          placeholder="שם"
                          name="name"
                          minLength="2"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <input
                          type="email"
                          required
                          placeholder='דוא"ל'
                          name="email"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          required
                          placeholder="מקצוע"
                          name="profession"
                          minLength="3"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <input
                          type="number"
                          required
                          placeholder="שנות נסיון"
                          name="seniority"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          required
                          placeholder="מידע נוסף"
                          name="info"
                          minLength="2"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <select
                          name="location"
                          required
                          onChange={this.handleChange}
                        >
                          <option value="">מיקום</option>
                          <option value="ירושלים">ירושלים</option>
                          <option value="מרכז">מרכז</option>
                          <option value="צפון">צפון</option>
                          <option value="דרום">דרום</option>
                        </select>
                      </li>
                      <li>
                        <input
                          type="text"
                          required
                          placeholder="פרויקט 1"
                          name="links"
                          minLength="2"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          placeholder="פרויקט 2"
                          name="links2"
                          minLength="2"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <button
                          className="me-btn"
                        >
                          הוספה
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Stock;
