
<template>

    <!-- Navigation Buttons -->
 <div class="w-full h-full ">
  <div class="w-full ">
   <v-card class="flex-col flex !rounded-none">
     <v-btn class="m-2" color="blue" variant="text"  :to="{ name: 'Resources' }">Resource</v-btn>
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