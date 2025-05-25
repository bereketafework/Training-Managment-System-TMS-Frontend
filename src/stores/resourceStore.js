import api from "@/service/api";
import { defineStore } from "pinia";

export const useResourceStore = defineStore("Resource", {
  actions: {
    detailResource(selectedResource) {
      return api
        .post(`/resource/search/${selectedResource}`, {})
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          console.error("Error Teching:", error);
          return Promise.reject(error);
        });
    },
    deleteResource(selectedResource) {
      return api
        .post(`/resource/delete/${selectedResource}`, {})
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          console.error("Error Deleting:", error);
          return Promise.reject(error);
        });
    },

    createResource([Name, selectedCategoryId]) {
      return api
        .post("/resource/create", {
          Name: Name,
          Category_id: selectedCategoryId,
        })
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    updateResource([selectedResource, Name, selectedCategoryId]) {
      this.loading = true;
      return api
        .post(`/resource/update/${selectedResource}`, {
          Name: Name,
          Category_id: selectedCategoryId,
        })
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    allResource() {
      return api
        .get("/resource/all")
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {});
    },
  },
});
