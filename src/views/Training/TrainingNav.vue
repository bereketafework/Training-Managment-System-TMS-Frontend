<template>
  <!-- Navigation Buttons -->
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="w-full">
      <v-card class="flex-col flex">
        <v-btn
          class="m-2"
          color="blue"
          variant="text"
          :to="{ name: 'TrainingNav' }"
          >Trainings</v-btn
        >
        <v-btn
          class="m-2"
          color="blue"
          variant="text"
          :to="{ name: 'CourseHome' }"
        >
          Course
        </v-btn>
      </v-card>
    </div>
    <router-view></router-view>
  </div>
</template>

<script></script>

<style></style>
