import axios from "axios";

class DateService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });

    this.service = service;
  }

  createNeedDate = (id, needdatestart, needdateend) =>
    this.service
      .post(`${id}/needdate`, { needdatestart, needdateend })
      .then((response) => {});

  createAvDate = (id, avdatestart, avdateend) =>
    this.service
      .post(`${id}/avdate`, { avdatestart, avdateend })
      .then((response) => {});

  getOwnAvDates = (id) =>
    this.service.get(`${id}/avdate`).then((response) => response.data);

  getOwnNeedDates = (id) =>
    this.service.get(`${id}/needdate`).then((response) => response.data);

  getAllAvDates = (id) =>
    this.service.get(`${id}/allavdate`).then((response) => response.data);

  //   getOwnPets = (id) =>
  //     this.service.get(`${id}/ownpets`).then((response) => response.data);

  //   getOnePet = (petId) =>
  //     this.service.get(`/pet/${petId}`).then((response) => response.data);

  //   updatePet = (petId, data) =>
  //     this.service.put(`/pet/${petId}`, data).then((response) => response.data);
  removeNeedDate = (DateId) =>
  this.service.delete(`/needdate/${DateId}`).then((response) => response.data);

  removeAvDate = (DateId) =>
    this.service.delete(`/avdate/${DateId}`).then((response) => response.data);
}

export default DateService;
