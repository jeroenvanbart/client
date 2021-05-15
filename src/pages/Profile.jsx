import React, { useState, useEffect } from "react";
import "./Profile.css";
import UserService from "../services/UserService";
import UpdateImg from "../components/Profile/UpdateImg";
import UploadPets from "../components/Pets/UploadPets";
import PetCards from '../components/Pets/PetCards'

const Profile = (props) => {
  const [details, setDetails] = useState({});
  const [edit, setEdit] = useState(false);

  const editOptions = () => {
    !edit ? setEdit(true) : setEdit(false);
    console.log(edit);
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

  return (
    <div className="profilehead">
      <h3>Welcome {details.username} </h3>
      <img src={details.profileImg} alt="profileImg" />

      {!edit ? (
        <div>
          <button onClick={editOptions}>Edit profile</button>
          <h1>hi</h1>
          <PetCards user={details}/>
        </div>
      ) : (
        <div>
        <button onClick={editOptions}>Back to Dashboard</button>
          <UpdateImg user={details} />
          <h5>Add pets</h5>
          <UploadPets />
        </div>
      )}
    </div>
  );
};

export default Profile;
