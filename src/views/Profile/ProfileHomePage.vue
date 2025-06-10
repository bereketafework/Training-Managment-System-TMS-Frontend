<template>
  <div class="flex w-full h-full !font-roboto">
    <div class="w-full h-full flex flex-col justify-between">
      <div class="flex flex-col gap-3 m-4  lg:flex-row ">
        <div
          class="flex flex-col border-[1px] border-l-4 h-full w-full !border-black !bg-neutral-100 rounded-lg"
        >
          <div
            class="text-3xl flex justify-center items-center border-b-2 border-black"
          >
            <h1 class="text-4xl font-extralight text-slate-400 font-mono u">
              User Information
            </h1>
          </div>
          <div>
            <div class="w-full flex flex-col gap-5 h-full">
              <p><strong>First Name:</strong> {{ Store.First_name }}</p>
              <p><strong>Middle Name:</strong> {{ Store.Middle_name }}</p>
              <p><strong> Last Name: </strong> {{ Store.Last_name }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-5 py-3">
            <p><strong> Email:</strong> {{ Store.Email }}</p>
            <p><strong>Phone:</strong> {{ Store.Phone }}</p>
            <p><strong> Company:</strong> {{ Store.Company }}</p>
          </div>
        </div>
        <div
          class="flex flex-col border-[1px] border-l-4 h-full w-full !border-black !bg-zink-200 rounded-lg"
        >
      
          <div class="flex flex-col justify-center items-center gap-5  w-full h-full">
            <div class="text-3xl border-b-2 border-black w-full rounded-md justify-center flex"> 
                Change Password 
                
              </div>
            <div class="w-[300px] h-full gap-2 overflow-hidden flex flex-col justify-center items-center">
             
              <div class="flex gap-2   justify-between w-[300px] ">
             
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  class=" "
                  :type="show1 ? 'text' : 'password'"
                  label="Current Password"
                  variant="outlined"
                ></v-text-field>
              </div>
              <div class="flex w-full h-full  justify-between">
              
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  class="!w-20 flex justify-center items-center"
                  :type="show1 ? 'text' : 'password'"
                  label="New Password"
                  variant="outlined"
                  requiredS
                ></v-text-field>
              </div>
              <div class="flex w-full h-full gap-2 justify-between">
             
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  class="w- flex justify-center items-center"
                  :type="show1 ? 'text' : 'password'"
                  label="Confirm Password"
                  variant="outlined"
                ></v-text-field>
              </div>
              
            </div>
            <div class="text-3xl border-t-2 border-slate-100 w-full rounded-md justify-between flex "> 
  
           <primary-button name="submit" color="blue" variant="outlined"/>
           
           <primary-button name="clear" color="red" variant="outlined" @click="clearFields"/>

              </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center h-full w-full">
        <v-btn
          color=""
          prepend-icon="mdi-bank-transfer-out"
          size="large"
          class="rounded-none !flex !justify-center !bg-gray-200 !bottom-0 !text-2xl w-full"
          variant="outlined"
          @click="Out"
          elevation="5"
        >
          Logout</v-btn
        >
      </div>
      <button @click="logout"></button>
    </div>
  </div>
  <!--  
  <div class="w-full h-full flex flex-col !justify-between ">
    <div class="flex flex-col  h-full w-full">
   
    <div class="flex flex-row  justify-start items-start"> 
        <v-chip
        class="ma-2 text-!3xl w-fit !h-14 !bg-blue-500 flex items-center justify-center "
        color="white"
        text-color="primary"
        outlined
      >
        <v-avatar left class="text-xl flex justify-center bg-blue-600">
          <span>{{ Store.First_name?.charAt(0).toUpperCase() }}{{ Store.Middle_name?.charAt(0).toUpperCase() }}</span>
        </v-avatar> </v-chip>
        <p class="text-2xl text-black">
{{ Store.First_name }} {{ Store.Middle_name }} {{ Store.Last_name }}
      </p></div>
   



   
   
    </div>
    </div> -->
    
    <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
</template>
<script>
import { useCurrentUserStore } from "../../stores/currentUserData";
import { jwtDecode } from "jwt-decode";
const Store = useCurrentUserStore();
import api from "@/service/api";
import { storeKey } from "vuex";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { mapActions } from 'pinia';
import { useLoginAuthStore } from "@/stores/loginAuthStore";


export default {
  components: {
    PrimaryButton
  },
  setup() {
    const user = Store.user;

    return { Store };
  },

  data: () => ({}),
  mounted() {
    Store.ProfileInfo();
  },
  methods: {
    ...mapActions(useLoginAuthStore,(["logout"])),
    Out(){
      this.logout();
    this.$router.push("/login");
    },

    clearFields() {
      this.$refs.form.reset();
    },
    // logout() {
    //   localStorage.removeItem("authToken");
    //   this.$router.push("/login");
    // },
  },
};
</script>
