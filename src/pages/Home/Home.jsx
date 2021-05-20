import React from "react";
import './Home.css'
// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homebody">
      <h1>Pawtel</h1>
      <section>
        <div>
          <p className="quote"> <i>"There are only two sorts of people in the world. People with pets and people without pets."</i> </p>
          <p></p>
        </div>
        <div className="homegif">

        </div>
        <div>
          <article className="homearticle">
          <h4>Become a petsitter?</h4>
            <p>Whether you have a pet or you don't, as long as you love animals Pawtel is the place to be. At Pawtel we connect people that are in need
            of a petsitter with people who like to take care of pets. So if you're going on holidays and need someone to sit your pet or if you just like to have a guest, sign up for free today. </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Home;
