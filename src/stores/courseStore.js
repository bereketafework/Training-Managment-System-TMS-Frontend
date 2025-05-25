import api from "@/service/api";
import { defineStore } from "pinia";

export const useCourseStore = defineStore("Course", {
  actions: {
    detailsCourse(SelectedCourseId) {
      return api
        .post(`/course/search/${SelectedCourseId}`)
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    deleteCourse(SelectedCourseId) {
      return api
        .post(`/course/delete/${SelectedCourseId}`)
        .then((res) => {})
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    updateCourse([
      SelectedCourseId,
      Title,
      Prerequests,
      Description,
      Objective,
    ]) {
      return api
        .post(`/course/update/${SelectedCourseId}`, {
          Course_title: Title,
          Prerequests: Prerequests,
          Course_description: Description,
          Course_objective: Objective,
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    createCourse([Title, Prerequests, Description, Objective]) {
      return api
        .post("/course/create", {
          Course_title: Title,
          Prerequests: Prerequests,
          Course_description: Description,
          Course_objective: Objective,
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    allCourse() {
      return api
        .get("/course/all")
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
});
