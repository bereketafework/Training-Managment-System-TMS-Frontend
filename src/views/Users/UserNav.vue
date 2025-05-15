<template>
  <!-- Navigation Buttons -->
  <div class="w-full h-full">
    <div class="w-full">
      <v-card class="flex-col flex !rounded-none">
        <div class="flex flex-row justify-between">
          <div>
            <v-btn
              class="m-2"
              color="blue"
              variant="text"
              :to="{ name: 'Users' }"
              >User</v-btn
            >
            <v-btn
              class="m-2"
              color="blue"
              variant="text"
              :to="{ name: 'Participant' }"
            >
              Participant
            </v-btn>

            <v-btn
              class="m-2"
              color="blue"
              variant="text"
              :to="{ name: 'Guest' }"
              >Guest</v-btn
            >
          </div>
        </div>
      </v-card>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>


</script>

<style></style>
