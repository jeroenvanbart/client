import React, { useState } from "react";
import PetService from "../../services/PetService";
import UploadService from "../../services/UploadService";

const initialState = {
  name: "",
  bio: "",
  notes: "",
  imageUrl: "",
};

const UploadPets = () => {
  const [formState, setFormState] = useState(initialState);

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

  return (
    <div>
      <h2>Upload your Pets</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
        />
        <label>bio:</label>
        <textarea
          type="text"
          name="bio"
          value={formState.bio}
          onChange={handleInputChange}
        />
        <label>notes:</label>
        <textarea
          type="text"
          name="notes"
          value={formState.notes}
          onChange={handleInputChange}
        />
        <label htmlFor="imageUrl">Description:</label>
        <input type="file" name="imageUrl" onChange={handleFileUpload} />

        {formState.imageUrl ? (
          <button type="submit">Submit</button>
        ) : (
          <button disabled type="submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default UploadPets;
