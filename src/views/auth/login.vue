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
    <v-card class="pa-5 mx-auto !m-4" max-width="600" height="400">
      <v-card-title ><p class=" m-2 text-4xl flex justify-center items-center font-bold font-serif">Login Page</p></v-card-title>
      <v-card-text class="m-4">
    
        <v-text-field label="Username" v-model="username" required variant="outlined"></v-text-field>
       
        <v-text-field label="Password" v-model="password" type="password" required variant="outlined"></v-text-field>
      </v-card-text>
      <!-- <v-card-actions>
<!--         
        <v-btn color="White" class="w-full h-full !bg-slate-600 !text-3xl text-white" @click="login">Login</v-btn> -->
      <!-- </v-card-actions> -->
      <v-card-actions>
        <v-btn
          color=""
          prepend-icon="mdi-bank-transfer-in"
          size="large"
          class="rounded-none !flex !justify-center !bg-gray-200 !bottom-0 !text-2xl w-full"
          variant="outlined"
         @click="login"
          elevation="5"
        >
          Login</v-btn
        >
        <!-- <v-btn text @click="$router.push('/UserRole')">Go to Registration</v-btn> -->
      </v-card-actions>
    </v-card>
    
  </v-container>
</div>
</template>


<script>
import axios from 'axios';
import api from "@/service/api"

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    // Sends a login request to the backend.
    async login() {
      try {
        const response = await api.post('/user/login', {
          Username: this.username,
          Password: this.password
        });
        // Save the token in localStorage.
        localStorage.setItem('token', response.data.token);
        // Navigate to the welcome page.
        this.$router.push( "/");
      } catch (error) {
        alert(error.response?.data?.message || 'Login failed');
      }
    }
  }
};
</script>
