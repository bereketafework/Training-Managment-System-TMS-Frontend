
  <template>
     <div class="flex flex-col">
       <!-- Navigation Buttons -->
    <div>
      <v-card>
        <v-btn class="m-2" color="primary" variant="text"  :to="{ name: 'Sessions' }">Training Session</v-btn>
        <v-btn
          class="m-2"
          color="primary"
          variant="text"
          :to="{ name: 'CourseHome' }"
        >
          Course
        </v-btn>
        <v-btn class="m-2" color="primary" variant="text"  :to="{ name: 'Sessions' }">Training Session</v-btn>
        <v-btn class="m-2" color="primary" variant="text" :to="{ name: 'Team' }" >Team</v-btn>
      </v-card>
    </div>
    </div>
  </template>



<script>
export default {

}
</script>

<style>

</style>