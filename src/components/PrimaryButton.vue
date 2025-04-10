<template>
  <v-btn @click="handleclick" class="rounded-lg !bg-none " :prepend-icon="icon" :color="color" :variant="variant">{{name}}</v-btn>
</template>

<script>
export default {
props: ['name', 'color', 'variant', 'icon'],
methods: {
    handleclick() {
        this.$emit('click')
    }
}
}
</script>

<style>

</style>