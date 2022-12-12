<script setup lang="ts">
import { onMounted } from 'vue'
import { delay } from './utils/helpers'

interface Props {
  id?: string,
  scrollDelay?: number,
  onlyVisible?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  id: 'smartScrollContainer',
  scrollDelay: 300,
  onlyVisible: false,
})

const emit = defineEmits(['scroll'])

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
    const isVisible = item.getAttribute('data-is-visible')

    if (
      (itemCoordinates.bottom - itemMiddle <= wrapperClientRect.bottom)
      && (itemCoordinates.bottom >= wrapperClientRect.top)
    ) {
      if (!isVisible || isVisible === 'false') {
        item.setAttribute('data-is-visible', 'true')
      }
    } else if (!props.onlyVisible) {
      if (!isVisible || isVisible === 'true') {
        item.setAttribute('data-is-visible', 'false')
      }
    }
  }
}

const scrollHandler = () => {
  wrapperBlock && checkItemsVisibility(wrapperBlock)
  emit('scroll')
}
const delayedScrollHandler = delay(scrollHandler, props.scrollDelay)

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
