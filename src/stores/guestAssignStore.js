import api from "@/service/api";
import { defineStore } from "pinia";

export const useGuestAssignStore = defineStore("GuestAssign", {
  actions: {
    allAssignedGuestForTraining(TrainingId) {
      return api
        .post("/guestassign/selectedassignedguests", { tid: TrainingId })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log("error:", err);
        });
    },
    createGuestAssign([GuestId, SessionIds, TrainingId]) {
      const requests = SessionIds.map((SessionId) => {
        return api
          .post("/guestassign/assignguest", {
            Session_id: SessionId,
            Guest_id: GuestId,
            Training_id: TrainingId,
          })
          .then((res) => res)
          .catch((err) => {
            console.log("Error", err);
            throw err;
          });
      });
      return Promise.all(requests);
    },
  },
});
