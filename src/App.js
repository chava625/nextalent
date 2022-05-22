import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import Index from "./components/index";
import { Switch, Route } from "react-router-dom";
import Stock from "./components/stock";
import Profile from "./components/profile";
import Contact from "./components/contact";
import Favorite from "./components/favorites";
import Footer from "./components/footer";
import axios from "axios";
import { UserContext } from "./context";
import { subsOfUser } from "./services/subService";

class App extends Component {
  static contextType = UserContext;
  state = { currentUser: "" };
  async componentDidMount() {
    let userInfo = localStorage.getItem("token");
    this.setState({ user: userInfo });
    axios
      .get("/api/users/current", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if(res.status == 200){
          console.log("current", res.data);
          this.context.setUser(res.data);
          let currentUser = res.data;
          this.setState(currentUser);
          console.log(currentUser);
        } else {
          console.log("currentNull",null);
          this.context.setUser(null);

        }
      });
    let res = await subsOfUser()
    this.context.setSub(res.data);
  }
  render() {
    let currentUser = this.state.user;
    return (
      <React.Fragment>
        <header>
          <Navbar user={this.context.user} setUser={this.context.setUser} />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/stock" component={Stock} />
            <Route path="/profile" component={Profile} />
            <Route path="/favorites" component={Favorite} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
