import axios from "axios";
const { REACT_APP_BACKEND_BASE_URL } = process.env;

class UserService {
  constructor() {
    let service = axios.create({
      baseURL: REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });

    this.service = service;
  }

  getOneUser = (profileId) =>
    this.service.get(`/profile/${profileId}`).then((response) => response.data);

  getAllUsers = () =>
    this.service.get(`/users`).then((response) => response.data);

  updateUser = (profileId, data) =>
    this.service
      .put(`/profile/${profileId}`, data)
      .then((response) => response.data);

  sendEmail = (FormData) => {
    return this.service
      .post("/send-email", FormData)
      .then((response) => response.data);
  };

  updateUser = (userId, data) => {
    console.log(data)
    return this.service
    .put(`/profile/${userId}/update`, data)
    .then((response) => response.data);
  }
   
}

export default UserService;
