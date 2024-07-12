// .js -> por defecto utliza CommonJS
// .mjs -> para utlizar ES Modules
// .cjs -> para utlizar CommonJS

import { sum, sub, mult } from './sum.mjs'

console.log(sum(4, 3))
console.log(sub(4, 3))
console.log(mult(4, 3))
