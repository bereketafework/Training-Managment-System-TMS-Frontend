<template>
        <!-- <div>
      <v-card>
        <v-btn
          class="m-2"
          color="primary"
          variant="text"
          :to="{ name: '' }"
        >Payments
          
        </v-btn>
        <v-btn class="m-2" color="primary" variant="text"  :to="{ name: '' }">Payment Method</v-btn>
        <v-btn class="m-2" color="primary" variant="text" :to="{ name: '' }" >Sponsors</v-btn>
        <v-btn class="m-2" color="primary" variant="text" :to="{ name: '' }" >Allowance</v-btn>
      </v-card>
    </div> -->
    <div class="  flex flow-row">
     <div class="w-28 h-screen flex flex-col  !rounded-md top-0  ">

     
        <div class=" w-28 gap-2 h-screen !rounded-md !border-r-[2.5px] ">
          
          <v-list density="compact" nav class=" !w-28 !h-full gap-2">
            
          
          <v-list-item color="blue" title="Payment " value="Payment" :to="{ name: '' }" >
        </v-list-item>
          <v-list-item color="blue" title="Sponsor" value="Sponsor"   :to="{ name: '' }"   >
          </v-list-item>
          <v-list-item color="blue lighten-5" title="Allowance" value="Allowance"  :to="{ name: '' }"  >
        </v-list-item>
       
        
          </v-list>

        </div>
        

        </div>
  
    
    <router-view/>
</div>
   
  </template>
 
  <script>
import Cards from '../../components/Cards.vue'
import cards from '../../components/Cards.vue'
  export default {
  components: { Cards },
  
  }
  </script>
  
  <style>
  
  </style>