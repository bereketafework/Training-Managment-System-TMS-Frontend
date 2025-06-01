import api from "../service/api";
import { defineStore } from "pinia";

export const useTrainingStore = defineStore("training", {
  state: () => ({
    // trainings: [],
    // allCertificate: [],
    // tid: "",
    // details: [],
    // Mode: "",
  }),
  actions: {
    allTraining() {
      return api
        .get("/training/all")
        .then((response) => {
          //   this.trainings = response.data;
          return Promise.resolve(response);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    createTraining([
      Title,
      Mode,
      Location,
      StartDate,
      EndDate,
      EnrollmentDeadline,
      Capacity,
      Price,
      SelectedCourseId,
    ]) {
      return api
        .post("/training/create", {
          Training_name: Title,
          Training_mode: Mode,
          Training_location: Location,
          Training_start_date: StartDate,
          Training_end_date: EndDate,
          Enrolment_deadline: EnrollmentDeadline,
          Capacity: Capacity,
          Cost: Price,
          Course_id: SelectedCourseId,
        })
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    updateTraining([
      selectedTrainingId,
      TitleUpdate,
      ModeUpdate,
      LocationUpdate,
      StartDateUpdate,
      EndDateUpdate,
      EnrollmentDeadlineUpdate,
      CapacityUpdate,
      PriceUpdate,
      SelectedCourseIdUpdate,
    ]) {
      return api
        .post(`/training/update/${selectedTrainingId}`, {
          Training_name: TitleUpdate,
          Training_mode: ModeUpdate,
          Training_location: LocationUpdate,
          Training_start_date: StartDateUpdate,
          Training_end_date: EndDateUpdate,
          EnrollmentDeadlineUpdate,
          Capacity: CapacityUpdate,
          Cost: PriceUpdate,
          Course_id: SelectedCourseIdUpdate,
        })
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    deleteTraining(selectedTrainingId) {
      return api
        .post(`/training/delete/${selectedTrainingId}`, {})
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
    allCertificate() {
      return api
        .get("/certificate/all")
        .then((response) => {
          console.log(response.data);
          //   this.trainings = response.data;
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    selectedTrainingDetail(selectedTrainingId) {
      return api
        .post(`/training/select`, {
          tid: selectedTrainingId,
        })
        .then((response) => {
          console.log("id:", selectedTrainingId);
          //   this.trainings = response.data;
          return Promise.resolve(response);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    TrainingDetails(selectedTrainingId) {
      return api
        .get(`/training/search/${selectedTrainingId}`, {})
        .then((res) => {
          //   this.trainings = response.data;
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // createCertificate(){
    //   return api.post("/certificate/create"{tid: this.trainings.id}).then((response) => {
    //     return Promise.resolve(response.data);
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     return Promise.reject(error);
    //   });
    // }
  },
});
