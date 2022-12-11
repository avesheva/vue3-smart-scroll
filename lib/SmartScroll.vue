<script setup lang="ts">
import { onMounted } from 'vue'
import { delay } from './utils/helpers'

interface Props {
  id?: string,
  scrollDelay?: number,
}
const props = withDefaults(defineProps<Props>(), {
  id: 'smartScrollContainer',
  scrollDelay: 300,
})

const emit = defineEmits(['scroll', 'visibility-change'])

let wrapperBlock: HTMLElement | null = null
let wrapperClientRect: DOMRect | null = null

const emitVisibilityChange = () => {
  console.log('EMIT visibility change ... ')
}

const delayedEmitVisibilityChange = delay(emitVisibilityChange, 1000)

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
        delayedEmitVisibilityChange()
      }
    } else {
      if (!isVisible || isVisible === 'true') {
        item.setAttribute('data-is-visible', 'false')
        delayedEmitVisibilityChange()
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
