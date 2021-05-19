import React, { useState, useEffect } from "react";
import "./Dates.css";

const SearchSitter = (props) => {
  const [search, setSearch] = useState([]);
  const [sitters, setSitter] = useState([]);
  const [unique, setUnique] = useState([]);
  const [message, setMessage] = useState("");

  const { allADates } = props.allavdates;
  const { responseFromApi } = props.needdates;
  const { users } = props;

  const dateCompare = () => {
    let matches = [];

    for (let i = 0; i < allADates.length; i++) {
      for (let j = 0; j < responseFromApi.length; j++) {
        if (responseFromApi.length === 0) {
          setMessage("No matches found");
        } else if (
          responseFromApi[j].needdatestart > allADates[i].avdatestart &&
          responseFromApi[j].needdateend < allADates[i].avdateend
        ) {
          matches.push(allADates[i]);
          setSearch(matches);
        } else {
          setMessage("No matches found");
        }
      }
    }
  };

  useEffect(() => {
    allADates && allADates.length && responseFromApi && responseFromApi.length && dateCompare();
  }, [allADates, dateCompare]);

  const getSitter = () => {
    let aSitters = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < allADates.length; j++) {
        if (users[i]._id === allADates[j].owner) {
          aSitters.push(users[i]);
          setSitter(aSitters);
          return;
        }
      }
    }
  };

  useEffect(() => {
    search && search.length && getSitter();
  }, [search, getSitter]);

  const uniqueSitters = () => {
    setUnique([...new Set(sitters.map((item) => item))]);
  };

  useEffect(() => {
    sitters && sitters.length && uniqueSitters();
  }, [sitters, uniqueSitters]);

  return (
    <div>
      <h3>Your matches</h3>
      {unique && unique.length ? (
        unique.map((item) => {
          return (
            <div key={item._id}>
              <h3>{item.username}</h3>
              <img className="datesimg" src={item.profileImg} alt="" />
            </div>
          );
        })
      ) : (
        <h3>{message}</h3>
      )}
    </div>
  );
};

export default SearchSitter;
