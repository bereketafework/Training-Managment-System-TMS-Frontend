
<template>

    <!-- Navigation Buttons -->
 <div class="w-full h-full ">
  <div class="w-full ">
   <v-card class="flex-col flex">
     <v-btn class="m-2" color="blue" variant="text"  :to="{ name: 'UserRole' }">userRore</v-btn>
     <v-btn
       class="m-2"
       color="blue"
       variant="text"
       :to="{ name: 'PayMethod' }"
     >
     paymentMethod
     </v-btn>
     <v-btn class="m-2 disabled:"  color="blue" variant="text"  :to="{ name: 'TeamRole' }"> teamRole</v-btn>
     <v-btn class="m-2 disabled:"  color="blue" variant="text"  :to="{ name: 'Category' }"> Category</v-btn>
   </v-card>
  </div>
 <router-view></router-view>
</div>
</template>



<script>
export default {

}
</script>

<style>

</style>