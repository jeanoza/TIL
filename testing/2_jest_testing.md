# Jest

## Jest ?

Jest est un Framwork fait par Facebook.

## Environnement de test

### jest

> yarn add jest

### @types/jest

> yarn add @types/jest

## 1er Test

### sum.js

```
const sum = (a,b) => a+b;

```

### sum.test.js

```
const sum = require("./sum");

test("1 + 2 = 3", () => {
  expect(sum(1, 2)).toBe(3);
});

```

### package.json

> ajouter "scripts" comme cela :

```
{
  "name": "jest",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@types/jest": "^26.0.23",
    "jest": "^26.6.3"
  },
  "scripts" :{
    "test":"jest --watchAll verbose"
  }
}
```

### yarn test

> $yarn test
>
> ```
> PASS ./sum.test.js
> ✓ 1 + 2 = 3 (3 ms)
>
> Test Suites: 1 passed, 1 total
>
> Tests: 1 passed, 1 total
> Snapshots: 0 total
> Time: 1.9 s
> Ran all test suites.
> Watch Usage: Press w to show more.
> ```

### test === it

```
const sum = require("./sum");

//it() === test()
it("1 + 2 = 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

## Describe

> describe("", () =>{});

```
describe("sum test", () => {
 it("1 + 2 == 3", () => {
   expect(sum(1, 2)).toBe(3);
 });
 it("calculate all numbers in array", () => {
   expect(sumOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(55);
 });
});

```

## Refectoring

Reformer la function sumOf avec .reduce()

> cf/ array.reduce([callback], [initial_value])
>
> ```
> callback = (accumulator, currentValue) => accumulator + currentValue
> ```

### sum.js

```
const sum = (a, b) => a + b;
const sumOf = (numbers) => {
  return numbers.reduce((acc, current) => acc + current, 0);
};

exports.sum = sum;
exports.sumOf = sumOf;


```

## Conclusion

> - test === it
> - describe() est servi pour diviser, grouper les tests.
