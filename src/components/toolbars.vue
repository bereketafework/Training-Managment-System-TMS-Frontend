<template>
  <div class="sticky w-full gap-0">
    <!-- toolbar like search and filter -->
    <v-toolbar class="!w-full !h-16 !rounded-md !ml-4 !overflow-auto">
      <v-btn icon="mdi-plus" color="Primary" size="large" variant="text">
        <v-menu width="300">
          <template v-slot:activator="{ props }">
            <v-btn
              color="Black"
              v-bind="props"
              icon="mdi-plus"
              size="large"
              variant="text"
            >
            </v-btn>
          </template>
          <v-list >
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :prepend-icon="item.icon"
              :to="item.route"
              router
            >
              <router-link :to="item.route" class="flex-grow">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </router-link>
            </v-list-item>
            <v-divider class="border-opacity-100"></v-divider>
          </v-list>
        </v-menu>
      </v-btn>

      <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text">
      </v-btn>

      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        color="primary"
        density="compact"
        label="Search"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
        clearable
        

      ></v-text-field>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
    };
  },
  watch: { 
    '$route'(to) 
    {
       this.updateItems(to.name); }
  },
  created() {
    this.updateItems(this.$route.name);
  },
  methods: {
    updateItems(routeName) {
      if (routeName === 'Users') {
        this.items = [
          { title: 'Add User', icon: 'mdi-account-plus', route: '/UserRegistration' },
          { title: ' Add Participants ', icon: 'mdi-account', route: '/ClickMe' },
          { title: 'Add Guest', icon: 'mdi-account', route: '/ClickMe' },
          { title: 'Attendance', icon: 'mdi-account', route: '/ClickMe2' },
          { title: 'Enrollment', icon: 'mdi-account', route: '/ClickMe2' },
        ];
      } else if (routeName === 'Training' || routeName === 'AddTraining' || routeName === 'AddCource') {
        this.items = [
          { title: 'Add Course', icon: 'mdi-book-plus', route: '/training/addCourse' },
          { title: 'Add Training', icon: 'mdi-book', route: '/training/addTraining' },
          { title: 'Add Training Session', icon: 'mdi-book', route: '/ClickMe' },
          { title: 'Create Team', icon: 'mdi-book', route: '/ClickMe4' },
          { title: 'Assign Team Role', icon: 'mdi-book', route: '/ClickMe4' },
        ];
        
      }
      else if (routeName === 'Payment') {
        this.items = [
          { title: 'Add Sponsors', icon: 'mdi-book-plus', route: '/ClickMe' },
          { title: 'Assign Sponsors', icon: 'mdi-book', route: '/ClickMe' },
          { title: 'Add Payment Method', icon: 'mdi-book', route: '/ClickMe' },
          { title: 'Payments', icon: 'mdi-book', route: '/ClickMe4' },
          { title: 'Allwoance', icon: 'mdi-book', route: '/ClickMe4' },
        ];
        
      }
      else if (routeName === 'Certificate') {
        this.items = [
         
        ];
        
      }
       else if (routeName === 'Resources') {
        this.items = [
          { title: 'Add Resource', icon: 'mdi-account', route: '/ClickMe' },
          { title: 'Add Resource Category', icon: 'mdi-account', route: '/ClickMe' },
          { title: 'Resource Allocation', icon: 'mdi-account', route: '/ClickMe2' },
          
        ];
        
      } else {
        this.items = [];
      }
      
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
Explanation