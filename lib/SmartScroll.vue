<script setup lang="ts">
import { onMounted } from 'vue'
import { delay } from './utils/helpers'

const props = defineProps<{
  id: string,
  scrollDelay?: number,
}>()

let wrapperBlock: HTMLElement | null = null
let wrapperClientRect: DOMRect | null = null

const init = () => {
  wrapperBlock = document.getElementById(props.id)

  if (!wrapperBlock) throw Error(`Can't find element with id "${props.id}"`)

  wrapperClientRect = wrapperBlock.getBoundingClientRect()
}

const checkItemsVisibility = (wrapper: HTMLElement) => {
  if (!wrapperClientRect) return

  for (const item of wrapper.children) {
    const itemCoordinates = item.getBoundingClientRect()
    const itemMiddle = item.clientHeight / 2

    if (
      (itemCoordinates.bottom - itemMiddle <= wrapperClientRect.bottom)
      && (itemCoordinates.bottom >= wrapperClientRect.top)
    ) {
      item.setAttribute('data-is-visible', 'true')
    } else {
      item.setAttribute('data-is-visible', 'false')
    }
  }
}

const scrollHandler = () => {
  wrapperBlock && checkItemsVisibility(wrapperBlock)
}

const delayedScrollHandler = delay(scrollHandler, props.scrollDelay || 300)

onMounted(() => {
  init()
  wrapperBlock && checkItemsVisibility(wrapperBlock)
})

</script>

<template>
  <div
    :id="id"
    style="overflow-y: auto"
    @scroll="delayedScrollHandler"
  >
    <slot />
  </div>
</template>

<style scoped>

</style>
