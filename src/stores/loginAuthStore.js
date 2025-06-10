// Pinia authentication store for token extraction, verification, and navigation

import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import router from "@/router";
import api from "@/service/api";

export const useLoginAuthStore = defineStore("loginAuth", {
  state: () => ({
    token: [],
    user: null,
    isAuthenticated: false,
    tokenError: null,
  }),
  actions: {
    fetchToken([UserName, Password]) {
      return api
        .post("/user/login", {
          Username: UserName,
          Password: Password,
        })
        .then((res) => {
          //   this.token = res.data.token;
          localStorage.setItem("token", res.data.token);
          this.token = localStorage.getItem("token"); // Store token in the state

          //   localStorage.setItem("token", this.token);
          //   const tok = localStorage.getItem("token");
          //   console.log("Token stored in localStorage:", tok);
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log("Error fetching token:", err);
          return Promise.reject(err);
        });
    },
    extractToken() {
      this.token = localStorage.getItem("token");
      return this.token;
    },
    // saveToken(token) {
    //   this.token = token;
    //   localStorage.setItem("token", token);
    // },
    verifyToken() {
      try {
        const token = this.extractToken();
        if (!token) {
          this.isAuthenticated = false;
          this.tokenError = "Token missing";
          router.push("/login");
          return false;
        }
        const decoded = jwtDecode(token);
        // Check expiration (exp is in seconds)
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          this.isAuthenticated = false;
          this.tokenError = "Token expired";
          localStorage.removeItem("token");
          router.push("/login");
          return false;
        }
        this.user = decoded;
        this.isAuthenticated = true;
        this.tokenError = null;
        router.push("/");
        return true;
      } catch (err) {
        this.isAuthenticated = false;
        this.tokenError = "Invalid token";
        localStorage.removeItem("token");
        router.push("/login");
        return false;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});
