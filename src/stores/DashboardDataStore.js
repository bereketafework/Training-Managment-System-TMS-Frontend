import api from "../service/api";
import { defineStore } from "pinia";

export const useDashboardDataStore = defineStore("dashboardData", {
  state: () => ({
    TrainingData: [],
    ParticipantData: [],
    GuestData: [],
    UserData: [],
    CourseData: [],
  }),
  actions: {
    fetchTrainingData() {
      return api
        .get("/training/all")
        .then((response) => {
          //   this.TrainingData = response.data;
          //   console.log(this.TrainingData);
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    fetchParticipantData() {
      return api
        .get("/participant/allparticipant")
        .then((response) => {
          this.ParticipantData = response.data;
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    fetchGuestData() {
      return api
        .get("/guest/all")
        .then((response) => {
          this.GuestData = response.data;

          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    fetchUserData() {
      return api
        .get("/user/all")
        .then((response) => {
          this.UserData = response.data;

          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    fetchCourseData() {
      return api
        .get("/course/all")
        .then((response) => {
          this.CourseData = response.data;

          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
});
