import React, { Component } from "react";
import AuthService from "../../services/AutService.js";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = { username: "", email:"", password: "", errorMessage: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, email, password, usertype } = this.state;

    this.service
      .signup(username, email, password, usertype)
      .then((response) => {
        console.log(response)
        this.setState({ username: "", email: "", password: "" });
        this.props.setUser(response);
      })
      .catch((error) => {
        if (error.response.data) {
          const { message } = error.response.data;
          this.setState({ ...this.state, errorMessage: message });
        }
        console.log(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <div className="formcontainer">
        <div>{this.state.errorMessage && <p>{this.state.errorMessage}</p>}</div>

        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
            className="formfield"
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
            className="formfield"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
            className="formfield"
          />
          <label>Profile Type</label>
          <select id="usertype" name="usertype" onChange={(e) => this.handleChange(e)}>
            <option value={this.state.usertype}>Pet Owner</option>
            <option value={this.state.usertype}>Pet Sitter</option>
          </select>

          <input className="submitbutton"  type="submit" value="Signup" />
        </form>

        <p>
          Already have account?
          <Link to={"/"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
