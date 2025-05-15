import Category from "@/views/Configuration/Category.vue";
import api from "../service/api";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => ({}),
  actions: {
    deleteCategory(selectedCategory) {
      return api
        .post(`/category/delete/${selectedCategory}`, {})
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          console.error("Error Deleting:", error);
          return Promise.reject(error);
        });
    },

    createCategory(CategoryName) {
      return api
        .post("/category/create", {
          Name: CategoryName,
        })
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    updateCategories([CategoryName, selectedCategory]) {
      this.loading = true;
      return api
        .post(`/category/update/${selectedCategory}`, {
          Name: CategoryName,
        })
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    fetchCategories() {
      return api
        .get("/category/all")
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    fetchCategoryById(id) {
      return api
        .get(`/category/${id}`)
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
});
