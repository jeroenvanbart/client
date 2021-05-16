import React, { useState, useEffect } from "react";
import "./Profile.css";
import UserService from "../services/UserService";
import UpdateImg from "../components/Profile/UpdateImg";
import UploadPets from "../components/Pets/UploadPets";
import PetCards from "../components/Pets/PetCards";
import PetService from "../services/PetService";
import NeedDate from "../components/Dates/NeedDate"

const Profile = (props) => {
  const [details, setDetails] = useState({});
  const [listOfPets, setLisOfPets] = useState([]);
  const [playDiv, setDiv] = useState("petCard");

  const editOptions = () => {
    setDiv("edit");
  };
  const backToDashboard = () => {
    setDiv("petCard");
  };
  const searchDiv = () => {
    setDiv("search");
  };
  const sitterDiv = () => {
    setDiv("sitter");
  };
  const addPets = () => {
    setDiv("addpets");
  };

  const getSingleUser = () => {
    const { id } = props.match.params;

    const service = new UserService();

    service
      .getOneUser(id)
      .then((responseFromApi) => setDetails(responseFromApi))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(getSingleUser, [props.match.params]);

  const getMyOwnPet = () => {
    const { id } = props.match.params;

    const service = new PetService();
    service
      .getOwnPets(id)
      .then((responseFromApi) => {
        setLisOfPets({ responseFromApi });
      })
      .catch((err) => console.error(err));
  };

  useEffect(getMyOwnPet, [props.match.params]);

  return (
    <div className="profilehead">
      <div>
        <h3>Welcome {details.username} </h3>
        <div className="dashboardButtons">
          <button onClick={editOptions}>Edit profile</button>
          <button onClick={addPets}>Add pets</button>
        </div>
      </div>
      <div>
        <img
          className="profileheadimg"
          src={details.profileImg}
          alt="profileImg"
        />
      </div>
      <div className="dashboardButtons">
        <button onClick={searchDiv}>Search for Sitter</button>
        <button onClick={sitterDiv}>Be a Sitter</button>
      </div>
      <div>
        {(() => {
          if (playDiv === "petCard") {
            return (
              <div>
                <PetCards user={details} pets={listOfPets} />
              </div>
            );
          } else if (playDiv === "edit") {
            return (
              <div>
                <button className="dashboardButton" onClick={backToDashboard}>Back to Dashboard</button>
                <UpdateImg user={details} />
              </div>
            );
          } else if (playDiv === "sitter") {
            return (
              <div>
                <button className="dashboardButton" onClick={backToDashboard}>Back to Dashboard</button>
                <h1>Be a Sitter</h1>
              </div>
            );
          } else if (playDiv === "search") {
            return (
              <div>
                <button className="dashboardButton" onClick={backToDashboard}>Back to Dashboard</button>
                <NeedDate user={details} />
              </div>
            );
          } else if (playDiv === "addpets") {
            return (
              <div>
                <button className="dashboardButton" onClick={backToDashboard}>Back to Dashboard</button>
                <h5>Add pets</h5>
                <UploadPets />
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default Profile;
