import React, { useState, useEffect } from "react";
import DateService from "../../services/DateService";

const ShowAvDates = (props) => {
  const { responseFromApi } = props.avdates;
  const [empty, setEmpty] = useState([]);

  useEffect(() => {
    responseFromApi && responseFromApi.length && setEmpty(responseFromApi);
  }, [responseFromApi]);

  const deleteDate = (id) => {
    const service = new DateService();

    service
      .removeAvDate(id)
      .then((response) => {
        setEmpty(responseFromApi);
        window.location.reload(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    empty && empty.length && setEmpty(responseFromApi);
  }, [responseFromApi, deleteDate]);

  return (
    <div>
      <h3>You are availible on these dates</h3>
      {empty && empty.length ? (
        empty.map((item) => {
          return (
            <div key={item._id}>
                <div>
                  <div>
                    <p>
                      From: {item.avdatestart.toLocaleString().split("T")[0]}
                    </p>
                    <p>To: {item.avdateend.toLocaleString().split("T")[0]}</p>
                  </div>
                  <div>
                    <button onClick={() => deleteDate(item._id)}>
                      Delete date
                    </button>
                  </div>
                </div>   
            </div>
          );
        })
      ) : (
        <p>You did not make yourself availible</p>
      )}
    </div>
  );
};

export default ShowAvDates;
