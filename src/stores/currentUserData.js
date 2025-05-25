import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import api from "../service/api";
import { Title } from "chart.js";
export const useCurrentUserStore = defineStore("currentUser", {
  state: () => ({
    me: {},
    name: " ",
    First_name: " ",
    Last_name: " ",
    Middle_name: " ",

    loading: false,
    Username: " ",
    Email: " ",
    Company: " ",
    Phone: " ",
    title: " Test User",
  }),
  actions: {
    async ProfileInfo() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          this.loading = true;
          const decodedToken = jwtDecode(token);

          const userId = decodedToken.id;
          const response = await api.post(`/user/search/${userId}`, {});
          this.me = response.data;
          this.First_name = this.me[0].First_name;
          this.Last_name = this.me[0].Last_name;
          this.Middle_name = this.me[0].Middle_name;

          this.Email = this.me[0].Email;
          this.Username = this.me[0].Username;
          this.Company = this.me[0].Company;
          this.Phone = this.me[0].Phone;
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        console.error("Error decoding token:", error);
      }
    },
  },
});
