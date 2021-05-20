import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";


const initialState = {
    email: "",
    subject: "",
    message: "",
    useremail: "",
  };


const ContactForm = (props) => {
 
  const [formState, setFormState] = useState(initialState);
  const [email, setEmail] = useState([]);


  const handleInputChange = (event) => {
    const { name, value} = event.target;
    setFormState({
      ...formState,
      [name]: value,
      email: props.sitter,
      useremail: email.email,
    });
  };

  useEffect(() => {
    setEmail(props.data);
  }, [props.data]);



  const handleFormSubmit = (event) => {
    event.preventDefault();

    const service = new UserService();

    service
      .sendEmail(formState)
      .then(() => {
        setFormState(initialState);
        window.location.reload(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="formcontainer">
        <form className="form" onSubmit={handleFormSubmit}>
          <label htmlFor="">Subject</label>
          <input
            className="formfieldmail"
            type="text"
            name="subject"
            required
            value={formState.subject}
            placeholder="Subject goes here...."
            onChange={handleInputChange}
          />

          <label htmlFor="">Message</label>
          <textarea
            type="text"
            required
            cols="30"
            rows="10"
            name="message"
            value={formState.message}
            placeholder="Type your email here...."
            onChange={handleInputChange}
            className="formfieldmail"
          />

          <button className="dashboardButton" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
