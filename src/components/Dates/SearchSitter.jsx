import React, { useState, useEffect } from "react";
import "./Dates.css";
import ContactForm from "../Contact/ContactForm";

const SearchSitter = (props) => {
  const [search, setSearch] = useState([]);
  const [sitters, setSitter] = useState([]);
  const [unique, setUnique] = useState([]);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState(false);

  const { allADates } = props.allavdates;
  const { responseFromApi } = props.needdates;
  const { users } = props;

  useEffect(() => {
    if (
      allADates &&
      allADates.length &&
      responseFromApi &&
      responseFromApi.length
    ) {
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
    }
  }, [allADates, responseFromApi, users]);

  const contactfield = () => {
    !contact ? setContact(true) : setContact(false);
  };

  useEffect(() => {
    if (search && search.length) {
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
    }
  }, [search, users, allADates]);

  useEffect(() => {
    sitters &&
      sitters.length &&
      setUnique([...new Set(sitters.map((item) => item))]);
  }, [sitters]);

  return (
    <div className="boxoutline">
      <h3>Your matches</h3>
      {unique && unique.length ? (
        unique.map((item) => {
          return (
            <div key={item._id}>
              <h3>{item.username}</h3>
              <img className="datesimg" src={item.profileImg} alt="" />
              <p>I love to take care of your pet!</p>
              <button className="dashboardButton" onClick={contactfield}>
                Send a message
              </button>
              {contact && (
                <div>
                  <ContactForm data={props.user} sitter={item.email} />
                </div>
              )}
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
