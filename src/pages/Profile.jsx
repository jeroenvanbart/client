import React, { useState, useEffect } from "react";
import "./Profile.css";
import UserService from "../services/UserService";
import UpdateImg from "../components/Profile/UpdateImg";

const Profile = (props) => {
  const [details, setDetails] = useState({});

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

  return (
    <div className="profilehead">
      <h3>Welcome {details.username} </h3>
      <img src={details.profileImg} alt="profileImg" />
      <UpdateImg />
    </div>
  );
};

export default Profile;
