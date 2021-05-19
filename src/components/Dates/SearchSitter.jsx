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
    allADates &&
      allADates.length &&
      responseFromApi &&
      responseFromApi.length &&
      dateCompare();
  }, [allADates, responseFromApi]);

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

  const contactfield = () => {
    !contact ? setContact(true) : setContact(false);
  };

  useEffect(() => {
    search && search.length && getSitter();
  }, [search]);

  const uniqueSitters = () => {
    setUnique([...new Set(sitters.map((item) => item))]);
  };

  useEffect(() => {
    sitters && sitters.length && uniqueSitters();
  }, [sitters]);

  return (
    <div>
      <h3>Your matches</h3>
      {unique && unique.length ? (
        unique.map((item) => {
          return (
            <div key={item._id}>
              <h3>{item.username}</h3>
              <img className="datesimg" src={item.profileImg} alt="" />
              <p>{item.email}</p>
              <button className="dashboardButton" onClick={contactfield}>
                Send a message
              </button>
              {contact && (
                <div>
                  <ContactForm data={users} sitter={item.email} />
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
