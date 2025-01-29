<script setup>
import { RouterLink, RouterView } from 'vue-router'
import mybtn from './components/mybtn.vue'
import toolbar from './components/toolbars.vue'
import UserRegistration from './views/UserRegistration.vue'
import cards from './components/Cards.vue'
import TraininigHomePage from './views/TraininigHomePage.vue'

</script>

<template>
<div class=" flex flex-row ">
  
  <mybtn class="w-full"/>

  

<div class="flex-col flex w-full">

<router-view></router-view>
</div>
</div>




</template>

