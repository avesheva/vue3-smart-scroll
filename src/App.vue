<template>
  <div class="flex">
    <smart-scroll>
      <div
        v-for="number in 17"
        class="item"
        :key="number"
      >
        Item: {{ number }}
      </div>
    </smart-scroll>

    <div class="info">
      <p class="flex">
        Hidden
      </p>
      <p class="flex">
        Visible
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SmartScroll from '../lib'

</script>

<style scoped>
.flex {
  display: flex;
}

.info p::before {
  display: inline-block;
  content: "";
  width: 20px;
  height: 20px;
  border: solid #242424;
  margin: 0 10px;
}
.info p:first-child::before {
  background: #242424;
}

#smartScrollContainer {
  border: solid;
  max-height: 355px;
}

*[data-is-visible="true"] {
  background: white;
  color: #242424;
  transition: background-color 1s;
}
*[data-is-visible="false"] {
  background: #242424;
  color: white;
  transition: background-color 1s;
}

.item {
  padding: 2rem;
  font-size: 2rem;
  outline: solid 1px;
}
</style>
