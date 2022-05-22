
import React, { Component } from "react";
import { auth } from "../services/auth";
import {  favDeleteUser, favOfUser } from "../services/favService";

class Favorite extends Component {
  state = { detailes: [] };
  componentDidMount = () => {
    auth();
    favOfUser()
      .then((res) => {
        const detailes = res.data;
        this.setState({ detailes });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  removeFav = (_id) => {
    auth();
    favDeleteUser(_id)
     .then((res) => {
        console.log(res);
        favOfUser()
      .then((res) => {
        const detailes = res.data;
        this.setState({ detailes });
      })
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="me-breadcrumb mb-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="me-breadcrumb-box">
                  <h1>רשימת המועדפים שלי</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="me-about-two me-padder-bottom">
          <div className="container">
            <div className="row text-center">
              {!this.state.detailes.length && (
                <div className=" mt-5">
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
                      אין לך מועדפים{" "}
                      <a className="text-warning" href="/">
                        להוספת מועדפים
                      </a>{" "}
                     
                    </h2>
                  </div>
                </div>
              </div>
              )}
              {this.state.detailes.map((item) => (
                <div className="col-md-6 col-xl-4" key={item._id}>
                  <div className="me-about-two-box" >
                    <div className="me-about-two-shape">
                      <div className="me-about-round-shape">
                        <i lt="logo" className="img-fluid fas fa-medal"></i>
                        <ul className="me-svg-dot">
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </div>
                      <h4 style={{ color: "#f93e7e" }}>{item.subId?.name}</h4>
                      <h5 style={{ color: "#f93e7e" }}>
                        {item.subId?.profession}
                      </h5>
                      <ul className="me-about-two-list">
                        <li>
                          <p>נסיון: {item.subId?.seniority} שנים</p>
                        </li>
                        <li>
                          <p>מיקום: {item.subId?.location}</p>
                        </li>
                        <li>
                          <p>{item.subId?.email}</p>
                        </li>
                        <li>
                          <p>{item.subId?.info}</p>
                        </li>
                        <li>
                          <p><a target='_blank' href={'https://' + item.subId?.links[0]}>{item.subId?.links[0]}</a></p>
                        </li>
                        {item.subId?.links[1] && (
                          <li>
                          <p><a target='_blank' href={'https://' + item.subId?.links[1]}>{item.subId?.links[1]}</a></p>
                          </li>
                        )}
                        <button
                          onClick={() => this.removeFav(item._id)}
                          className="rmvBtn"
                        >
                          הסרה ממועדפים
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Favorite;
