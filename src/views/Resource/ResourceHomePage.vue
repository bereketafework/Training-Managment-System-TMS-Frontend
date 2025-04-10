<template>
  
           <!-- <div>
      <v-card>
        <v-btn
          class="m-2"
          color="primary"
          variant="text"
          :to="{ name: '' }"
        >Resources
          
        </v-btn>
    
        <v-btn class="m-2" color="primary" variant="text" :to="{ name: '' }" >Resources Cetegrory</v-btn>
        
      </v-card>
    </div>
    <div>  
      
    </div>
    <router-view/>
    <cards/> -->
    <div class="  flex flow-row">
     <div class="w-28 h-screen flex flex-col  !rounded-md top-0  ">

     
        <div class=" w-28 gap-2 h-screen !rounded-md !border-r-[2.5px] ">
          
          <v-list density="compact" nav class=" !w-28 !h-full gap-2">
            
          
          <v-list-item color="blue" title="Resource " value="Resource" :to="{ name: '' }"  >
        </v-list-item>
          <v-list-item color="blue" title="Assign" value="Assign "   :to="{ name: '' }"   >
          </v-list-item>
          <v-list-item color="blue" title="Enrollment" value="Enrollment "   :to="{ name: '' }"   >
          </v-list-item>
         
       
        
          </v-list>

        </div>
        

        </div>
  
    
    <router-view/>
</div>
   
  </template>
  
  <script>

  </script>
  
  <style>
  
  </style>