<!-- <template>
  <div class="flex flex-col">
    <div>
  <v-card>
    
    
    <v-btn class="m-2  " color="primary" variant="text   " :to="{ path: '/training/courseHome' }">Course</v-btn>
    
    <v-btn class="m-2  " color="primary" variant="text " >Training Session</v-btn>
    
    <v-btn class="m-2  " color="primary" variant="text ">Team</v-btn>
    

    
  </v-card>
  </div>
        
  <div class="flex flex-row mt-2 ">
      <!-- Button to toggle overlay 
      <router-view/>
      <v-btn
              color="blue"
              v-bind="props"
              icon="mdi-plus"
              size="large"
              variant="text"
               @click="overlay = !overlay"
            >
            </v-btn>
  
      <!-- Overlay with form
      <v-overlay v-model="overlay" class="!flex !justify-center items-center ">
       
        <v-card flat class="bg-slate-300 " >
      <span class="flex justify-center border-b-[1px] text-3xl ">Course Registration Form</span>
      <v-snackbar
        v-model="snackbar"
        absolute
        top
        right
        color="success"
       
      >
        <span>Registration successful!</span>
        <v-icon dark>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-snackbar>
      <v-form
        ref="form"
        @submit.prevent="submit"
      
      >
        <v-container fluid  class="border-[1px] border-gray-200 !w-[900px]"  >
          
          <v-row   class="!flex !flex-col  !col-span-2   ">
            <v-col
            cols="14"
            sm="10">
              <v-text-field
                v-model="form.Title"
                :rules="rules.Titile"
                color="black darken-2"
                label="Course Title"
                required
              ></v-text-field>
             </v-col>
             <v-col
        cols="14"
        sm="10"
      >
        <v-textarea
        v-model="form.Description"
        :rules="rules.Description"
          label="Course Descriptions"
          row-height="30"
          rows="3"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-col>
      <v-col
        cols="14"
        sm="10"
      >
        <v-textarea
        v-model="form.Prerequest"
        :rules="rules.Prerequest"
          label="Prerequest"
          row-height="20"
          rows="2"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-col>
      <v-col
        cols="14"
        sm="10"
      >
        <v-textarea
        v-model="form.Objective"
        :rules="rules.Objective"
          label="Course Objective"
          row-height="20"
          rows="2"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-col> <v-card-actions>
        <v-btn
            text
            @click="goBack"
          >
            Back
          </v-btn>
          <v-btn
            text
            @click="resetForm"
          >
            Clear
          </v-btn>
         
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!formIsValid"
            text
            color="primary"
            type="submit"
          >
            Register
          </v-btn>
        </v-card-actions>
      
               </v-row>
        </v-container>
       </v-form>
   
    </v-card>
      </v-overlay>
   
            
        
     
      <v-spacer></v-spacer>
      <span class="flex justify-center border-b-[1px] text-3xl ">List of Training</span>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text">
      </v-btn>

     

    </div>
   
  <div>

    
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Training Name
        </th>
        <th class="text-left">
          Price 
        </th>
        <th class="text-left">
          Status
        </th><th class="text-left">
          Venue
        </th><th class="text-left">
          Capacity
        </th><th class="text-left">
          No. Tranee
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.price }} ETB</td>
        <td>
          <v-chip color="green">
      
    {{ item.status }}</v-chip></td>
        <td>{{ item.Venue }}</td>
        <td>{{ item.capacity }}</td>
        <td>{{ item.tranee }}</td>
        
      </tr>
    </tbody>
  </v-table>
  <router-view></router-view>
  </div>
</div>

</template>
<script>
import CourseHomePage from './CourseHomePage.vue';
import TraininigRegistration from './TraininigRegistration.vue'
const defaultForm = Object.freeze({
          Titile: '',
          Description: '',
          Prerequest: '',
          Objective: '',
          
        })

  export default {
    
  components: { TraininigRegistration },
    data: () => ({
      overlay: false,
          form: Object.assign({}, defaultForm),
          rules: {
           
            Description: [val => (val || '').length > 0 || 'This field is required'],
            Titile: [val => (val || '').length > 0 || 'This field is required'],
            Objective: [val => (val || '').length > 0 || 'This field is required'],
            Prerequest: [val => (val || '').length > 0 || 'This field is required'],
        
          },
          snackbar: false,
      currentItem: 'tab-Web',
      items: [
        'Course', 'Training Session', 'Team', 'Images',
        
      ],
      desserts: [
          {
            name: 'Frozen Yogurt',
            price: 200,
            status: 'Active',
            Venue: 'AAU',
            capacity: 100,
            tranee:70,

          },
          {
            
            name: 'Frozen Yogurt',
            price: 300,
            status: 'Active',
            Venue: 'TASH',
            capacity: 50,
            tranee:50,
          },
          ]
    
    }),
    computed: {
        formIsValid () {
          return (
            this.form.Description &&
            this.form.Prerequest &&
            this.form.Objective
          )
        },
        
     
      },

    methods: {
      resetForm () {
          this.form = Object.assign({}, this.defaultForm)
          this.$refs.form.reset()
        },
        submit () {
          this.snackbar = true
           this.$refs.form.reset();
        },
        goBack() {
             this.$router.go(-1)},
      addItem (item) {
        const removed = this.items.splice(0, 1)
        this.items.push(
          ...this.more.splice(this.more.indexOf(item), 1),
        )
        this.more.push(...removed)
        this.$nextTick(() => { this.currentItem = 'tab-' + item })
      },
    },
  }
</script>

<style>

</style> -->

<template>
 <!-- <div class=" w-full flex flex-col">
        Navigation Buttons
    <div>
      <v-card>
         <v-btn class="m-2" color="primary" variant="text"  :to="{ name: 'Trainings' }">Trainings</v-btn>
        <v-btn
          class="m-2"
          color="primary"
          variant="text"
          :to="{ name: 'CourseHome' }"
        >
          Course
        </v-btn>
        <v-btn class="m-2" color="primary" variant="text"  :to="{ name: 'Sessions' }">Training Session</v-btn>
        <v-btn class="m-2" color="primary" variant="text" :to="{ name: '' }" >Team</v-btn>
      </v-card>
    </div>
    <div class="w-full h-full">
      <router-view  class="w-full h-full" > </router-view>
 
    
  </div> -->
  <div class="   flex flow-row">
     <div class="w-24 h-screen  flex flex-col  !rounded-md top-0  ">

     
        <div class=" w-24 gap-2 h-screen !rounded-md !border-r-[2.5px] ">
          
          <v-list density="compact" nav class=" !w-fit !h-full gap-2">
            
            <v-list-item color="blue" title="Training " value="Training" :to="{ name: 'Trainings' }" >
            </v-list-item>
          <v-list-item color="blue" title="Course " value="Course" :to="{ name: 'CourseHome' }" >
        </v-list-item>
          <v-list-item color="blue" title="Sessions" value="Session"  :to="{ name: 'Sessions' }"  >
          </v-list-item>
          <v-list-item color="blue lighten-1" title="Team" value="Team" :to="{ name: 'Team' }" link >
        </v-list-item>
       
        
          </v-list>

        </div>
        

        </div>
  
    
    <router-view class="!w-full"/>
</div>
   
 
  
</template>

<script>
import sessions from'./TrainingSessionHomePage.vue'
export default {
  components:{sessions},
  data: () => ({
    
    overlay: false,
    snackbar: false,
    form: {
      Title: '',
      Description: '',
      Prerequest: '',
      Objective: '',
    },
    rules: {
      Description: [(val) => (val || '').length > 0 || 'This field is required'],
      Titile: [(val) => (val || '').length > 0 || 'This field is required'],
      Objective: [(val) => (val || '').length > 0 || 'This field is required'],
      Prerequest: [(val) => (val || '').length > 0 || 'This field is required'],
    },
    desserts: [
      {
        name: 'Frozen Yogurt',
        price: 200,
        status: 'Active',
        Venue: 'AAU',
        capacity: 100,
        trainee: 70,
      },
      {
        name: 'Frozen Yogurt',
        price: 300,
        status: 'Active',
        Venue: 'TASH',
        capacity: 50,
        trainee: 50,
      },
    ],
  }),
  computed: {
    formIsValid() {
      return (
        this.form.Description &&
        this.form.Prerequest &&
        this.form.Objective &&
        this.form.Title
      );
    },
  },
  methods: {
    resetForm() {
      this.form = {
        Title: '',
        Description: '',
        Prerequest: '',
        Objective: '',
      };
      this.$refs.form.reset();
    },
    submit() {
      this.snackbar = true;
      this.resetForm();
    },
    goBack() {
      this.$router.go(-1);
    },
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

<style>
</style>
