import React, {Component} from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="me-footer-copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="me-copyright-block">
                  <p>&copy; 2021 All right reserved by Chava</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
