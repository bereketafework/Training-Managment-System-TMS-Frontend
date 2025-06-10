// import { defineStore } from "pinia";
// import { useRouter } from "vue-router";
// import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the token

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     token: localStorage.getItem("token") || "",
//   }),
//   actions: {
//     logout() {
//       this.token = "";
//       localStorage.removeItem("token");

//       // Use Vue Router to navigate to the login page
//       const router = useRouter();
//       router.push("/login");
//     },
//     checkTokenExpiration() {
//       const token = this.token || localStorage.getItem("token");
//       const router = useRouter(); // Ensure router is accessible
//       if (token) {
//         try {
//           const decodedToken = jwtDecode(token);
//           const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//           if (decodedToken.exp < currentTime) {
//             // Token is expired
//             this.logout();
//             router.push("/login"); // Redirect to login page
//           }
//         } catch (error) {
//           console.error("Error decoding token:", error);
//           this.logout(); // Logout if token is invalid
//           router.push("/login"); // Redirect to login page
//         }
//       } else {
//         this.logout(); // Logout if no token is found
//         router.push("/login"); // Redirect to login page
//       }
//     },
//   },
// });
