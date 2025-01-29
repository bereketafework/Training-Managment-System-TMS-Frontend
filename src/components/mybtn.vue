 <template>

  
<!-- <div class="flex justify-center bg-transparent text-3xl content-center text-gray-500 font-semibold font-mono h-12 ">{{ drawers}} 
  
</div> -->
     
        <!-- <div class="flex flex-row w-full h-fit !rounded-md !border-r-[2.5px] "> -->
          
          <v-list density="compact" nav class="!w-fit fixed flex-shrink-0 justify-items-center " v-model="drawers">
            
          <v-list-item class="!flex justify-items-center " color="blue"  prepend-icon="mdi-home-city"  value="home" v-model="drawers" @click="drawers='Home' " :to="{ name: 'Dashboard' }" link  >     </v-list-item>
          <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-transit-connection-variant" value="training" @click="drawers='Training' " :to="{ name: 'Training' }" link ></v-list-item>
          <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-account-group-outline" value="users" @click="drawers='Users' " :to="{ name: 'Users' }" link >  </v-list-item>
            <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-cash-100"  value="payment" @click="drawers='Payment' " :to="{ name: 'Payment' }" link >
          </v-list-item>
          <v-list-item class="!flex justify-items-center"  color="blue" prepend-icon="mdi-bag-checked"  value="resource" @click="drawers='Resources' " :to="{ name: 'Resources' }" link>
          </v-list-item>
          <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-certificate-outline"  value="certeficate" @click="drawers='Certeficate' " :to="{ name: 'Certificate' }" link >
          </v-list-item>
          <v-list-item class="!flex justify-items-center "  color="blue" prepend-icon="mdi-cog-outline"  value="config" @click="drawers='Configuration' " :to="{ name: 'Config' }" link >
          </v-list-item>
          <v-list-item class="bottom-0 scroll-mt-10"  prepend-icon="mdi-account-tie"  value="profile" @click="drawers= 'Profile' " :to="{ name: 'Profile' }" link >
          </v-list-item>
          </v-list>

      
       

     
  





        
</template>
  <script setup> 
    import {ref} from'vue'
    
      const drawers = ref('Home')
    
    </script> 
    <script>
    import {ref} from'vue'
    import UserRegistration from '../views/UserRegistration.vue'
  export default {
    data: () => ({
      items: [
        { title: 'Add User ', },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
     
     
    

    }),
  }
</script> 
