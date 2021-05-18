import "./Pets.css";

import React from "react";

const PetCards = (props) => {
  const { pets } = props;

  return (
    <div>
      <div>
        {pets.responseFromApi &&
          pets.responseFromApi.map((item) => {
            return (
              <div key={item._id} className="petcards">
                <h3>{item.name}</h3>
                <p>is a {item.pettype}</p>
                <img src={item.imageUrl} alt="" />
                <div className="petcardscontainer">
                  <div>
                    <p>{item.bio}</p>
                    <p>{item.notes}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PetCards;
