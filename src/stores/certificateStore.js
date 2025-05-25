import api from "@/service/api";
import { defineStore } from "pinia";
export const useCertificateStore = defineStore("Certificates", {
  actions: {
    createCertificate([
      SelectedTrainingId,
      Title,
      Description,
      IssueDate,
      ExpireDate,
    ]) {
      return api
        .post(`/certificate/create`, {
          Training_id: SelectedTrainingId,
          Title: Title,
          Description: Description,
          Issue_date: IssueDate,
          Expire_date: ExpireDate,
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    Certificates() {
      return api
        .get("/certificate/all")
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
});
