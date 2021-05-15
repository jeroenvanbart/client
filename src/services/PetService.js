import axios from "axios";

class PetService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });

    this.service = service;
  }

  createPet = (data) =>
    this.service.post("/pet", data).then((response) => response.data);

  getPets = () =>
    this.service.get("/pet").then((response) => response.data);

  getOnePet = (petId) =>
    this.service
      .get(`/pet/${petId}`)
      .then((response) => response.data);

  updatePet = (petId, data) =>
    this.service
      .put(`/pet/${petId}`, data)
      .then((response) => response.data);

  removePet = (petId) =>
    this.service
      .delete(`/pet/${petId}`)
      .then((response) => response.data);
}

export default PetService;
