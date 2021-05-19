import React, { useEffect, useState } from "react";
import UserService from '../../services/UserService'

const initialState = {
  email: "",
  subject: "",
  message: "",
  useremail: "",
};

const ContactForm = (props) => {
    const [formState, setFormState] = useState(initialState);
    const [email, setEmail] = useState([]);

    const {user} = props.data
  
  
    console.log(props.data);
  
    // HANDLE THE CHANGES IN THE INPUT FIELDS
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormState({ ...formState, [name]: value, useremail: user.email });
    };
  
    useEffect(() => {
      setEmail(props.data);
    }, [props.data]);
  
    // HANDLE FORM SUBMISSION
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
      <div>
        <form className="form" onSubmit={handleFormSubmit}>
          <label htmlFor="email"></label>
          <input
            className="passwordinput"
            type="hidden"
            name="email"
            value="{{data.owner.email}}"
            onChange={handleInputChange}
          />

          <label htmlFor="">Subject</label>
          <input
            className="passwordinput"
            type="text"
            name="subject"
            required
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
            placeholder="Type your email here...."
            onChange={handleInputChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
