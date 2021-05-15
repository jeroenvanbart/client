import React, { Component } from "react";
import { Link } from "react-router-dom";


import PetService from "../../services/PetService";

class PetCards extends Component {
  state = {
    listOfPets: [],
    listOfMyPets: [],
  };

  service = new PetService();

  // Api Caller Function
  getOwnPet = () => {
    this.service
      .getPets()
      .then((responseFromApi) => {
          console.log(responseFromApi)
        this.setState({
          listOfPets: responseFromApi,
        });
      })
      .catch((err) => console.error(err));
  };

  // MAKE AN API CALL WHEN COMPONENT MOUNTS
  componentDidMount() {
    this.getOwnPet();
  }

  

  render() {
    return (
      <div>
        <h1>{console.log(this.props.user._id)}</h1>
      </div>
    );
  }
}

export default PetCards;
