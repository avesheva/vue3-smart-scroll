<template>
  <div>
    <smart-scroll id="itemsWrapper">
      <div
        v-for="number in 7"
        class="item"
        :key="number"
      >
        Item: {{ number }}
      </div>
    </smart-scroll>
  </div>
</template>

<script setup lang="ts">
import SmartScroll from '../lib'

</script>

<style scoped>
#itemsWrapper {
  border: solid;
  max-height: 355px;
}

*[data-is-visible="true"] {
  background: white;
  color: #242424;
  transition: background-color 2s;
}
*[data-is-visible="false"] {
  background: #242424;
  color: white;
  transition: background-color 2s;
}

.item {
  padding: 2rem;
  font-size: 2rem;
  outline: solid 1px;
}
</style>
