import api from "@/service/api";
import { defineStore } from "pinia";

export const useParticipantStore = defineStore("participant", {
  actions: {
    searchParticipant(SelectedParticipantId) {
      return api
        .get(`/participant/search/${SelectedParticipantId}`, {})
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    deleteParticipant(SelectedParticipantId) {
      return api
        .post(`/participant/delete/${SelectedParticipantId}`, {})
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },

    createParticipant([FirstName, MiddleName, LastName, Email, Phone, Gender]) {
      return api
        .post("/participant/create", {
          Firts_name: FirstName,
          Middle_name: MiddleName,
          Last_name: LastName,
          Email: Email,
          Phone: Phone,
          Gender: Gender,
        })
        .then((res) => {
          return Promise.resolve.apply(res);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    },

    updateParticipant([
      SelectedParticipantId,
      FirstName,
      MiddleName,
      LastName,
      Email,
      Phone,
      Gender,
    ]) {
      return api
        .post(`/participant/update/${SelectedParticipantId}`, {
          Firts_name: FirstName,
          Middle_name: MiddleName,
          Last_name: LastName,
          Email: Email,
          Phone: Phone,
          Gender: Gender,
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    allParticipant() {
      return api
        .get("/participant/allparticipant")
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.error(err.response.data);
          return Promise.reject(err);
        });
    },
  },
});
