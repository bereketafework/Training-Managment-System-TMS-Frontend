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

          <v-form ref="form" @submit.prevent="certificateCreate" class="m-3">
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
                    label="Select Training *"
                    :items="trainingList"
                    item-title="Training_name"
                    item-value="id"
                    variant="outlined"
                    :rules="[required]"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field
                    v-model="Title"
                    variant="outlined"
                    color="black darken-2"
                    label="Title *"
                    type="text"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="20" sm="10">
                  <v-textarea
                    class="w-[700px]"
                    clearable
                    chips
                    label="Certificate  Description *"
                    v-model="Description"
                    variant="outlined"
                    :rules="[required]"
                  ></v-textarea>
                </v-col>

                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="IssueDate"
                    color="black darken-2"
                    label="Issue Date *"
                    type="date"
                    variant="outlined"
                    :rules="issueDateRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="ExpireDate"
                    color="black darken-2"
                    label="Expire  Date *"
                    type="date"
                    variant="outlined"
                    :rules="expireDateRules"
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

    <div>
      <v-toolbar flat>
        <primary-button
          color="blue"
          prepend-icon="mdi-plus"
          size="large"
          variant="elevated"
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
      </v-toolbar>
    </div>
    <v-data-table
      :headers="headers"
      :items="CertificateList"
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
  <div>
    <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import PrimaryButton from "../../components/PrimaryButton.vue";
import { useTrainingStore } from "@/stores/TrainingStore";
import { useCertificateStore } from "@/stores/certificateStore";
import router from "@/router";
export default {
  data() {
    return {
      headers: [
        { title: "Title", value: "Title" },

        { title: "Issue Date", value: "Issue_date" },
        { title: "Expire Date", value: "Expire_date" },
        { title: "Action", value: "actions", sortable: false },
      ],
      CertificateList: [],
      certificate: false,
      loading: false,
      snackbar1: false,
      snackbarColor1: "",
      Title: "",
      Description: "",
      IssueDate: "",
      ExpireDate: "",
      searchQuery: "",
      selectedParticipant: {},
      overlay: false,
      trainingList: [],
      selectedTrainingId: [],
    };
  },
  components: {
    PrimaryButton,
  },
  computed: {
    required() {
      return (v) => !!v || "This field is required";
    },
    issueDateRules() {
      return [
        (v) => !!v || "Issue Date is required",
        (v) =>
          new Date(v) <= new Date() || "Issue Date must be today or earlier",
      ];
    },
    expireDateRules() {
      return [
        (v) => !!v || "Expire Date is required",
        (v) =>
          new Date(v) >= new Date(this.IssueDate) ||
          "Expire Date must be after Issue Date",
      ];
    },
  },
  methods: {
    ...mapActions(useCertificateStore, ["Certificates", "createCertificate"]),
    certificateCreate() {
      console.warn(this.selectedTrainingId);
      this.createCertificate([
        this.selectedTrainingId,
        this.Title,
        this.Description,
        this.IssueDate,
        this.ExpireDate,
      ])
        .then((res) => {
          this.snackbarMessage1 = "Certificate has Been Created Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data.error || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.overlay = false;
          this.allcerteficates();
        });
    },

    allcerteficates() {
      this.Certificates()
        .then((res) => {
          this.CertificateList = res.data;
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    },

    certeficateView(item) {
      this.selectedParticipant = item;
      router.push({ name: "CertificateView", params: { id: item.id } });
    },

    resetForm() {
      this.$refs.form.reset();
    },

    ...mapActions(useTrainingStore, ["allTraining"]),
    refresh() {
      this.allTraining()
        .then((response) => {
          this.trainingList = response.data;
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
  },
  mounted() {
    this.refresh();
    this.allcerteficates();
  },
};
</script>
