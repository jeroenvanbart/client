import React, { useState, useEffect } from "react";
import "./Profile.css";
import UserService from "../services/UserService";
import PetService from "../services/PetService";
import DateService from "../services/DateService";

import UpdateImg from "../components/Profile/UpdateImg";
import UploadPets from "../components/Pets/UploadPets";
import PetCards from "../components/Pets/PetCards";
import NeedDate from "../components/Dates/NeedDate";
import AvDate from "../components/Dates/AvDate";
import ShowNeedDates from "../components/Dates/ShowNeedDates";
import ShowAvDates from "../components/Dates/ShowAvDates";
import SearchSitter from "../components/Dates/SearchSitter";

const Profile = (props) => {
  const [details, setDetails] = useState({});
  const [listOfPets, setLisOfPets] = useState([]);
  const [playDiv, setDiv] = useState("petCard");
  const [listAvDates, setListAvDates] = useState([]);
  const [listNeedDates, setListNeedDates] = useState([]);
  const [AllAvDates, setAllAvDates] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const editOptions = () => {
    setDiv("edit");
  };
  const backToDashboard = () => {
    setDiv("petCard");
    window.location.reload(false);
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

  const getAllUser = () => {
    const service = new UserService();

    service
      .getAllUsers()
      .then((allUsers) => setAllUsers(allUsers))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(getAllUser, [props.match.params]);

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

  const getMyOwnAvDates = () => {
    const { id } = props.match.params;

    const service = new DateService();
    service
      .getOwnAvDates(id)
      .then((responseFromApi) => {
        setListAvDates({ responseFromApi });
      })
      .catch((err) => console.error(err));
  };

  useEffect(getMyOwnAvDates, [props.match.params]);

  const getMyOwnNeedDates = () => {
    const { id } = props.match.params;

    const service = new DateService();
    service
      .getOwnNeedDates(id)
      .then((responseFromApi) => {
        setListNeedDates({ responseFromApi });
      })
      .catch((err) => console.error(err));
  };

  useEffect(getMyOwnNeedDates, [props.match.params]);

  const getAllAvDate = () => {
    const { id } = props.match.params;

    const service = new DateService();
    service
      .getAllAvDates(id)
      .then((allADates) => {
        setAllAvDates({ allADates });
      })
      .catch((err) => console.error(err));
  };

  useEffect(getAllAvDate, [props.match.params]);

  return (
    <div className="profilehead">
      <div>
        <h3>Welcome {details.username} </h3>
        <div className="dashboardButtons">
          <button onClick={editOptions}>Edit profile</button>
          <button onClick={addPets}>Edit Pets</button>
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
        <button onClick={searchDiv}>Search Sitter</button>
        <button onClick={sitterDiv}>Be a Sitter</button>
      </div>
      <div>
        {(() => {
          if (playDiv === "petCard") {
            return (
              <div>
                <PetCards user={details} pets={listOfPets} />
                <ShowNeedDates needdates={listNeedDates} />
                <SearchSitter
                  allavdates={AllAvDates}
                  users={allUsers}
                  needdates={listNeedDates}
                  user={details}
                />
                <ShowAvDates avdates={listAvDates} />
              </div>
            );
          } else if (playDiv === "edit") {
            return (
              <div>
                <button className="dashboardButton" onClick={backToDashboard}>
                  Back to Dashboard
                </button>
                <UpdateImg user={details} />
              </div>
            );
          } else if (playDiv === "sitter") {
            return (
              <div>
                <AvDate user={details} />
                <button className="dashboardButton" onClick={backToDashboard}>
                  Back to Dashboard
                </button>
              </div>
            );
          } else if (playDiv === "search") {
            return (
              <div>
                <NeedDate user={details} />
                <button className="dashboardButton" onClick={backToDashboard}>
                  Back to Dashboard
                </button>
              </div>
            );
          } else if (playDiv === "addpets") {
            return (
              <div>
                <button className="dashboardButton" onClick={backToDashboard}>
                  Back to Dashboard
                </button>
                <UploadPets user={details} pets={listOfPets} back={backToDashboard} />
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default Profile;
