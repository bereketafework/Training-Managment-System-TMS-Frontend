<template>
    <div class="  flex flow-row">
     <div class="w-40 h-screen mr-0 p-0 flex flex-col col-span-2 !rounded-md top-0  ">

     
        <div class=" w-fit h-screen !rounded-md !border-r-[2.5px] ">
          
          <v-list density="compact" nav class=" !w-fit !h-full gap-2">
            
          
          <v-list-item color="blue" title="User Role " value="userRore" :to="{ name: 'UserRole' }"  >
        </v-list-item>
          <v-list-item color="blue" title="Payment Method " value="paymentMethod"  :to="{ name: 'PayMethod' }" link >
          </v-list-item>
          <v-list-item color="blue" title="Team Role " value="teamRole"  :to="{ name: 'TeamRole' }" link >
        </v-list-item>
        <v-list-item color="blue" title="Category" value="Category" :to="{ name: 'Category' }" link >
        </v-list-item>
          </v-list>

        </div>
        <router-view></router-view>

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