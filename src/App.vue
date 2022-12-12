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
  border: solid #B08620;
  margin: 0 10px;
}
.info p:first-child::before {
  background: #B08620;
}
.info p:nth-child(2)::before {
  background: #FDD77D;
}

#smartScrollContainer {
  width: 300px;
  border: solid;
  max-height: 355px;
}

*[data-is-visible="true"] {
  background: #FDD77D;
  color: #644D12;
  transition: background-color 1s;
}
*[data-is-visible="false"] {
  background: #B08620;
  color: #FEF0CD;
  transition: background-color 1s;
}

.item {
  padding: 2rem;
  font-size: 2rem;
  outline: solid 1px;
}
</style>
