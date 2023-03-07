# vue3-smart-scroll

Vue 3 lightweight, easy to use scroll typescript component. Built with [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) api, allows tracking scroll items position, state, visibility, scroll direction, etc. Could be used for list lazy loading, infinite scroll implementation, viewed items marking and so on.

[screencast-localhost_5173-2023.01.31-20_15_32.webm](https://user-images.githubusercontent.com/12416010/215848044-2aa60e4a-ca42-4861-9527-5d4ed9eabfa4.webm)

## Installation
```shell
# with npm
npm install vue3-smart-scroll
```
```shell
# with yarn
yarn add vue3-smart-scroll
```

## Types
```typescript
interface IIntersectionData {
  scrollDirection: 'up' | 'down',
  entries: IntersectionObserverEntry[],
}
```

## Basic usage
```vue
<template>
  <smart-scroll
    :threshold="0.5"
    @intersect="intersectionHandler"
  >
    <div
      v-for="number in 17"
      class="item"
      :key="number"
    >
      Item: {{ number }}
    </div>
  </smart-scroll>
<template>
  
<script setup lang="ts">
import SmartScroll from 'vue3-smart-scroll'

const intersectionHandler = (data: IIntersectionData) => {
  data.entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('data-is-visible', 'true')
    } else {
      entry.target.setAttribute('data-is-visible', 'false')
    }
  })
}
</script>
    
<style scoped>
  #smartScrollContainer {
    width: 300px;
    border: solid;
    height: 350px;
  }
     
  .item {
    padding: 2rem;
    font-size: 2rem;
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
</style>
```

## Props
| NAME               | TYPE             | DEFAULT              | DESCRIPTION                   |
|--------------------|------------------|----------------------|-------------------------------|
| id?                | String           | smartScrollContainer | Main block id. Component starts tracking this block and its children for intersections |
| scrollDelay? (ms)  | Number           | 0                    | Delay for __*intersect*__ event calback function in milliseconds |
| threshold?         | Number, Number[] | 0                    | [Intersection Observer constructor](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) options param |
| rootMargin?           | String                            | " "               | [Intersection Observer constructor](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) options param |

## Events
| NAME         | ARGS         | ARGS TYPE         | DESCRIPTION       |
|--------------|--------------|-------------------|-------------------|
| intersect    | data         | IIntersectionData | Fires when tracking items intersecting with main block  |

