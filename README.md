# vue3-smart-scroll

Vue 3 typescript scroll block with items visibility detection and other features

## Short description
- Component marks all elements in visible area with **data-is-visible="true"**, and all hidden elements with **data-is-visible="false"**.
- If prop **onlyVisible** is **true**, component adds only **data-is-visible="true"** attribute. Good for marking seen messages, notifications in scroll list, etc.
- If prop **deleteViewed** is **true**, component removes items, as soon they become hidden

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
| onlyVisible   | Boolean | false                | If **true**, component marks all viewed items once and not changes visibility, when item gets hdden 
| deleteViewed  | Boolean | false                | If **true**, viewed items remove, when they leave visible area 
| itemAttribute | String  | " "                  | Custom list item attribute. If set, and **deleteViewed = true**, event **items-delete** returns list of                                                      this items

## Events
| NAME         | ARGS         | ARGS TYPE     | DESCRIPTION       |
|--------------|--------------|---------------| ------------------|
| scroll       | direction    | 'up' / 'down' | Scroll direction
| items-delete | deletedItems | string[]      | Fires if **deleteViewed = true** and **itemAttribute** set. Always after **scroll** event.  
