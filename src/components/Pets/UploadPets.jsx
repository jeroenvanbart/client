import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PetService from "../../services/PetService";
import UploadService from "../../services/UploadService";

const initialState = {
  name: "",
  bio: "",
  notes: "",
  imageUrl: "",
};

const UploadPets = (props) => {
  const [formState, setFormState] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  

  // HANDLE THE CHANGES IN THE INPUT FIELDS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const service = new PetService();

    service
      .createPet(formState)
      .then(() => {
        setFormState(initialState);
        setIsSubmitted(true);
        props.backToDashboard()
      })
      .catch((err) => console.error(err));
  };

  const handleFileUpload = (event) => {
    const uploadData = new FormData(); // FormData represents a form that can upload files
    uploadData.append("imageUrl", event.target.files[0]); // this will represent the uploaded file

    const service = new UploadService();

    service
      .upload(uploadData)
      .then((response) => {
        setFormState({ ...formState, imageUrl: response.cloudinaryUrl });
      })
      .catch((err) => console.error(err));
  };

  return isSubmitted ? (
    <Redirect to= "/" />
  ) : (
    <div className="formcontainer">
      <h3>Upload your Pets</h3>
      <form className="form" onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          className="formfield"
          required
        />
        <label>bio:</label>
        <textarea
          type="text"
          name="bio"
          value={formState.bio}
          onChange={handleInputChange}
          className="formfield"
          required
        />
        <label>Special notes:</label>
        <textarea
          type="text"
          name="notes"
          value={formState.notes}
          onChange={handleInputChange}
          className="formfield"
        />

        <label>My pet is a</label>
        <select
          id="pettype"
          name="pettype"
          onChange={handleInputChange}
          className="formfield"
          required
        >
          <option value={formState.pettype}>Dog</option>
          <option value={formState.pettype}>Cat</option>
          <option value={formState.pettype}>Rodent</option>
          <option value={formState.pettype}>Fish</option>
          <option value={formState.pettype}>Bird</option>
        </select>

        <label htmlFor="imageUrl">Upload image</label>
        <input required type="file" name="imageUrl" onChange={handleFileUpload} />

        {formState.imageUrl ? (
          <button className="dashboardButton" type="submit">
            Submit
          </button>
        ) : (
          <button className="dashboardButton" disabled type="submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default UploadPets;
