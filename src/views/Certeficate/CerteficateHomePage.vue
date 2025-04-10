<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div>
      <v-overlay v-model="overlay" class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span
            class="flex justify-center border-b-[1px] text-3xl mt-2 border-black"
          >
            Certificate Creation Form
          </span>

          <v-form ref="form" @submit.prevent="createCertificate" class="m-3">
            <v-container
              fluid
              class="border-[1px] border-gray-200 !flex !w-[800px] !rounded-lg"
            >
              <v-row>
                <v-col cols="20" sm="10">
                  <v-select
                    v-model="selectedTrainingId"
                    class="w-[700px]"
                    clearable
                    chips
                    label="Select Training"
                    :items="trainingList"
                    item-title="Training_name"
                    item-value="id"
                    variant="outlined"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field
                    v-model="Title"
                    variant="outlined"
                    color="black darken-2"
                    label="Title"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="20" sm="10">
                  <v-textarea
                    class="w-[700px]"
                    clearable
                    chips
                    label="Certificate  Description"
                    v-model="Description"
                    variant="outlined"
                  ></v-textarea>
                </v-col>

                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="IssueDate"
                    color="black darken-2"
                    label="Issue Date"
                    type="date"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="ExpireDate"
                    color="black darken-2"
                    label="Expire  Date"
                    type="date"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-card-actions class="flex justify-between !w-[700px]">
                  <div>
                    <v-btn text @click="goBack">Back</v-btn>
                    <v-btn text @click="resetForm">Clear</v-btn>
                  </div>

                  <v-btn text color="primary" type="submit" variant="outlined">
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      size="20"
                    ></v-progress-circular>
                    Create
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>
    <!-- <v-overlay v-model="certificate" class="flex justify-center items-center">
    <v-container fluid class="bg-white rounded-lg">
      <primary-button
        color="white"
        prepend-icon="mdi-printer-outline"
        size="large"
        class="rounded-lg !bg-blue-500 p-1"
        variant="outlined"
        name="Print"
        @click="printCertificate"
      />
      <div class="flex flex-col justify-center items-center w-full h-full">
        <div class="border-2 border-black w-[1300px] h-[700px] p-2 rounded-lg">
          <div
            class="border-2 h-[100px] flex flex-row justify-between rounded-lg col-span-3 bg-gray-500"
          >
            <div class="flex justify-center items-center">
              <img
                src="https://ehr.chs.edu.et/assets/logo-BFYeEqU2.png"
                class="w-full h-full"
              />
            </div>
            <div>
              <h1
                class="text-5xl font-mono flex items-center place-content-center"
              >
                Training Managment System
              </h1>
            </div>
            <div class="flex justify-center items-center">
              <img
                src="https://ehrs.chs.edu.et/public/logos/institutionlogo-login.png"
                alt="logo"
                width="250"
                max-height="40"
                class="-mt-1 w-full h-full"
              />
            </div>
          </div>
          <div class="flex justify-center items-center mt-10">
            <strong>
              <h1 class="text-6xl font-mono">{{ trainingList[1

              ].Training_name+" "  }} Certificate{{ }}</h1></strong
            >
          </div>
          <div class="flex justify-center items-center mt-2">To: <strong> Test User</strong></div>
          <div class="flex m-16 items-center">
            <!-- <strong>
              <h1 class="text-2xl font-serif font-normal justify-between">
                This is to certify that<strong> Test User</strong> has
                successfully completed <strong>{{ trainingList[1].Training_name  }}</strong> with an
                attendance percentage of <strong> 100</strong> %.
              </h1></strong
            > --
            {{ trainingList[1].Courses.Course_description }}
          </div>
          <div class="flex justify-center items-center mt-10">
            <strong> <h1 class="text-3xl font-mono">Thank You!!</h1></strong>
          </div>
          <div class="flex justify-between mt-10">
            <strong>
              <h1 class="text-3xl font-mono">
                Date: <strong class="underline"> 2023-06-01</strong>
              </h1></strong
            > <img
              src="https://www.stampjam.com/assets/images/templates/t0099/v3.webp"
              class="h-[100px]"
            />
            <strong>
              <h1 class="text-3xl font-mono">
                Signature:
                <strong class="underline"> ------------------</strong>
              </h1></strong
            >
          </div>
          <div class="flex justify-center items-center">
           
          </div>
        </div>
      </div>
    </v-container>
  </v-overlay> -->
    <div>
      
      <v-toolbar flat>
        <primary-button
          color="blue"
          prepend-icon="mdi-plus"
          size="large"
          class="rounded-lg"
          variant="outlined"
          name="Create Certificate"
          @click="handleClick"
        >
        </primary-button>
        <v-toolbar-title class="flex justify-center items-center !text-4xl">
          List of Certificate  
        </v-toolbar-title>
        <v-text-field
          class="bg-transparent"
          v-model="searchQuery"
          append-inner-icon="mdi-magnify"
          color="primary"
          density="comfortable"
          label="Search"
          variant="outlined"
          hide-details
          single-line
          clearable
        ></v-text-field>
        <v-btn
          icon="mdi-filter-outline"
          color="Primary"
          size="large"
          variant="text"
          @click="toggleFilterDialog"
        ></v-btn>
      </v-toolbar>
    </div>
    <v-data-table
    
        :headers="headers"
        :items="allCertificate"
        :search="searchQuery"
        density="compact"
       
      >
    
      <template v-slot:item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                variant="text"
                color="gray-lighten-2"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item @click="certeficateView(item)">View</v-list-item>
              <!-- <v-list-item @click="selectItem(item)">Edit</v-list-item>
              <v-list-item @click="confirmDelete(item)">Delete</v-list-item> -->
            </v-list>
          </v-menu>
        </template>
        
    </v-data-table>
      
  </div>

</template>

<script>
import api from "@/service/api.js";
import { mapActions } from "pinia";
import PrimaryButton from "../../components/PrimaryButton.vue";
import { useTrainingStore } from "@/stores/TrainingStore";
import { h } from "vue";
import { all } from "axios";
import router from "@/router";
// const ListTraining = useTrainingStore();
// console.log(ListTraining);
export default {
  data() {
    return {
      headers: [
        { title: "Title", value: "Title" },
  
        { title: "Issue Date", value: "Issue_date" },
        { title: "Expire Date", value: "Expire_date" },
        { title: "Action", value: "actions", sortable: false },
      ],
      allCertificate: [],
      certificate: false,
      loading: false,
      Title: "",
      Description: "",
      IssueDate: "",
      ExpireDate: "",

      selectedParticipant: {},
      overlay: false,
      trainingList: [],
      selectedTrainingId: [],
    };
  },
  components: {
    PrimaryButton,
  },
  methods: {
    
    certeficateView(item) {
      this.selectedParticipant = item;
  router.push({ name: "CertificateView", params: { id: item.id } });
    },
    Certificates() {
      return api
        .get("/certificate/all")
        .then((response) => {
          this.allCertificate = response.data;
       
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {
      this.$refs.form.reset();
    },
    createCertificate() {
      return api
        .post("/certificate/create", {
          Training_id: this.selectedTrainingId,
          Title: this.Title,
          Description: this.Description,
          Issue_date: this.IssueDate,
          Expire_date: this.ExpireDate,
        })
        .then((response) => {
          this.loading = false;
          this.overlay = false;
          this.refresh();
          this.certificate = true;
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          this.loading = false;
          return Promise.reject(error);
        });
    },
    ...mapActions(useTrainingStore, ["fetchTrainings"]),
    refresh() {
      this.fetchTrainings()
        .then((trainings) => {
          this.trainingList = trainings;
          console.log(this.trainingList);
          this.Certificates();
         
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectTraining(item) {
      this.selectedParticipant = item;
      const all =
        this.selectedTrainingId +
        this.Title +
        this.Description +
        this.IssueDate +
        this.ExpireDate;
      console.log(all);
    },
    goBack() {
      this.overlay = false;
    },

    toggleForm() {
      this.certificate = true;
    },
    handleClick() {
      this.overlay = true;
    },
    printCertificate() {
      window.print();
    },
  },
  mounted() {
    this.refresh();
    this.Certificates();

    // ListTraining.fetchTrainings();
  },
};
</script>

<style></style>
