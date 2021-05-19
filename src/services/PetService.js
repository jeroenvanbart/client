import axios from "axios";
const {REACT_APP_BACKEND_BASE_URL} = process.env;

class PetService {
  constructor() {
    let service = axios.create({
      baseURL: REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });

    this.service = service;
  }

  createPet = (data) =>
    this.service.post("/pet", data).then((response) => response.data);

  getPets = () => this.service.get("/pet").then((response) => response.data);

  getOwnPets = (id) =>
    this.service.get(`${id}/ownpets`).then((response) => response.data);

  //   getOnePet = (petId) =>
  //     this.service.get(`/pet/${petId}`).then((response) => response.data);

  //   updatePet = (petId, data) =>
  //     this.service.put(`/pet/${petId}`, data).then((response) => response.data);

    removePet = (petId) =>
      this.service.delete(`/pet/${petId}`).then((response) => response.data);
}

export default PetService;
