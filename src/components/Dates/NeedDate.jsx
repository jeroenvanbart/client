import React, { Component } from "react";
import DateService from "../../services/DateService";


export class NeedDate extends Component {
  state = { needdatestart: "", needdateend: ""};
  

  service = new DateService();


  handleFormSubmit = (event) => {
    event.preventDefault();

    const { needdatestart, needdateend } = this.state;

    this.service
      .createNeedDate(this.props.user._id, needdatestart, needdateend)
      .then((response) => {
        this.setState({ needdatestart: "", needdateend: "" });
        
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
        <h3>Search for a sitter</h3>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label for="start">Start date:</label>
          <input
            type="date"
            id="start"
            name="needdatestart"
            value={this.state.needdatestart}
            onChange={(e) => this.handleChange(e)}
          />
          <label for="end">End date:</label>

          <input
            type="date"
            id="end"
            name="needdateend"
            value={this.state.needdateend}
            onChange={(e) => this.handleChange(e)}
          />
          <input className="submitbutton" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default NeedDate;
