import TrainingDetails from "@/views/Training/TrainingDetails.vue";
import api from "../service/api";
import { defineStore } from "pinia";
import { all } from "axios";

export const useTrainingStore = defineStore("training", {
  state: () => ({
    trainings: [],
    allCertificate: [],
    tid: "",
    details: [],
    Mode: "",
  }),
  actions: {
    fetchTrainings() {
      return api
        .get("/training/all")
        .then((response) => {
          //   this.trainings = response.data;
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    allCertificate() {
      return api
        .get("/certificate/all")
        .then((response) => {
          console.log(response.data);
          //   this.trainings = response.data;
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    // TrainingDetails() {
    //   return api
    //     .post("/training/search", { tid: this.tid })
    //     .then((response) => {
    //       //   this.trainings = response.data;
    //       return Promise.resolve(response.data);
    //     })
    //     .catch((error) => {
    //       return Promise.reject(error);
    //     });
    // },
    // createCertificate(){
    //   return api.post("/certificate/create"{tid: this.trainings.id}).then((response) => {
    //     return Promise.resolve(response.data);
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     return Promise.reject(error);
    //   });
    // }
  },
});
