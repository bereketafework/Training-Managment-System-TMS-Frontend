<template>
  <div>
      <v-card>
        <v-btn
          class="m-2"
          color="primary"
          variant="text"
          :to="{ name: '' }"
        >
          Participant
        </v-btn>
        <v-btn class="m-2" color="primary" variant="text"  :to="{ name: '' }">Enrollment</v-btn>
        <v-btn class="m-2" color="primary" variant="text" :to="{ name: '' }" >Attendance</v-btn>
        <v-btn class="m-2" color="primary" variant="text" :to="{ name: 'Guest' }" >Guest</v-btn>
      </v-card>
    </div>
    <div>  
      
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>