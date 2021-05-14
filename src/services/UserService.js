import axios from "axios";

class UserService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });

    this.service = service;
  }

  getOneUser = (profileId) =>
    this.service.get(`/profile/${profileId}`).then((response) => response.data);

  updateUser = (profileId, data) =>
    this.service
      .put(`/profile/${profileId}`, data)
      .then((response) => response.data);
}

export default UserService;
