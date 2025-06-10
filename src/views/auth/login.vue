<!-- <template>
  <div class="mt-36">
   

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Username"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="username"
      ></v-text-field>

      

      <v-text-field
            v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder=" password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      
       

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
      >
        Log In
      </v-btn>

    
    </v-card>
  </div>
</template> -->

<template>
  <div class="flex justify-center items-center h-screen w-full bg-slate-300 " elevation-15> 
  <v-container>
    <v-card class="pa-5 mx-auto !border-[1px] !border-blue-600 !m-4" max-width="600" height="400">
      <v-card-title ><p class=" m-2 text-4xl flex justify-center items-center font-bold font-serif">Login Page</p></v-card-title>
      <span class="justify-center flex items-center font-extralight"> Please Provide Your Credentials</span>
      <v-card-text class="m-4">
    
        <v-text-field label="Username" v-model="username" required variant="outlined"></v-text-field>
        <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[validatePassword]"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password *"
                  hint="At least 8 characters"
                  variant="outlined"
                  required
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
        <!-- <v-text-field label="Password" v-model="password" type="password" required variant="outlined"></v-text-field> -->
      </v-card-text>
      <!-- <v-card-actions>
        
        <v-btn color="White" class="w-full h-full !bg-slate-600 !text-3xl text-white" @click="login">Login</v-btn> -->
      <!-- </v-card-actions> -->
      <v-card-actions>
        <v-btn
          color=""
          size="large"
          class="rounded-none !flex !justify-center !bg-gray-200 !bottom-0 !text-2xl w-full"
          variant="outlined"
         @click="Logins"
        
        >
          Login</v-btn
        >
        <!-- <v-btn text @click="$router.push('/UserRole')">Go to Registration</v-btn> -->
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" color="red" timeout="3000" top>
      {{ snackbarText }}
      </v-snackbar>
  </v-container>
</div>
</template>


<script>
import axios from 'axios';
import api from "@/service/api"
import { useLoginAuthStore } from '@/stores/loginAuthStore';
import { mapActions } from 'pinia';

export default {
  name: 'LoginPage',
  data() {
    return {
      showPassword: false,
      username: '',
      snackbar: false,
      snackbarText: '',
      password: ''
    };
  },
  computed: {
    // Validates the password length.

    validatePassword() {
      return (v) => {
        if (v.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        return true;
      };
    }
  },
  // mounted() {
  //   // Check if the user is already logged in.
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     this.$router.push('/'); // Redirect to the welcome page.
  //   }
  // },
  methods: {

    ...mapActions(useLoginAuthStore,(["fetchToken"])),
Logins(){
      this.fetchToken([
        this.username,
        this.password
      ]).then((res)=>{
        // console.log('Login successful:', res.data.token);
        // localStorage.setItem("token",  res.data.token);
        this.$router.push( "/");
      })
      .catch((err)=>{
        this.snackbar = true;
        console.log('Login failed:', err);
        this.snackbarText = err|| 'Login failed';
      })
}
    ,
    // async login() {
      
    //   try {
    //     const response = await api.post('/user/login', {
    //       Username: this.username,
    //       Password: this.password
    //     });
    //     // Save the token in localStorage.
    //     localStorage.setItem('token', response.data.token);
    //     // Navigate to the welcome page.
    //     this.$router.push( "/");
    //   } catch (error) {
    //     console.error('Login failed:', error);
    //     // alert(error.response?.data?.message || 'Login failed');
    //     this.snackbar= true
    //     this.snackbarText= error.response?.data.error || 'Login failed';

    //   }
    // }
  }
};
</script>
