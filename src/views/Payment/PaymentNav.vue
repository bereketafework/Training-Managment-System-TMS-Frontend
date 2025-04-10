
<template>

    <!-- Navigation Buttons -->
 <div class="w-full h-full ">
  <div class="w-full ">
   <v-card class="flex-col flex">
     <v-btn class="m-2" color="primary" variant="text"  :to="{ name: 'Payments' }">Payment</v-btn>
     <v-btn
       class="m-2"
       color="primary"
       variant="text"
       :to="{ name: 'Sponsor' }"
     >
     Sponsor
     </v-btn>
     <v-btn class="m-2 disabled:"  color="primary" variant="text"  :to="{ name: 'Allowance' }"> Allowance</v-btn>
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