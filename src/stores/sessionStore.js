import api from "@/service/api";
import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", {
  actions: {
    selectedSessionForTraining(SelectedTrainingId) {
      return api
        .post(`/session/select`, { tid: SelectedTrainingId })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    searchSession(SelectedSessionId) {
      return api
        .post(`/session/search/${SelectedSessionId}`, {})
        .then((res) => {})
        .catch((err) => {});
    },
    deleteSession(SelectedSessionId) {
      return api
        .post(`/session/delete/${SelectedSessionId}`, {})
        .then((res) => {})
        .catch((err) => {});
    },
    updateSession([
      SelectedSessionId,
      SelectedTrainingId,
      Topic,
      StartDate,
      EndDate,
    ]) {
      return api
        .post(`/session/update/${SelectedSessionId}`, {
          Training_id: SelectedTrainingId,
          Topic: Topic,
          Session_start_date: StartDate,
          Session_end_date: EndDate,
        })
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    createSession([SelectedTrainingId, Topic, StartDate, EndDate]) {
      return api
        .post("/session/create", {
          Training_id: SelectedTrainingId,
          Topic: Topic,
          Session_start_date: StartDate,
          Session_end_date: EndDate,
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log("Error:", err);
          return Promise.reject(err);
        });
    },
    allSessions() {
      return api
        .get("/session/all")
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
});
