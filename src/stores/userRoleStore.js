import api from "@/service/api";
import { defineStore } from "pinia";
export const useUserRoleStore = defineStore("UserRole", {
  actions: {
    detailsUserRole(SelectedUserRoleId) {
      return api
        .post(`/userrole/search/${SelectedUserRoleId}`, {})
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    deleteUserRole(SelectedUserRoleId) {
      return api
        .post(`/userrole/delete/${SelectedUserRoleId}`, {})
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    updateUserRole([SelectedUserRoleId, Role]) {
      return api
        .post(`/userrole/update/${SelectedUserRoleId}`, {
          Role: Role,
        })
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    createUserRole(Role) {
      return api
        .post(`/userrole/create`, {
          Role: Role,
        })
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    allUserRole() {
      return api
        .get("/userrole/all")
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
});
