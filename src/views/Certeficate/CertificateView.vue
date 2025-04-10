<template>
   <div class="w-full h-full flex justify-center items-center bg-gray-100 overflow-hidden">
        <div class="w-full h-full flex justify-center items-center">
            <v-container fluid class="bg-white rounded-lg w-full h-full font-serif">

      <div class="flex flex-col justify-center items-center w-full h-full ">
        <div class="border-2 border-black w-full h-full p-2 rounded-lg">
          <div
            class="border-2 h-[100px] flex flex-row justify-between rounded-lg col-span-3 "
          >
            <div class="flex justify-center items-center m-1">
              <img
                src="https://ehr.chs.edu.et/assets/logo-BFYeEqU2.png"
                class="w-full h-full"
              />
            </div>
            <div class="flex justify-center items-center m-1">
              <h1
                class="text-5xl font-sarif flex justify-center items-center font-bold  "
              >
              Certificate of Completion
              </h1>
            </div>
            <div class=" m-1"> <img src="https://ehrs.chs.edu.et/public/logos/institutionlogo.png" class="w-full h-full"/> 
            
            </div>
           
           </div>
           <div v-if="certificateData[0]" class="flex justify-center items-center m-4 w-full h-full"> 
<h2 class="text-3xl "> {{ certificateData[0].Title }}</h2>
            </div>
            <div class="flex justify-center items-center m-4 text-3xl"> To: _____________________________ </div>
            <div v-if="certificateData[0]" class="flex mt-auto justify-start text-2xl items-center">
              {{ certificateData[0].Description }}
            </div>
            <div v-if="certificateData[0]" class="flex justify-between m-4 "><strong> Issue Date: {{ certificateData[0].Issue_date }} </strong> 
                <img src="https://www.stampjam.com/assets/images/templates/t0099/v3.webp" class=" w-32 bg-transparent"/>
   <strong v-if="certificateData[0]"> Expire Date: {{ certificateData[0].Expire_date }}  </strong> 
        </div>
           </div>
     
           <div>
            </div>
      </div>
    </v-container>
        </div>
    <div>

        </div>
    </div>
</template>
<script>
import api from '@/service/api.js'
export default {
    data() {
        return {
            certificateData: [],
        };
    },
   
    methods:{
        certeficate(){
            const tid = this.$route.params.id;
   return api.post('/certificate/select', { tid: tid })

        .then((response) => {
          this.certificateData = response.data;
          console.log(this.certificateData);
          return response.data;
          
        })
        .catch((error) => {
          console.error(error);
        });
  
        },
     
    },
    mounted() {
        this.certeficate();
    }

};
</script>