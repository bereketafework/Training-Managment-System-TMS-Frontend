<template>
 <div class="pt-[5px] !rounded-lg">
      <v-card
        class="!border-[1.5px] !shadow-sm !shadow-slate-600 !rounded-xl flex overflow-hidden !border-blue-500 !border-l-8 h-full"
        v-for="item in Training"
        :key="item"
      >
        <div>
          <div class="flex justify-end ">
         
            <h2
              class="top-0 flex justify-center border-t-0 w-20 border-r-0 border-[1px] ml-2 rounded-b-md border-blue-500 h-fit p-[1px]"
            >
              <p class="m-[1px] flex flex-row justify-start items-center">
                Details
              </p>
            </h2>
          </div>
          <div>
            <p class="m-2">
              <strong>Training Name:</strong> {{ item.Training_name }}
            </p>
          </div>
          <div class="flex flow-row justify-between m-2">
            <p><strong>Location:</strong>{{ item.Training_location }}</p>
            <p><strong>Capacity:</strong> {{ item.Capacity }}</p>
             <p><strong>Mode:</strong> {{ item.Training_mode }}</p>
            <p>
              <strong>Cost:</strong> {{ item.Cost }}
              <span class="font-bold">ETB</span>
            </p>
          </div>
          <div class="flex flex-col justify-between m-2">
            <p>
              <strong> Descriptions:</strong>
              {{ item.Courses.Course_description }}
            </p>
            <p>
              <strong> Objectives:</strong>
              {{ item.Courses.Course_objective }}
            </p>
          </div>
          <div class="flex flow-row justify-between m-2">
            <p>
              <strong>Created by:</strong> {{ item.CreatedBy.First_name }}
              {{ item.CreatedBy.Middle_name }} {{ item.CreatedBy.Last_name }}
            </p>

            <p>
              <strong>Created at:</strong>
              {{ formatDate(item.Courses.Created_at) }}
            </p>

            <p>
              <strong>{{ Guest.length }}:</strong>

              {{ Guest.length > 1 ? "Guests" : "Guest" }}
            </p>

            <div>
              <strong class="m-3">Enrollment</strong>
              <div class="relative flex justify-center items-center">
           <v-progress-circular
                  :model-value="(EnrollmentList.length / item.Capacity) * 100"
                  color="green"
                  size="70"
                  width="10"
                >
                </v-progress-circular> 
           <span
                  class="absolute text-sm font-bold"
                  style="color: var(--v-primary-base)"
                >
                  {{
                    Math.round((EnrollmentList.length / item.Capacity) * 100)
                  }}%
                </span> 
              </div>
            </div>
            <!-- <div> Total Gain Price 
              <span
        
                >
                  {{
                    Math.round((EnrollmentList.length * item.Cost) )
                  }} ETB
                </span> 
            </div> -->
          </div>
        </div>
        <!-- <h2 class="flex flex-row border-blue-500 p-10 rounded-tr-md rounded-bl-lg px-3 py-1 text-whit border-[1px] border-b-[2px] border-t-0 border-r-0 border--500 shadow"> Training Name: <h4> {{  item.Training_name  }}</h4></h2> -->
      </v-card>
    </div>

    <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
</template>
<script>

import { mapActions } from 'pinia';
import { useTrainingStore } from '@/stores/TrainingStore';
import { useGuestAssignStore } from '@/stores/guestAssignStore';
import { useEnrollmentStore } from '@/stores/enrollmentStore';


export default {
  data() {
    return {
      EnrollmentList:[],
    Training:[],
      Guest:[],
      tab: "",
    };

  },
  methods:{
    ...mapActions(useEnrollmentStore,(["enrolledForTraining"])),
    ...mapActions(useGuestAssignStore,(["allAssignedGuestForTraining"])),
    ...mapActions(useTrainingStore,(["selectedTrainingDetail"])),
    enrollment(){
      this.enrolledForTraining(this.$route.params.id)
.then((res)=>{
  this.EnrollmentList=res.data
}).catch((err)=>{

})
    },
    guests(){
      this.allAssignedGuestForTraining(this.$route.params.id)
      .then((res)=>{
        this.Guest=res.data
      }).catch((err)=>[

      ])
    },
  trainingDetails(){
    this.selectedTrainingDetail(this.$route.params.id)
    .then((res)=>{
      this.Training=res.data
    })
  },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
  
  },
  mounted(){
    this.enrollment()
    this.trainingDetails()
    this.guests()
  }
}
</script>
<style>

</style>