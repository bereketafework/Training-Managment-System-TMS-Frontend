import api from "@/service/api";
import { defineStore } from "pinia";

export const useGuestStore = defineStore("Guest", {
  actions: {
    allGuest() {
      return api
        .get("/guest/all")
        .then((res) => {
          return Promise.resolve(res);
        })

        .catch((err) => {
          console.log("error:", err);
        });
    },
    createGuest([FirstName, MiddleName, LastName, Qualification, Phone]) {
      return api
        .post("/guest/create", {
          First_name: FirstName,
          Middle_name: MiddleName,
          Last_name: LastName,
          Qualification: Qualification,
          Phone: Phone,
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log("Error", err);
          return Promise.reject(err);
        });
    },
    updateGuest([
      SelectedGuestId,
      FirstNameUpdate,
      MiddleNameUpdate,
      LastNameUpdate,
      QualificationUpdate,
      PhoneUpdate,
    ]) {
      return api
        .post(`/guest/update/${SelectedGuestId}`, {
          First_name: FirstNameUpdate,
          Middle_name: MiddleNameUpdate,
          Last_name: LastNameUpdate,
          Qualification: QualificationUpdate,
          Phone: PhoneUpdate,
        })
        .then((res) => {
          console.table(
            SelectedGuestId,
            FirstNameUpdate,
            MiddleNameUpdate,
            LastNameUpdate,
            QualificationUpdate,
            PhoneUpdate,
          );
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.error("Error:", err);
          return Promise.reject(err);
        });
    },
    deleteGuest(SelectedGuestId) {
      return api
        .post(`/guest/delete/${SelectedGuestId}`, {})
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.error("Error:", err);
          return Promise.reject(err);
        });
    },
  },
});
