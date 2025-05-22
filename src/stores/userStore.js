import api from "@/service/api";
import { defineStore } from "pinia";

export const useUserStore = defineStore("User", {
  actions: {
    searchUser(SelectedUserId) {
      return api
        .post(`/user/search/${SelectedUserId}`, {})
        .then((res) => {})
        .catch((err) => {});
    },
    deleteUser(SelectedUserId) {
      return api
        .post(`/user/delete/${SelectedUserId}`, {})
        .then((res) => {})
        .catch((err) => {});
    },
    updateUser([
      SelectedUserId,
      FirstName,
      MiddleName,
      LastName,
      Email,
      Phone,
      Company,
    ]) {
      return api
        .post(`/user/update/${SelectedUserId}`, {
          First_name: FirstName,
          Middle_name: MiddleName,
          Last_name: LastName,
          Email: Email,
          Phone: Phone,
          Company: Company,
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    },
    createUser([
      FirstName,
      MiddleName,
      LastName,
      Email,
      Phone,
      Username,
      Password,
      Company,
    ]) {
      return api
        .post("/user/create", {
          First_name: FirstName,
          Middle_name: MiddleName,
          Last_name: LastName,
          Email: Email,
          Phone: Phone,
          Username: Username,
          Password: Password,
          Company: Company,
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log("Error:", err);
          return Promise.reject(err);
        });
    },
    allUsers() {
      return api
        .get("/user/all")
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
});
