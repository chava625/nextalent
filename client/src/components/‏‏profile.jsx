import React, { Component } from "react";
import { auth } from "../services/auth";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import { subsDelete, subsEdit, subsOfUser } from "../services/subService";
import { UserContext } from "../context";

class Profile extends Component {
  state = { detailes: [], form: {} };
  static contextType = UserContext;

  joiSchema = {
    email: Joi.string().email().required(),
    profession: Joi.string().min(3).required(),
    seniority: Joi.number().required(),
    info: Joi.string().min(3).required(),
    location: Joi.string().required(),
    links: Joi.array().required(),
  };
  componentDidMount = async () => {
    let dataAuth = await auth();
    
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };
  handleLinkChange = (event) => {
    const { name, value } = event.target;
    const formLinks = this.state.form.links;
    const oldLink = [...(formLinks) || []];
    oldLink[+ name] = value;
    this.setState({
      form: { ...this.state.form, links: oldLink },
    });
  };
  clickEdit = async (e) => {
    console.log('this.state.form',this.state.form);
    let dataAuth = await auth();
    e.preventDefault();
    const detailes = this.context.sub;
    console.log(detailes);
    try {
      subsEdit(this.state.form).then((res) => {
        console.log('res',res.data);
        Swal.fire({
          title: "הפרטים עודכנו בהצלחה",
          icon: "success",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          width: "60%",
        });
      });
    } catch (err) {
      console.log("error", err);
    }
  };
  clickDelete = async (_id) => {
    let dataAuth = await auth();
    try {
      let data = await subsDelete(_id);
      let resp = await subsOfUser();
      const detailes = resp.data;
      this.setState({ detailes });
      Swal.fire({
        title: "פרטיך נמחקו הנך מועבר לעמוד הוספת פרטים",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        width:'60%'
      });
      this.props.history.push("/stock");

    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const detailes = this.context.sub;

    if (!detailes) return null;
    return (
      <React.Fragment>
        <div className="me-breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="me-breadcrumb-box">
                  <h1>הפרטים שלי</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="me-my-account me-padder-top me-banner-two">
          <div className="container ">
            <div className="row justify-content-center">
              {!this.context.sub && (
                <div className="col-lg-6 mt-5">
                  <div className="me-my-account-profile">
                    <div className="me-my-profile-head">
                      <div className="me-profile-name"></div>
                    </div>
                    <div className="me-account-profile-shape">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                        height="50"
                        width="100%"
                      >
                        {" "}
                        <path
                          className="exqute-fill-white"
                          d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3 c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3 c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"
                        ></path>
                      </svg>
                    </div>
                    <div className="me-my-profile-body my-5">
                      <h2 className="text-center text-warning mb-5">
                        אין לך פרופיל אישי גש{" "}
                        <a className="text-warning" href="/stock">
                          להוספה למאגר
                        </a>{" "}
                        בשביל לעדכן
                      </h2>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-lg-6" key={detailes._id}>
                <div className="me-my-account-profile">
                  <div className="me-my-profile-head">
                    <div className="me-profile-name">
                      <h4>שם: {detailes.name} </h4>
                    </div>
                  </div>
                  <div className="me-account-profile-shape">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1000 100"
                      preserveAspectRatio="none"
                      height="50"
                      width="100%"
                    >
                      {" "}
                      <path
                        className="exqute-fill-white"
                        d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3 c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3 c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"
                      ></path>
                    </svg>
                  </div>
                  <div className="me-my-profile-body">
                    <ul>
                      <li>
                        <input
                          type="text"
                          defaultValue={detailes.email}
                          placeholder='דוא"ל'
                          name="email"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          defaultValue={detailes.profession}
                          placeholder="מקצוע"
                          name="profession"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          defaultValue={detailes.seniority}
                          placeholder="שנות נסיון"
                          name="seniority"
                          o={this.handleChange}
                        />
                      </li>
                      <li>
                        <select
                          name="location"
                          id=""
                          onChange={this.handleChange}
                        >
                          <option value="">{detailes.location}</option>
                          <option value="">ירושלים</option>
                          <option value="">מרכז</option>
                          <option value="">צפון</option>
                          <option value="">דרום</option>
                        </select>
                      </li>
                      <li>
                        <input
                          type="text"
                          defaultValue={detailes.info}
                          placeholder="מידע נוסף"
                          name="info"
                          onChange={this.handleChange}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          defaultValue={detailes?.links}
                          placeholder="פרויקטים"
                          name="0"
                          onChange={this.handleLinkChange}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          defaultValue={detailes?.links}
                          placeholder="פרויקטים"
                          name="1"
                          onChange={this.handleLinkChange}
                        />
                      </li>
                      <li className="justify-content-center">
                        <div>
                          <button
                            className="me-btn mx-1"
                            onClick={this.clickEdit}
                          >
                            עדכון
                          </button>
                          <button
                            className="me-btn mx-1"
                            onClick={() => this.clickDelete(detailes._id)}
                          >
                            מחיקה
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
