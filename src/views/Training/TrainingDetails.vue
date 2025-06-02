<template>
  <div class="">
    <div>
      <v-toolbar flat class="overflow-x-auto !bg-neutral-100">
        
        <v-tabs
          v-model="currentTab"
          color="primary"
          direction="horizontal"
          class="flex h h-full !justify-between rounded-tl-lg rounded-tr-lg"
        >
         <v-tab
             :to="{ name: 'TrainingDetailsView' }"
            prepend-icon="mdi-eye"
            text="Details"
            value="Details"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
        <!-- <v-tab
        :to="{ name: 'SelectedTraining' }"
            prepend-icon="mdi-webhook"
            text="test"
            value="test"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <v-tab
        :to="{ name: 'TrainingCourse' }"
            prepend-icon="mdi-webhook"
            text="test1"
            value="test"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab> -->
          <v-tab
        :to="{ name: 'TrainingSessions' }"
            prepend-icon="mdi-webhook"
            text="Sessions"
            value="Sessions"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
         

          <v-tab
            :to="{ name: 'TrainingGuestView' }"
            prepend-icon="mdi-account-box-plus-outline"
            text="Guest"
            value="Guest"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>

          <v-tab
            :to="{ name: 'TrainingTeamView' }"
            prepend-icon="mdi-account-multiple"
            text="Team"
            value="Team"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <v-tab
            :to="{ name: 'TrainingEnrollmentView' }"
            prepend-icon="mdi-account-reactivate"
            text="Enrollments"
            value="Enrollments"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <!-- <v-tab
            prepend-icon="mdi-account-cash"
            text="Sponsor"
            value="Sponsor"
           class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <v-tab
            prepend-icon="mdi-cash-fast"
            text="Allwoance"
            value="Allwoance"
           class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab> -->
          <v-tab
            :to="{ name: 'TrainingResourcesView' }"
            prepend-icon="mdi-bag-personal"
            text="resource"
            value="resource"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <v-tab
            :to="{ name: 'TrainingAttendanceView' }"
            prepend-icon="mdi-account-multiple-check-outline"
            text="attendance"
            value="attendance"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
         
    
        </v-tabs>
      </v-toolbar>
    </div>
    <div >
      
      <router-view></router-view>
    </div>
  
   
    <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
  </div>
</template>
<script>


export default {
  data() {
    return {

      currentTab: "Details",
    };
  },
}



</script>



<style></style>
