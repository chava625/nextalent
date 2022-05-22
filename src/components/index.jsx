import React, { Component } from "react";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import { UserContext } from "../context";
import { auth } from '../services/auth';
import { addFav } from "../services/favService";
import { getSubs, searchSubs } from "../services/subService";

class Index extends Component {
  static contextType = UserContext;

  state = { detailes: [], q: "", userId: "", subId: "" };
  joiSchema = {
    subId: Joi.string().required(),
    userId: Joi.string(),
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = () => {
    let searchQ = this.refs.find.value;
    searchSubs(searchQ)
      .then((res) => {
        const detailes = res.data;
        this.setState({ detailes });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  clickAdd = (id) => {
    const data = {
      subId: id,
    };
    const valid = Joi.validate(data, this.joiSchema, {
      abortEarly: false,
    });
    if (valid.error) {
      valid.error.details.forEach((err) => {
        console.log(err.message);
      });
      return;
    }
    addFav(data)
      .then((res) => {
        Swal.fire({
          text: "נוסף למועדפים",
          icon: "info",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          width:'60%'
        });
      })
      .catch((error) => {
        Swal.fire({
          text: "אני כבר במועדפים...",
          icon: "warning",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          width:'60%'
        });
      });
  };
  componentDidMount() {
    auth();
    getSubs()
    .then((res) => {
      const detailes = res.data;
      this.setState({ detailes });
      this.context.setSub(detailes);
    });
  }
  render() {
    console.log(this.context);
    return (
      <React.Fragment>
        <div className="me-banner-two mt-5">
          <div className="container">
            <div className="">
              <div className="col-12">
                <div className="me-banner-two-text">
                  <h1 className="text-center animate__animated animate__zoomIn animate__delay-0.5s">
                    מחפש את הטאלנט הבא בהייטק?
                  </h1>
                  <p className="text-center">
                    הגעת למקום הנכון, אצלנו תוכל למצוא אנשי הייטק מוכשרים
                    ומוצלחים בכל התחומים.
                  </p>
                  <div className="text-center mt-5">
                    <a href="/contact" className="me-btn">
                      צור קשר
                    </a>
                    <a href="/#goS" className="me-btn">
                      חיפוש
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="me-plans me-padder-top-less me-padder-bottom">
          <div className="container">
            <div className="me-heading2" id="goS">
              <h1>בוא למצוא את הטאלנט שלך</h1>
            </div>
            <div className="container my-5">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="me-my-account-profile">
                    <div className="me-my-profile-body text-center">
                      <ul className="mt-3">
                        <li>
                          <input
                            type="text"
                            ref="find"
                            placeholder="חיפוש"
                            name="q"
                            onChange={this.handleChange}
                          />
                          <button
                            onClick={this.handleClick}
                            className="me-btn-s"
                          >
                            <i className="fas fa-search"></i>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="id_res" className="row justify-content-center">
              {!this.state.detailes.length && <div className="me-plans-box"><h2>אין תוצאות</h2></div>}
              {this.state.detailes.map((item) => (
                <div className="col-10 col-lg-4 col-md-6 mb-4 mb-md-1" key={item._id}>
                  <div className="me-plans-box animate__animated animate__fadeInDown animate__delay-0.8s">
                    <div className="me-plan-header">
                      <h1 className="me-plan-title">{item.name}</h1>
                      <div className="me-plan-duration">
                        <span>-</span> {item.profession} <span>-</span>
                      </div>
                      <div className="me-plan-duration">
                        שנות נסיון: {item.seniority}
                      </div>
                    </div>
                    <div className="me-plan-body p-2">
                      <div className="me-div">מיקום: {item.location}</div>
                      <p></p>
                      <div className="me-div">דוא"ל: </div>
                      <p>{item.email}</p>
                      <div className="me-div">מידע כללי: </div>
                      <p>{item.info}</p>
                      <div className="me-div">פרויקטים:</div>
                      {item.links.map((i) => (
                        <div className="links">
                        <a style={{textDecoration:'none', color:'black'}} href={`https://${i}`} target="_blank" key={i} className="m-0">
                          {i}
                        </a>
                        </div>  
                      ))}
                    </div>
                    <div className="me-plan-footer">
                      <button
                        className="me-btn"
                        onClick={() => this.clickAdd(item._id)}
                      >
                        הוספה כמועדף
                      </button>
                    </div>
                    <div className="me-plan-shape"></div>
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

export default Index;
