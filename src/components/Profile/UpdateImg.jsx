import React from "react";
import UserService from "../../services/UserService";
import UploadService from "../../services/UploadService";

const UpdateImg = () => {
//   // HANDLE FORM SUBMISSION
//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     const service = new UserService();

//     service
//       .createProject(formState)
//       .then(() => {
//         getData();
//         setFormState(initialState);
//       })
//       .catch((err) => console.error(err));
//   };

//   // HANDLE FILE UPLOAD
//   const handleFileUpload = (event) => {
//     const uploadData = new FormData(); // FormData represents a form that can upload files
//     uploadData.append("imageUrl", event.target.files[0]); // this will represent the uploaded file

//     const service = new UploadService();

//     service
//       .upload(uploadData)
//       .then((response) => {
//         console.log(response);
//         setFormState({ ...formState, imageUrl: response.cloudinaryUrl });
//       })
//       .catch((err) => console.error(err));
//   };

  return (
    <div>
      <form action="">
        <label htmlFor="imageUrl">Change ProfilePcture</label>
        <input type="file" name="imageUrl" />
          <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateImg;
