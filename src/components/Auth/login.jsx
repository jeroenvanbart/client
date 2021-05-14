import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import AuthService from "../../services/AutService";
import UserService from "../../services/UserService"

class Login extends Component {
  state = { email: "", password: "", errorMessage: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    this.service
      .login(email, password)
      .then((response) => {
        console.log(response._id);

        this.setState({ email: "", password: "" });
        this.props.setUser(response);
        
      })
      .catch((error) => {
        if (error.response.data) {
          const { message } = error.response.data;
          this.setState({ ...this.state, errorMessage: message });
        }
        console.error(error.response.data);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <div className="formcontainer">
        {this.state.errorMessage && <span>{this.state.errorMessage}</span>}
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            className="formfield"
            onChange={(e) => this.handleChange(e)}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            className="formfield"
            onChange={(e) => this.handleChange(e)}
          />

          <input className="submitbutton" type="submit" value="Login" />
        </form>
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    );
  }
}

export default Login;
