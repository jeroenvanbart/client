import React, {useState} from "react";
import UserService from "../../services/UserService";
import UploadService from "../../services/UploadService";
import axios from "axios";

const initialState = {
  profileImg: "",
};

const UpdateImg = (props) => {
  const [formState, setFormState] = useState(initialState);
  

  const handleFileUpload = (event) => {
    console.log(event)
    const uploadData = new FormData(); // FormData represents a form that can upload files
    uploadData.append("profileImg", event.target.files[0]); // this will represent the uploaded file

  const service = new UploadService();

  service
  .updateProfileImg(uploadData)
  .then((response) => {
    console.log(response);
    setFormState({ ...formState, profileImg: response.cloudinaryUrl });
  })
  .catch((err) => console.error(err));
 

  }

 

  return (
    <div>
      <form action="">
        <label htmlFor="profileImg">Change ProfilePcture</label>
        <input type="file" name="profileImg" onChange={handleFileUpload} />
          <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateImg;
