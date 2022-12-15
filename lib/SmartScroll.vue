<script setup lang="ts">
import { onMounted } from 'vue'
import { delay } from './utils/helpers'

export interface Props {
  id?: string,
  scrollDelay?: number,
  onlyVisible?: boolean,
  deleteViewed?: boolean,
  itemAttribute?: string,
}

const props = withDefaults(defineProps<Props>(), {
  id: 'smartScrollContainer',
  scrollDelay: 300,
  onlyVisible: false,
  deleteViewed: false,
  itemAttribute: '',
})

const emit = defineEmits(['scroll', 'items-delete'])

let wrapperBlock: HTMLElement | null = null
let wrapperClientRect: DOMRect | null = null
let scrollTop = 0
let deleting = false

const init = () => {
  wrapperBlock = document.getElementById(props.id)

  if (wrapperBlock) {
    wrapperClientRect = wrapperBlock.getBoundingClientRect()
    scrollTop = wrapperBlock.scrollTop
  }
}

const checkItemsVisibility = (wrapper: HTMLElement) => {
  if (!wrapperClientRect) return

  for (const item of wrapper.children) {
    const itemCoordinates = item.getBoundingClientRect()
    const itemMiddle = item.clientHeight / 2
    const isVisible = item.getAttribute('data-is-visible')

    if (
      (itemCoordinates.bottom - itemMiddle <= wrapperClientRect.bottom)
      && (itemCoordinates.bottom - itemMiddle >= wrapperClientRect.top)
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

const deleteViewedItems = (wrapper: HTMLElement) => {
  const deletedItems = []

  for (const item of wrapper.children) {
    const isVisible = item.getAttribute('data-is-visible')

    if (isVisible === 'false') {
      deleting = true
      item.remove()

      if (props.itemAttribute) {
        deletedItems.push(item.getAttribute(props.itemAttribute))
      }
    } else {
      break
    }
  }

  deletedItems.length > 0 && emit('items-delete', deletedItems)
}

const scrollHandler = () => {
  if (deleting) {
    deleting = false
    return
  }

  if (wrapperBlock) {
    const direction: 'up' | 'down' = scrollTop < wrapperBlock.scrollTop ? 'down' : 'up'

    checkItemsVisibility(wrapperBlock)
    scrollTop = wrapperBlock.scrollTop

    emit('scroll', direction)

    props.deleteViewed && deleteViewedItems(wrapperBlock)
  }
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
