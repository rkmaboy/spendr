import React, { Component } from "react";
import { connect } from "react-redux";

class Login extends Component {
  constructor() {
    // 2
    super(); // 2
    this.state = {
      // 2
      usernameInput: "", // 2
      passwordInput: "", // 2
      username: undefined // 2
    }; // 2
  }
  usernameChange = evt => {
    // 4
    this.setState({ usernameInput: evt.target.value }); // 4
  }; // 4
  passwordChange = evt => {
    // 5
    this.setState({ passwordInput: evt.target.value }); // 5
  };
  submitHandlerLogin = async evt => {
    // 6
    evt.preventDefault(); // 6
    console.log("username", this.state.username); // 6
    console.log("password", this.state.passwordInput); // 6
    let name = this.state.usernameInput; // 6
    let data = new FormData(); // 7
    data.append("username", name); // 7
    data.append("password", this.state.passwordInput); // 7
    let response = await fetch("/login", { method: "POST", body: data }); // 8
    let body = await response.text(); // 8
    console.log("/login response", body); // 8
    body = JSON.parse(body); // 8
    if (body.success) {
      // 9
      this.setState({ username: name }); // 9
      console.log("sessionId", body.sessionId)
      this.props.dispatch({ type: "set-username", name: name, sessionId: body.sessionId });
      alert("Login Success!");
      return;
    } // 9
    alert("Login Failed");
    this.setState({ usernameInput: "" });
    this.setState({ passwordInput: "" });
  };

 

  render = () => {
    return (
      <div>
        Login
        <form onSubmit={this.submitHandlerLogin}>
          Username{" "}
          <input
            type="text"
            onChange={this.usernameChange}
            value={this.state.usernameInput}
          />
          Password{" "}
          <input
            type="password"
            onChange={this.passwordChange}
            value={this.state.passwordInput}
          />
          <input type="submit" value="login" />
        </form>
      </div>
    ); // 3
  };
}
let connectedLogin = connect()(Login);
export default connectedLogin;
