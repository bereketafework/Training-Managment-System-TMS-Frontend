<template>
  <div class="w-full">
    <!-- Overlay with Form -->
    <v-overlay
      v-model="overlayUpdate"
      class="!flex !justify-center items-center"
    >
      <v-card flat class="w-full">
        <span class="flex justify-center border-b-[1px] text-3xl">
          User Information Update Form
        </span>

        <v-form ref="form" @submit.prevent="userUpdate" variant="outlined">
          <v-container fluid>
            <v-row>
              <!-- First Name -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.first_nameUpdate"
                  variant="outlined"
                  :rules="[rules.required]"
                  label="First Name *"
                  required
                ></v-text-field>
              </v-col>

              <!-- Middle Name -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.middle_nameUpdate"
                  variant="outlined"
                  :rules="[rules.required]"
                  label="Middle Name *"
                  required
                ></v-text-field>
              </v-col>

              <!-- Last Name -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.last_nameUpdate"
                  variant="outlined"
                  :rules="[rules.required]"
                  label="Last Name *"
                  required
                ></v-text-field>
              </v-col>

              <!-- Email -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.emailUpdate"
                  variant="outlined"
                  :rules="[rules.required, rules.email]"
                  label="Email *"
                  required
                ></v-text-field>
              </v-col>

              <!-- Phone Number -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.phoneUpdate"
                  variant="outlined"
                  :rules="[rules.required, rules.numeric]"
                  label="Phone Number *"
                  type="number"
                  required
                ></v-text-field>
              </v-col>

              <!-- Company -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.companyUpdate"
                  :rules="[rules.required]"
                  label="Company *"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions>
            <v-btn text @click="UpdateGoBack">Back</v-btn>
            <v-btn text @click="resetForm">Clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" type="submit" variant="outlined">
              Update
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-overlay>

    <v-overlay
      v-model="overlay"
      persistent
      class="!flex !justify-center items-center"
    >
      <v-card flat class="w-full">
        <span class="flex justify-center border-b-[1px] text-3xl">
          User Registration Form
        </span>

        <v-form ref="form" @submit.prevent="userCreate" variant="outlined">
          <v-container flat>
            <v-row>
              <!-- First Name -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.first_name"
                  variant="outlined"
                  :rules="rules.required"
                  label="First Name *"
                ></v-text-field>
              </v-col>

              <!-- Middle Name -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.middle_name"
                  variant="outlined"
                  :rules="rules.required"
                  label="Middle Name *"
                ></v-text-field>
              </v-col>

              <!-- Last Name -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.last_name"
                  variant="outlined"
                  :rules="rules.required"
                  label="Last Name *"
                  required
                ></v-text-field>
              </v-col>

              <!-- Email -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.email"
                  variant="outlined"
                  :rules="[emailRules]"
                  label="Email *"
                ></v-text-field>
              </v-col>

              <!-- Phone Number -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.phone"
                  variant="outlined"
                  :rules="[phoneRules]"
                  label="Phone Number *"
                  type="number"
                  required
                ></v-text-field>
              </v-col>

              <!-- Username -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.username"
                  variant="outlined"
                  :rules="rules.required"
                  label="Username *"
                  required
                ></v-text-field>
              </v-col>

              <!-- Password -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[validatePassword]"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password *"
                  hint="At least 8 characters"
                  variant="outlined"
                  required
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>

              <!-- Confirm Password -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.confirmPassword"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, passwordMatchRule]"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  label="Confirm Password *"
                  hint="Must match the password"
                  variant="outlined"
                  required
                  @click:append="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>
              </v-col>

              <!-- Company -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.company"
                  :rules="rules.required"
                  label="Company *"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions>
            <v-btn text @click="goBack">Back</v-btn>
            <v-btn text @click="resetForm">Clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!formIsValid"
              text
              color="primary"
              type="submit"
              variant="outlined"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-overlay>

    <!-- User List -->
    <div>
      <v-data-table
        :headers="headers"
        :items="allUsersList"
        :search="searchQuery"
        density="compact"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-btn
              color="blue"
              prepend-icon="mdi-plus"
              size="large"
              variant="elevated"
              @click="toggleForm"
            >
              Create
            </v-btn>
            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Users
            </v-toolbar-title>
            <v-text-field
              class="bg-transparent"
              v-model="searchQuery"
              append-inner-icon="mdi-magnify"
              label="Search"
              variant="outlined"
              hide-details
              single-line
              clearable
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                variant="text"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item @click="selectItem(item)">Edit</v-list-item>
              <v-list-item @click="confirmDelete(item)">Delete</v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
      <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline"
            >Are you sure you want to delete?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deleteDialog = false">Cancel</v-btn>
            <v-btn color="red" text @click="userDetele">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
  </div>
</template>

<script>
import api from "@/service/api";
import { useUserStore } from "@/stores/userStore";
import { mapActions } from "pinia";

export default {
  components: {
    name: "primary-button",
  },

  data() {
    return {
      overlay: false,
      overlayUpdate: false,
      selectedItem: null,
      showPassword: false,
      showConfirmPassword: false,
      searchQuery: "",
      deleteDialog: false,
      form: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
        company: "",
        first_nameUpdate: "",
        middle_nameUpdate: "",
        last_nameUpdate: "",
        emailUpdate: "",
        phoneUpdate: "",
        companyUpdate: "",

      },
      rules: {
        required: [(v) => !!v || "This field is required."],
        email: [(v) => /.+@.+\..+/.test(v) || "Must be a valid email."],
        numeric: [(v) => !isNaN(parseFloat(v)) || "Must be a valid number."],
        password: [
          (v) => !!v || "Password is required.",
          (v) => v.length >= 8 || "Password must be at least 8 characters.",
        ],
      },
      items: [],
      allUsersList:[],
      headers: [
        { title: "First Name", value: "First_name" },
        { title: "Middle Name", value: "Middle_name" },
        { title: "Last Name", value: "Last_name" },
        { title: "Username", value: "Username" },
        { title: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    phoneRules() {
      return (v) => {
        if (!v) return "This field is required";
        if (!/^\d+$/.test(v)) return "Only numeric values allowed";
        if (!v.startsWith("09")) return "Phone number must start with '09...'";
        if ( v.length < 10|| v.length > 10) return "Phone number must be 10 digits long";
        return true;
      };
    },
    numericRules() {
      return (v) => {
        if (!v) return "This field is required";
        if (!/^\d+$/.test(v)) return "Only numeric values allowed";
        return true;
      };
    },
    emailRules() {
      return (v) => {
        if (!v) return "This field is required";
        if (!/.+@.+\..+/.test(v)) return "E-mail must be valid";
        return true;
      };
    },
    validatePassword() {
      return (v) => {
        if (!v) return "Password is required.";
        if (v.length < 8) return "Password must be at least 8 characters.";
        return true;
      };
    },
    passwordMatchRule() {
      return () =>

        this.form.password === this.form.confirmPassword ||
        "Passwords must match.";
    },
    formIsValid() {
      return (
        this.form.first_name &&
        this.form.last_name &&
        this.form.email &&
        this.form.phone &&
        this.form.username &&
        this.form.password &&
        this.form.confirmPassword &&
        this.form.company &&
        this.passwordMatchRule()
      );
    },

  },
  methods: {
    ...mapActions(useUserStore,(["allUsers","createUser","updateUser","deleteUser","searchUser"])),
    userDetails(){
      this.searchUser(this.selectedItem.id)
       .then((res)=>{
        console.table(res.data)
             })
             .catch((err)=>{

             }) .finally(()=>{

})
    },
    userDetele(){
      this.deleteUser(this.selectedItem.id)
 .then((res)=>{
this.snackbarMessage1="User has Been Deleted Succesfully!"
this.snackbarColor1="green"
this.snackbar1=true
             })
             .catch((err)=>{
this.snackbarMessage1=err.response.data.error||"Error"
this.snackbarColor1="red"
this.snackbar1=true
             }) 
             .finally(()=>{
  this.deleteDialog=false
  this.users();
})
    },
    userUpdate(){
      this.updateUser([
      this.selectedItem.id,  
      this.form.first_nameUpdate,
             this.form.middle_nameUpdate,
          this.form.last_nameUpdate,
             this.form.emailUpdate,
             this.form.phoneUpdate])
             .then((res)=>{
this.snackbarMessage1="User has Been Created Succesfully!"
this.snackbarColor1="green"
this.snackbar1=true
             })
             .catch((err)=>{
this.snackbarMessage1=err.response.data.error||"Error"
this.snackbarColor1="red"
this.snackbar1=true
             })
              .finally(()=>{
  this.overlayUpdate=false
  this.resetForm()
  this.users()
})

    },
    userCreate(){
this.createUser( [ this.form.first_name,
           this.form.middle_name,
           this.form.last_name,
          this.form.email,
        this.form.phone,
           this.form.username,
          this.form.password,
         this.form.company])
         .then((res)=>{

          this.snackbarMessage1="User has Been Created Succesfully!"
this.snackbarColor1="green"
this.snackbar1=true
         })
         .catch((err)=>{
           this.snackbarMessage1=err.response.data.error||"Error"
this.snackbarColor1="red"
this.snackbar1=true

         })
         .finally(()=>{
  this.overlay=false
  this.resetForm()
  this.users()
})
    },
    users(){
this.allUsers().then((res)=>{
  this.allUsersList=res.data

}).catch((err)=>{
  console.log(err)
})
    },
    selectItem(item) {
      this.overlayUpdate = true;
      this.selectedItem = item;
      this.form.first_nameUpdate = item.First_name;
      this.form.middle_nameUpdate = item.Middle_name;
      this.form.last_nameUpdate = item.Last_name;
      this.form.emailUpdate = item.Email;
      this.form.phoneUpdate = item.Phone;
      this.form.companyUpdate = item.Company;

    },
    async editItem() {
      try {
        this.loading = true;
        const response = await api.post(
          `/user/update/${this.selectedItem.id}`,
          {
            First_name: this.form.first_nameUpdate,
            Middle_name: this.form.middle_nameUpdate,
            Last_name: this.form.last_nameUpdate,
            Email: this.form.emailUpdate,
            Phone: this.form.phoneUpdate,
          },
        );
        this.snackbarMessage1 = "User has been Updated successfully!";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlayUpdate = false;
        this.fetchData();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      } finally {
        this.loading = false;
      }
    },

    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    async deleteItem() {
      if (!this.confirmDelete) return;

      try {
        this.loading = true;
        const response = await api.post(
          `/user/delete/${this.selectedItem.id}`,
          {},
        );
        this.snackbarMessage1 = "User Deleted successfully!";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;

        this.deleteDialog = false;
        this.fetchData();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.deleteDialog = false;
      } finally {
        this.loading = false;
      }
    },

    toggleForm() {
      this.overlay = !this.overlay;
    },
    goBack() {
      this.overlay = false;
    },
    UpdateGoBack() {
      this.overlayUpdate = false;
    },
    resetForm() {
      this.$refs.form.reset();
    },
    // async createUser() {
    //   try {
    //     const response = await api.post("/user/create", {
    //       First_name: this.form.first_name,
    //       Middle_name: this.form.middle_name,
    //       Last_name: this.form.last_name,
    //       Email: this.form.email,
    //       Phone: this.form.phone,
    //       Username: this.form.username,
    //       Password: this.form.password,
    //       Company: this.form.company
    //     });
    //     this.snackbarMessage1 = "User has been Created Successfully! ";
    //     this.snackbarColor1 = "green";
    //     this.snackbar1 = true;
    //     this.overlay = null;
    //     this.resetForm();
    //     this.overlay = false;
    //   } catch (error) {
    //     console.error(error);
    //     this.snackbarMessage1 = error.response.data;
    //     this.snackbarColor1 = "red";
    //     this.snackbar1 = true;
    //     this.loading = false;
    //   } finally {
    //     this.loading = false;
    //     this.fetchData();
    //   }
    // },
    async fetchData() {
      try {
        const response = await api.get("/user/all");
        this.items = response.data;
      } catch (error) {
        console.error(error);
      }
    },

  },
  mounted() {
    // this.fetchData();
    this.users()

  },
};
</script>
