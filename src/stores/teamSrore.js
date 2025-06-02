import api from "@/service/api";
import { defineStore } from "pinia";

export const useTeamStore = defineStore("Team", {
  actions: {
    createTeamAssign([UserId, SessionIds, SelectedRoleId]) {
      const requests = SessionIds.map((SessionId) => {
        return api
          .post("/team/create", {
            Session_id: SessionId,
            User_id: UserId,
            Team_role_id: SelectedRoleId,
          })
          .then((res) => res)
          .catch((err) => {
            console.log("Error", err);
            throw err;
          });
      });
      return Promise.all(requests);
    },

    allAsignedTeamsForTraining(selectedTrainingId) {
      return api
        .post(`/team/select`, {
          tid: selectedTrainingId,
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
});
