<template>
    <v-container fluid>
      <!-- Dashboard Header -->
      <div class="dashboard-header">
        <h1 class="text-center text-3xl mb-4">Dashboard</h1>
      </div>
  
      <!-- Dashboard Summary Cards -->
      <v-row class="mb-8 border-t-2 border-opacity-10">
        <v-col cols="12" md="6">
          <v-card outlined class="!border-b-2 !border-blue-500 roubl !border-l-2 !flex  justify-center  ">
            <div  class="flex justify-center items-center m-2 ">
        <v-icon icon="mdi-account-group-outline " size="50"></v-icon>
    </div>
    <div>

            <v-card-title class="text-center !text-2xl m-2 !font-bold font-serif ">Total Participants</v-card-title>
            <v-card-text class="flex justify-center gap-2">
              <div class="flex justify-bet gap-2">
      
              <h2 class="text-4xl text-center">{{ ParticipantData.length}}</h2>
            </div>
            </v-card-text>
          </div>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-card outlined class="!border-b-2 !border-blue-500 roubl !border-l-2 !flex  justify-center  ">
            <div  class="flex justify-center items-center m-2 ">
        <v-icon icon="mdi-transit-connection-variant " size="50"></v-icon>
    </div>
    <div>

            <v-card-title class="text-center !text-2xl m-2 !font-bold font-serif ">Active Trainings</v-card-title>
            <v-card-text class="flex justify-center gap-2">
              <div class="flex justify-bet gap-2">
      
              <h2 class="text-4xl text-center">{{ TrainingData.length}}</h2>
            </div>
            </v-card-text>
          </div>
          </v-card>
        </v-col>


        <v-col cols="12" md="6">
          <v-card outlined class="!border-b-2 !border-blue-500 roubl !border-l-2 !flex  justify-center  ">
            <div  class="flex justify-center items-center m-2 ">
        <v-icon icon="mdi-account-plus " size="50"></v-icon>
    </div>
    <div>

            <v-card-title class="text-center !text-2xl m-2 !font-bold font-serif ">Total Guests</v-card-title>
            <v-card-text class="flex justify-center gap-2">
              <div class="flex justify-bet gap-2">
      
              <h2 class="text-4xl text-center">{{ GuestData.length }}</h2>
            </div>
            </v-card-text>
          </div>
          </v-card>
         
        </v-col>
        <v-col cols="12" md="6">
        <v-card outlined class="!border-b-2 !border-blue-500 roubl !border-l-2 !flex  justify-center  ">
            <div  class="flex justify-center items-center m-2 ">
        <v-icon icon="mdi-account " size="50"></v-icon>
    </div>
    <div>

            <v-card-title class="text-center !text-2xl m-2 !font-bold font-serif ">Total Users</v-card-title>
            <v-card-text class="flex justify-center gap-2">
              <div class="flex justify-bet gap-2">
      
              <h2 class="text-4xl text-center">{{ UserData.length }}</h2>
            </div>
            </v-card-text>
          </div>
          </v-card>
        </v-col>

      </v-row>

      <div> 
        
      </div>
      
      <!-- <MiniCard
    
     v-for="UserData in UserData" :key="UserData.id" 
     :name=UserData.First_name /> -->
    </v-container>
  </template>
  
  <script>
import { mapActions } from 'pinia';
import { useDashboardDataStore } from '@/stores/DashboardDataStore';
import Chart from 'chart.js/auto';
import MiniCard from '@/components/MiniCard.vue';
import { useUserStore } from '@/stores/userStore';

  export default {
    components: {
    MiniCard
    },
    data: () => ({
      participants: [
        // Example participant data
        { first_name: "John", last_name: "Doe", trainings_attended: 3 },
        { first_name: "Jane", last_name: "Smith", trainings_attended: 5 },
        { first_name: "Emily", last_name: "Jones", trainings_attended: 2 },
      ],
      trainings: [
        // Example training data
        { name: "Leadership Skills", venue: "AAU", participants: 50 },
        { name: "Effective Communication", venue: "TASH", participants: 30 },
      ],
      TrainingData: [],
      ParticipantData: [],
      GuestData: [],
      UserData: [],

    }),
    methods: {
      ...mapActions(useDashboardDataStore, ["fetchTrainingData"]),
      ...mapActions(useDashboardDataStore, ["fetchParticipantData"]),
      ...mapActions(useDashboardDataStore, ["fetchGuestData"]),
      // ...mapActions(useDashboardDataStore, ["fetchUserData"]),
      ...mapActions(useUserStore,["allUsers"]),
      user() {
        this.allUsers().then((res) => {
          this.UserData = res.data
        })
      },
      guest() {
        this.fetchGuestData().then((GuestData) => {
          this.GuestData = GuestData
  
        })
      },
      participant() {
        this.fetchParticipantData().then((ParticipantData) => {
          this.ParticipantData = ParticipantData
  
        })
      },
      Training(){
        this.fetchTrainingData().then((TrainingData) => {
          this.TrainingData = TrainingData

        })

      }
    },
    mounted() {
      this.Training();
      this.participant();
      this.guest();
      this.user();
    },
  };
  </script>
  
  <style>
  .dashboard-header {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 24px;
  }
  </style>
  