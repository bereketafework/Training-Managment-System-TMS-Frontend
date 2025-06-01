import api from "@/service/api";
import { defineStore } from "pinia";
export const useEnrollmentStore = defineStore("Enrollment", {
  actions: {
    createEnrollmentForParticipant([TrainingIds, ParticipantId]) {
      const requests = TrainingIds.map((TrainingId) => {
        return api
          .post("/enrollment/create", {
            Participant_id: ParticipantId,
            Training_id: TrainingId,
          })
          .then((res) => res)
          .catch((err) => {
            console.log("Error", err.response.data.message);
            throw err;
          });
      });
      return Promise.all(requests);
    },
    createEnrollment([TrainingId, ParticipantIds]) {
      const requests = ParticipantIds.map((ParticipantId) => {
        return api
          .post("/enrollment/create", {
            Participant_id: ParticipantId,
            Training_id: TrainingId,
          })
          .then((res) => res)
          .catch((err) => {
            console.log("Error", err.response.data.message);
            throw err;
          });
      });
      return Promise.all(requests);
    },
    enrolledForTraining(TrainingId) {
      return api
        .post("/enrollment/select", {
          tid: TrainingId,
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
