# vue3-smart-scroll

Vue 3 scroll block with items visibility detection and other features

## Installation
```shell
# with npm
npm install vue3-smart-scroll
```
```shell
# with yarn
yarn add vue3-smart-scroll
```

## Getting Started
### Import component
```javascript
import SmartScroll from 'vue3-smart-scroll'

export default {
  ...
  components: {
    'smart-scroll': SmartScroll
  }
  ...
}
```

## Basic usage
```vue
    <smart-scroll>
      <div
        v-for="number in 17"
        class="item"
        :key="number"
      >
        Item: {{ number }}
      </div>
    </smart-scroll>
```

## Props
| NAME          | TYPE    | DEFAULT              | DESCRIPTION |
|---------------|---------|----------------------|-------------------------------|
| id            | String  | smartScrollContainer | Component id                  |
| scrollDelay   | Number  | 300                  | Delay of scroll event handler |
| onlyVisible   | Boolean | false                | If true, component marks all viewed items once and not changes visibility, when item gets hdden 
| deleteViewed  | Boolean | false                | If true, viewed items remove, when they leave visible area 
| itemAttribute | Boolean | " "                  | Custom list item attribute. If set, and "deleteViewed = true", event "items-delete" returns list of                                                      this items

## Events
| NAME         | ARGS   | PARAMS TYPE | DESCRIPTION |
|--------------|--------| ----------- | ----------- |
| scroll       |        | 
| items-delete |
