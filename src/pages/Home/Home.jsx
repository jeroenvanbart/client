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
          <h4>Do you own a pet?</h4>
            <p>If you go on holliday's or need someone to take care of your pet, this is where you find a petsitter. 
            Sign up and browse people who love to take care of your pet.</p>
          </article>
          <article className="homearticle">
          <h4>Do you want to be a petsitter?</h4>
            <p>Want to care for a pet just because you like it or to earn a little pocketmoney, this is where you can offer your service.
            Sign up and find people in need of your service.</p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Home;
