import api from "../service/api";
import { defineStore, mapActions } from "pinia";
import { useLoginAuthStore } from "./loginAuthStore";

export const useDashboardDataStore = defineStore("dashboardData", {
  state: () => ({
    TrainingData: [],
    ParticipantData: [],
    GuestData: [],
    UserData: [],
    CourseData: [],
  }),
  actions: {
    ...mapActions(useLoginAuthStore, ["verifyToken"]),
    fetchTrainingData() {
      if (!this.verifyToken()) {
        // If token is invalid, redirect to login and reject
        window.location.href = "/login";
      }
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
      if (!this.verifyToken()) {
        window.location.href = "/login";
        return Promise.reject("Invalid or expired token");
      }
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
      if (!this.verifyToken()) {
        window.location.href = "/login";
        return Promise.reject("Invalid or expired token");
      }
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
      if (!this.verifyToken()) {
        window.location.href = "/login";
        return Promise.reject("Invalid or expired token");
      }
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
      if (!this.verifyToken()) {
        window.location.href = "/login";
        return Promise.reject("Invalid or expired token");
      }
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
