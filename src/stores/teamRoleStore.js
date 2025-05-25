import api from "@/service/api";
import { defineStore } from "pinia";
export const useTeamRoleStore = defineStore("TeamRole", {
  actions: {
    detailsTeamRole(SelectedTeamRoleId) {
      return api
        .post(`/teamrole/search/${SelectedTeamRoleId}`, {})
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    deleteTeamRole(SelectedTeamRoleId) {
      return api
        .post(`/teamrole/delete/${SelectedTeamRoleId}`, {})
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    updateTeamRole([SelectedTeamRoleId, Role]) {
      return api
        .post(`/teamrole/update/${SelectedTeamRoleId}`, {
          Team_role: Role,
        })
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    createTeamRole(Role) {
      return api
        .post(`/teamrole/create`, {
          Team_role: Role,
        })
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    allTeamRole() {
      return api
        .get("/teamrole/allteamroles")
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
});
