import React, { useState, useEffect } from "react";
import DateService from "../../services/DateService";

const ShowNeedDates = (props) => {
  const { responseFromApi } = props.needdates;

  const [need, setNeed] = useState([]);

  useEffect(() => {
    setNeed(responseFromApi);
  }, [responseFromApi]);

  const deleteDate = (id) => {
    const service = new DateService();
    service
      .removeNeedDate(id)
      .then((response) => {
        setNeed(responseFromApi);
        window.location.reload(false);
      })
      .catch((err) => console.error(err));
  };

  // useEffect(() => {
  //   need && need.length && setNeed(responseFromApi);
  // }, [responseFromApi, deleteDate]);

  useEffect(() => {
    setNeed(responseFromApi);
  }, [responseFromApi]);

  return (
    <div>
      <h3>You need a petsitter for these dates</h3>
      <div className="pets">
        {need && need.length ? (
          need.map((item) => {
            return (
              <div key={item._id}>
                <div className="datecards">
                  <div className="datecardscontainer">
                    <p>
                      From: {item.needdatestart.toLocaleString().split("T")[0]}
                    </p>
                    <p>To: {item.needdateend.toLocaleString().split("T")[0]}</p>
                  </div>
                  <div>
                    <button
                      className="dashboardButton"
                      onClick={() => deleteDate(item._id)}
                    >
                      Delete date
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>You have no selected dates</p>
        )}
      </div>
    </div>
  );
};

export default ShowNeedDates;
