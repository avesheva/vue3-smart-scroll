<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { delay } from './utils/helpers'

export interface Props {
  id?: string,
  scrollDelay?: number,
  rootMargin?: string,
  threshold?: number | number[]
}

export interface IIntersectionData {
  scrollDirection: 'up' | 'down',
  entries: IntersectionObserverEntry[],
}

const props = withDefaults(defineProps<Props>(), {
  id: 'smartScrollContainer',
  scrollDelay: 0,
  rootMargin: '',
  threshold: 0,
})

const emit = defineEmits(['intersect'])

let intersectionObserver: IntersectionObserver | null = null
let lastY = 0

const init = () => {
  const wrapper = document.getElementById(props.id)

  if (!wrapper) return
  lastY = wrapper.scrollTop

  const observerCallBack = delay((entries: IntersectionObserverEntry[]): void => {
    const data: IIntersectionData = {
      scrollDirection: lastY > wrapper.scrollTop ? 'up' : 'down',
      entries,
    }

    lastY = wrapper.scrollTop

    emit('intersect', data)
  }, props.scrollDelay)

  intersectionObserver = new IntersectionObserver(observerCallBack, {
    root: wrapper,
    threshold: props.threshold,
    rootMargin: props.rootMargin,
  })

  for (const child of wrapper.children) {
    intersectionObserver.observe(child)
  }
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  intersectionObserver?.disconnect()
})

</script>

<template>
  <div
    :id="id"
    style="overflow-y: auto"
  >
    <slot />
  </div>
</template>

<style scoped>

</style>
