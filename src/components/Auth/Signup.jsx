import React, { Component } from "react";
import AuthService from "../../services/AutService.js";
import { Link } from "react-router-dom";
import UploadService from '../../services/UploadService'

class Signup extends Component {
  state = { username: "", email: "", password: "", profileImg:"", errorMessage: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, email, password, profileImg } = this.state;

    this.service
      .signup(username, email, password, profileImg)
      .then((response) => {
        console.log(response);
        this.setState({ username: "", email: "", password: "" , profileImg});
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

  handleFileUpload = (event) => {
    const uploadData = new FormData(); // FormData represents a form that can upload files
    uploadData.append("profileImg", event.target.files[0]); // this will represent the uploaded file

    const service = new UploadService();

    service
      .uploadProfile(uploadData)
      .then((response) => {
        this.setState({ ...this.state, profileImg: response.cloudinaryUrl });
      })
      .catch((err) => console.error(err));
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
          <label htmlFor="profilImg">Upload image</label>
          <input
            type="file"
            name="profilImg"
            onChange={this.handleFileUpload}
          />

          {this.state.profileImg ? (
            <button className="dashboardButton" type="submit">
              Submit
            </button>
          ) : (
            <button className="dashboardButton" disabled type="submit">
              Submit
            </button>
          )}

          <input className="submitbutton" type="submit" value="Signup" />
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
