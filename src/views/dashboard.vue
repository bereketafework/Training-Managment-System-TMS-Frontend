<template>
    <v-container fluid>
      <!-- Dashboard Header -->
      <div class="dashboard-header">
        <h1 class="text-center text-3xl mb-4">Dashboard</h1>
      </div>
  
      <!-- Dashboard Summary Cards -->
      <v-row class="mb-8">
        <v-col cols="12" md="4">
          <v-card outlined>
            <v-card-title>Total Participants</v-card-title>
            <v-card-text>
              <h2 class="text-4xl text-center">{{ totalParticipants }}</h2>
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-card outlined>
            <v-card-title>Active Trainings</v-card-title>
            <v-card-text>
              <h2 class="text-4xl text-center">{{ activeTrainings }}</h2>
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-card outlined>
            <v-card-title>Average Participants per Training</v-card-title>
            <v-card-text>
              <h2 class="text-4xl text-center">{{ avgParticipants }}</h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Reports Section -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card outlined>
            <v-card-title>Top Participants by Training</v-card-title>
            <v-card-text>
              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">First Name</th>
                    <th class="text-left">Last Name</th>
                    <th class="text-left">Trainings Attended</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(participant, index) in topParticipants" :key="index">
                    <td>{{ participant.first_name }}</td>
                    <td>{{ participant.last_name }}</td>
                    <td>{{ participant.trainings_attended }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-card outlined>
            <v-card-title>Training Summary</v-card-title>
            <v-card-text>
              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">Training Name</th>
                    <th class="text-left">Venue</th>
                    <th class="text-left">Participants</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(training, index) in trainingSummary" :key="index">
                    <td>{{ training.name }}</td>
                    <td>{{ training.venue }}</td>
                    <td>{{ training.participants }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
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
    }),
    computed: {
      totalParticipants() {
        return this.participants.length;
      },
      activeTrainings() {
        return this.trainings.length;
      },
      avgParticipants() {
        if (this.trainings.length === 0) return 0;
        const total = this.trainings.reduce(
          (sum, training) => sum + training.participants,
          0
        );
        return Math.round(total / this.trainings.length);
      },
      topParticipants() {
        return this.participants
          .sort((a, b) => b.trainings_attended - a.trainings_attended)
          .slice(0, 5); // Top 5 participants
      },
      trainingSummary() {
        return this.trainings;
      },
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
  