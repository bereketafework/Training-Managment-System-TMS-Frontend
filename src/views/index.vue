<template>
    <!-- <div class=" w-full h-full flex overflow-hidden"> -->
     <div class=" h-full w-full !border-r-[2.5px] flex overflow-hidden " >

     
        <!-- <div class=" w-16 h-screen !rounded-md items-center min-h-full flex-none !pb-2 overflow-hidden"> -->
          
            <v-list density="compact" nav class="w-16 h-full   p-2 fixed overflow-hidden flex-shrink-0 justify-items-center scroll-m-0 " v-model="drawers">

          <v-list-item class="!flex justify-items-center " color="blue"  prepend-icon="mdi-home-city"  value="home" v-model="drawers" @click="drawers='Home' " :to="{ name: 'Dashboard' }" link  >
            <v-tooltip
        activator="parent"
      >Dashboard</v-tooltip>
         </v-list-item>
          <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-transit-connection-variant" value="training" @click="drawers='Training' " :to="{ name: 'TrainingNav' }" link >
            <v-tooltip
        activator="parent"
      >Training</v-tooltip>
          </v-list-item>
          <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-account-group-outline" value="users" @click="drawers='Users' " :to="{ name: 'Users' }" link > 
            <v-tooltip
        activator="parent"
      >User</v-tooltip>
     </v-list-item>
            <!-- <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-cash-100"  value="payment" @click="drawers='Payment' " :to="{ name: 'PaymentNav' }" link >
              <v-tooltip
        activator="parent"
      >Payment</v-tooltip>
          </v-list-item> -->
          <v-list-item class="!flex justify-items-center"  color="blue" prepend-icon="mdi-bag-checked"  value="resource" @click="drawers='Resources' " :to="{ name: 'Resources' }" link>
            <v-tooltip
        activator="parent"
      >Resource</v-tooltip></v-list-item>
          <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-certificate-outline"  value="certeficate" @click="drawers='Certeficate' " :to="{ name: 'Certificate' }" link >
            <v-tooltip 
        activator="parent"
      >Certificate</v-tooltip> </v-list-item>
          <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-cog-outline"  value="config" @click="drawers='Configuration' " :to="{ name: 'Config' }" link >
            <v-tooltip
        activator="parent"
      >Configuration</v-tooltip>
    </v-list-item>
          <v-list-item class="bottom-0"  color="blue" prepend-icon="mdi-account-tie"  value="profile" @click="drawers= 'Profile' " :to="{ name: 'Profile' }" link >
            <v-tooltip
        activator="parent"
      >Profile</v-tooltip> </v-list-item>
        
          
        </v-list>
        <!-- <div class=" w-16 bottom-0 top-40 overflow-hidden">
          <v-list density="compact" nav class="w-16 p-2 fixed overflow-hidden flex-shrink-0 justify-items-center ">          
          </v-list>  </div> -->
          <router-view></router-view>
        </div>
        <!-- </div> -->

<!-- </div> -->
</template>

<script>

</script>

