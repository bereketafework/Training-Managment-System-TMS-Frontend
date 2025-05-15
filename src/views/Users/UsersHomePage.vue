<template>
    <!-- <div>
      <v-card>
        <v-btn
          class="m-2"
          color="primary"
          variant="text"
          :to="{ name: 'Participant' }"
        >
          Participant
        </v-btn>
        <v-btn class="m-2" color="primary" variant="text"  :to="{ name: 'Enroll' }">Enrollment</v-btn>
        <v-btn class="m-2" color="primary" variant="text" :to="{ name: '' }" >Attendance</v-btn>
        <v-btn class="m-2" color="primary" variant="text" :to="{ name: 'Guest' }" >Guest</v-btn>
      </v-card>
    </div>
    <div>  
      
    </div>
    <router-view/> -->
    <div class="  flex flow-row">
     <div class="w-28 h-screen flex flex-col   top-0  ">

     
        <div class=" w-28 gap-2 h-screen !border-r-[2.5px] ">
          
          <v-list density="compact" nav class=" !w-28 !h-full gap-2">
            
            <v-list-item color="blue" title="User " value="User" :to="{ name: 'userregistration' }"  >
            </v-list-item>
          <v-list-item color="blue" title="Participant " value="Participant" :to="{ name: 'Participant' }"  >
        </v-list-item>
          <v-list-item color="blue" title="Attendance" value="attendance"   :to="{ name: '' }"   >
          </v-list-item>
          <v-list-item color="blue lighten-1" title="Guest" value="Guest"  :to="{ name: 'Guest' }" link >
        </v-list-item>
       
        
          </v-list>

        </div>
        

        </div>
  
    
    <router-view/>
</div>
   
  </template>
  
  <script>

  export default {

  
  }
  </script>
  
  <style>
  
  </style>