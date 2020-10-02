import React from "react";
import { Redirect } from "react-router-dom";
import styles from "./styles.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailField: "",
      passwordField: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLoginPress = this.handleLoginPress.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleLoginPress() {
    const { emailField, passwordField } = this.state;
    this.props.postSession(emailField, passwordField);
  }

  render() {
    if (this.props.userId) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <form>
          <label>Email</label>
          <input
            value={this.state.emailField}
            onChange={this.handleChange}
            name="emailField"
          />
          <br />
          <label>Password</label>
          <input
            value={this.state.passwordField}
            onChange={this.handleChange}
            name="passwordField"
          />
        </form>
        <button onClick={this.handleLoginPress}>login</button>
      </div>
    );
  }
}

export default Login;
