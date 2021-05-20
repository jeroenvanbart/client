import React, {useState} from "react";
import UploadService from "../../services/UploadService";
import UserService from '../../services/UserService';


const initialState = {
  profileImg: "",
};

const UpdateImg = (props) => {
  const [formState, setFormState] = useState(initialState);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const service = new UserService();

    service
      .updateUser(formState)
      .then(() => {
        setFormState(initialState);
        window.location.reload(false);
      })
      .catch((err) => console.error(err));
  };

  

  const handleFileUpload = (event) => {
    console.log(event)
    const uploadData = new FormData();
    uploadData.append("profileImg", event.target.files[0]); 

  const service = new UploadService();

  service
  .updateProfileImg(uploadData)
  .then((response) => {
    console.log(response);
    setFormState({ ...formState, profileImg: response.cloudinaryUrl });
    console.log(formState)
  })
  .catch((err) => console.error(err));
 

  }

 

  return (
    <div>
      <form className="form" onSubmit={handleFormSubmit}>
        <label htmlFor="profileImg">Change ProfilePcture</label>
        <input type="file" name="profileImg" onChange={handleFileUpload} />
          <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateImg;
