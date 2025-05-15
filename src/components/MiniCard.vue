<template>
    <v-card outlined class=" !border-blue-500 roubl !border-[1px]   rounded-lg !border-l-4 !flex  justify-center  !flex-col    " :prepend-icon="icon" :color="color" :variant="variant">
   
    <div class="">
        
    <div>
        
            <v-card-title
             class="text-center !text-2xl m-2 !font-bold font-roboto">
            {{  name}}
            </v-card-title>
        </div>
        <div class="flex justify-between w-full h-full ">
            <v-card-title
             class="text-center m-2  font-roboto !text-[15px]">
             {{ SubnameHeader }}:
            {{ Subname }}
            </v-card-title>
        
            <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                variant="text"
                color="gray-lighten-2"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item @click="selectItem">Edit</v-list-item>
              <v-list-item @click="showDeleteDialog()">Delete</v-list-item>
            </v-list>
          </v-menu>
        </div>
        
          </div>
          
            </v-card>
  </template>
  
  <script>
  export default {
  props: ['name', 'color', 'variant', 'icon','Subname','SubnameHeader','SubnameHeader1','Subname1','selectItem','showDeleteDialog','item'],
  methods: {
        selectItem() {
            this.$emit('click')
        },
        confirmDelete() {
            this.$emit('click')
        }
  }
  }
  </script>
  
  <style>
  
  </style>