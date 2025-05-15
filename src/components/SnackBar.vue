<template>
    <div class="snackbar" v-if="message" :color="color"  :prepend-icon="icon" key="snackbar"
        @click="$emit('close')" :timeout="5000">
        

        {{ message }}
    </div>
</template>

<script>
export default {
    props: ['message', 'color',  'icon'],
}
</script>

<style>

</style>