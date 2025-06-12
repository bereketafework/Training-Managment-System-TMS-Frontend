<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex mt-2">
      <v-overlay
        v-model="overlay"
        persistent
        class="!flex !justify-center items-center"
      >
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >Payment Method Registration Form</span
          >
          <v-form
            ref="form"
            @submit.prevent="PaymentMethodCreate"
            v-model="formValid"
          >
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.PaymentMethod"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Payment Method *"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBack">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn :loading="loading" text color="primary" type="submit">
                  Register
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="paymentMethodList"
        :search="searchQuery"
        density="compact"
        sticky
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
              Create</v-btn
            >
            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Payment Method
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
        </template>
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
              <v-list-item @click="selectItem(item)">Edit</v-list-item>
              <v-list-item @click="confirmDelete(item)">Delete</v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn
            color="red"
            text
            @click="paymentMethodDelete"
            :loading="loading"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- form for apply updates -->
    <v-overlay
      v-model="overlayUpdate"
      class="!flex !justify-center items-center"
    >
      <v-card flat class="bg-slate-300">
        <span class="flex justify-center border-b-[1px] text-3xl p-4"
          >Payment Method Update Form</span
        >
        <v-form
          ref="form"
          @submit.prevent="paymentMethodUpdateInfo"
          v-model="formValid"
        >
          <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
            <v-row class="!flex !flex-row">
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.PaymentMethodupdate"
                  :rules="rules.required"
                  color="black darken-2"
                  label="Payment Method *"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text @click="goBack">Back</v-btn>
              <v-btn text @click="resetForm">Clear</v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="primary" type="submit" :loading="loading">
                Update</v-btn
              >
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card>
    </v-overlay>
    <!-- Filter Dialog -->

    <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { usePaymentMethodStore } from "@/stores/paymentMethodStore";
export default {
  data() {
    return {
      headers: [
        { title: "Payment Methods", value: "Methods" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      loading: false,
      overlayUpdate: false,
      snackbarMessage1: "",
      snackbarColor1: "",
      snackbar1: false,
      overlay: false,
      deleteDialog: false,
      searchQuery: "",
      selectedItem: null,
      formValid: false,
      form: {
        PaymentMethod: "",
        PaymentMethodupdate: "",
      },
      rules: {
        required: [(v) => !!v || "This field is required."],
      },

      paymentMethodList: [],
    };
  },

  methods: {
    ...mapActions(usePaymentMethodStore, [
      "allPaymentMethod",
      "createPaymentMethod",
      "deletepaymentmethod",
      "detailspaymentmethod",
      "updatepaymentmethod",
    ]),
    paymentMethodDetails() {
      this.detailspaymentmethod(this.selectedItem.id)
        .then((res) => {})
        .catch((err) => {})
        .finally(() => {});
    },
    paymentMethodDelete() {
      this.deletepaymentmethod(this.selectedItem.id)
        .then((res) => {
          this.snackbarMessage1 =
            "Payment Method has Been Deleted Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 =
            err.response.data.error || err.response.data || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          (this.deleteDialog = false), this.PaymentMethods();
        });
    },
    async paymentMethodUpdateInfo() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        this.snackbarMessage1 = "Please fill all required fields correctly.";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        return;
      }
      this.loading = true;
      this.updatepaymentmethod([
        this.selectedItem.id,
        this.form.PaymentMethodupdate,
      ])
        .then((res) => {
          this.snackbarMessage1 =
            "Payment Method has Been Updated Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 =
            err.response.data.error || err.response.data || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          (this.loading = false),
            (this.overlayUpdate = false),
            this.PaymentMethods();
          this.resetForm();
        });
    },
    async PaymentMethodCreate() {
      // Vuetify 3 validate returns a promise with { valid, errors }
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        this.snackbarMessage1 = "Please fill all required fields correctly.";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        return;
      }
      this.loading = true;
      this.createPaymentMethod(this.form.PaymentMethod)
        .then((res) => {
          this.snackbarMessage1 =
            "Payment Method has Been Created Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 =
            err.response.data.error || err.response.data || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          (this.overlay = false), this.PaymentMethods();
          this.resetForm();
          this.loading = false;
          this.$refs.form.reset();
        });
    },
    PaymentMethods() {
      this.allPaymentMethod()
        .then((res) => {
          this.paymentMethodList = res.data;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data.error || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
    goBack() {
      this.overlay = false;
      this.overlayUpdate = false;
    },

    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = {
        Role: "",
      };
      this.$refs.form.reset();
      this.editIndex = null;
    },

    selectItem(item) {
      this.overlayUpdate = true;
      this.selectedItem = item;
      this.form.PaymentMethodupdate = item.Methods;
    },

    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
      console.log(this.selectedItem.id);
    },
  },
  mounted() {
    this.PaymentMethods();
  },
};
</script>
