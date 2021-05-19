import React, { Component } from "react";
import DateService from "../../services/DateService";

export class AvDate extends Component {
  state = { needdatestart: "", needdateend: ""};
  service = new DateService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { avdatestart, avdateend } = this.state;

    this.service
      .createAvDate(this.props.user._id, avdatestart, avdateend)
      .then((response) => {
        this.setState({ avdatestart: "", avdateend: ""});
        
      })
      .catch((error) => {
        console.error("error");
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <div>
        <h3>Select your availibility to be a petsitter</h3>
        <form className="form" onSubmit={this.handleFormSubmit}>

          <label for="start">Start date:</label>
          <input
            type="date"
            id="start"
            name="avdatestart"
            value={this.state.avdatestart}
            onChange={(e) => this.handleChange(e)}
          />
          <label for="end">End date:</label>

          <input
            type="date"
            id="end"
            name="avdateend"
            value={this.state.avdateend}
            onChange={(e) => this.handleChange(e)}
          />
          <input className="submitbutton" type="submit" value="Submit" />
        </form>
      </div>)
    
  }
}

export default AvDate;
