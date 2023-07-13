## createAction
`createAction` là một helper function dùng để tạo một Redux action
```ts
function createAction(type,prepareAction?)
```
Ví dụ: Tạo createAction cho action increment trong Counter
```ts
import { createAction } from "@reduxjs/toolkit";
const increment = createAction<number|undefined>('counter/increment')
let action = increment()
// return {type:'counter/increment'}
action = increment(3)
// return {type:'counter/increment', payload:3}
```