<!-- <template>
    <v-container fluid>
      <!-- Dashboard Header 
      <div class="dashboard-header text-center">
        <h1 class="text-4xl font-bold mb-4">Dashboard</h1>
        <p class="text-lg text-gray-500">Overview of training performance and participant data</p>
      </div>
  
      <!-- Dashboard Summary Cards 
      <v-row class="mb-8">
        <v-col cols="12" md="4">
          <v-card
            outlined
            class="summary-card gradient-blue text-white text-center"
          >
            <v-card-title class="text-lg font-medium">
              <v-icon class="mr-2 text-2xl">mdi-account-group</v-icon>
              Total Participants
            </v-card-title>
            <v-card-text>
              <h2 class="text-5xl font-bold">{{ totalParticipants }}</h2>
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-card
            outlined
            class="summary-card gradient-purple text-white text-center"
          >
            <v-card-title class="text-lg font-medium">
              <v-icon class="mr-2 text-2xl">mdi-teach</v-icon>
              Active Trainings
            </v-card-title>
            <v-card-text>
              <h2 class="text-5xl font-bold">{{ activeTrainings }}</h2>
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-card
            outlined
            class="summary-card gradient-green text-white text-center"
          >
            <v-card-title class="text-lg font-medium">
              <v-icon class="mr-2 text-2xl">mdi-chart-box</v-icon>
              Avg Participants/Training
            </v-card-title>
            <v-card-text>
              <h2 class="text-5xl font-bold">{{ avgParticipants }}</h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Charts Section
      <v-row>
        <v-col cols="12" md="6">
          <v-card outlined>
            <v-card-title class="font-medium text-lg">
              <v-icon class="mr-2 text-primary">mdi-chart-pie</v-icon>
              Training Participation (Pie Chart)
            </v-card-title>
            <v-card-text>
              <PieChart
                :chart-data="trainingParticipationData"
                :options="chartOptions"
                class="chart-container"
              />
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-card outlined>
            <v-card-title class="font-medium text-lg">
              <v-icon class="mr-2 text-primary">mdi-chart-bar</v-icon>
              Participant Distribution (Bar Chart)
            </v-card-title>
            <v-card-text>
              <BarChart
                :chart-data="participantDistributionData"
                :options="chartOptions"
                class="chart-container"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Reports Section 
             <v-row>
        <v-col cols="12" md="6">
          <v-card outlined>
            <v-card-title class="font-medium text-lg">
              <v-icon class="mr-2 text-primary">mdi-star-circle</v-icon>
              Top Participants
            </v-card-title>
            <v-card-text>
              <v-table dense>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Trainings Attended</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(participant, index) in topParticipants" :key="index">
                    <td>
                      {{ participant.first_name }} {{ participant.last_name }}
                    </td>
                    <td>{{ participant.trainings_attended }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-card outlined>
            <v-card-title class="font-medium text-lg">
              <v-icon class="mr-2 text-primary">mdi-file-table</v-icon>
              Training Summary
            </v-card-title>
            <v-card-text>
              <v-table dense>
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
  import { Pie, Bar } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);
  
  export default {
    components: {
      PieChart: Pie,
      BarChart: Bar,
    },
    data: () => ({
      participants: [
        { first_name: "John", last_name: "Doe", trainings_attended: 3 },
        { first_name: "Jane", last_name: "Smith", trainings_attended: 5 },
        { first_name: "Emily", last_name: "Jones", trainings_attended: 2 },
      ],
      trainings: [
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
        const total = this.trainings.reduce((sum, training) => sum + training.participants, 0);
        return Math.round(total / this.trainings.length);
      },
      topParticipants() {
        return this.participants
          .sort((a, b) => b.trainings_attended - a.trainings_attended)
          .slice(0, 5);
      },
      trainingSummary() {
        return this.trainings;
      },
      trainingParticipationData() {
        return {
          labels: this.trainings.map((training) => training.name),
          datasets: [
            {
              label: "Participants",
              data: this.trainings.map((training) => training.participants),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        };
      },
      participantDistributionData() {
        return {
          labels: this.participants.map(
            (participant) => `${participant.first_name} ${participant.last_name}`
          ),
          datasets: [
            {
              label: "Trainings Attended",
              data: this.participants.map((participant) => participant.trainings_attended),
              backgroundColor: "#36A2EB",
            },
          ],
        };
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
          },
        };
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
  
  .summary-card {
    border-radius: 12px;
    padding: 16px;
  }
  
  .gradient-blue {
    background: linear-gradient(45deg, #2196F3, #21CBF3);
  }
  
  .gradient-purple {
    background: linear-gradient(45deg, #673AB7, #9C27B0);
  }
  
  .gradient-green {
    background: linear-gradient(45deg, #4CAF50, #8BC34A);
  }
  
  .chart-container {
    position: relative;
    height: 300px;
  }
  </style>
   -->
  <template>
    
  <div class="   flex flow-row">
     
  
    
    <router-view class="!w-full"/>
</div>
   
 
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  
  </style>