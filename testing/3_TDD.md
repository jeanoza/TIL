# TDD

## Qu'est-ce que TDD?

- Test Driven Development
- c'est une méthodologie selon laquelle le teste dirige le développement.
- Enfin, Test code => Code

## Process de TDD

### fail (code échoué)

    Rédige d'abord le cas(test code) qui sera échoué.
    (Puisque le code à ête testé n'est pas encore rédigé)
    Pas pour toutes les functions mais un par un selon la priorité

### pass (code qui passe le test)

    Modifier le code pour réussir au test code.

### refectoring :

    s'il y a beaucoup de répétition dans le code
    s'il y a qqch à améliorer
    s'il marche toujours comme avant après avoir modifié.

## Profit de TDD

Puisque l'on rédige le code avec l'unité miniscule, le code sera bien rangé - "Modulé"

Naturellement, le test pourrrait couvrir plus de code, autrement dit, il peut détecter plus de bug potentiel.

- test code's coverage capacity ++

- refectoring facile

- maintenance facile

=> Enfin, qualité de project ++

## Exercice TDD

#### stats.test.js

```
const stats = require("./stats");

describe("stats", () => {
  it("max", () => {
    expect(stats.max([1, 2, 3, 4, 5])).toBe(5);
  });
});

```

=> fail, puisqu'il n'y a pas encore "stats.max"

#### stats.js

```
exports.max = (numbers) => Math.max(...numbers);
```

=> pass

De la même manière, ajoutons les functions-ci: min(), avg(), median(), mode()

Test code => code

> cf/
>
> median = ce qui est tout au milieu dans array apres avoir sort() - soit par ordre croissant ou descendant
>
> mode = ce qui est plus fréquent dans array.

... répétition ... Enfin!

#### stats.test.js

```

const stats = require("./stats");

describe("stats", () => {
  it("max", () => {
    expect(stats.max([1, 2, 3, 4, 5])).toBe(5);
  });
  it("min", () => {
    expect(stats.min([1, 2, 3, 4, 5])).toBe(1);
  });
  it("avg", () => {
    expect(stats.avg([1, 2, 3, 4, 5])).toBe(3);
  });
  describe("median", () => {
    it("sort", () => {
      expect(stats.sort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });
    it("median for odd length array", () => {
      expect(stats.median([1, 5, 4, 3, 2])).toBe(4);
    });
    it("median for even length array", () => {
      expect(stats.median([1, 5, 4, 3, 2, 6])).toBe(3.5);
    });
  });
  describe("frequency", () => {
    it("[one frequency number", () => {
      expect(stats.frequency([1, 2, 2, 2, 3])).toBe(2);
    });
    it("[no frequency number]", () => {
      expect(stats.frequency([1, 1, 2, 2, 3, 3])).toBe(null);
    });
    it("multiple frequency number]", () => {
      expect(stats.frequency([1, 2, 2, 3, 3, 4])).toEqual([2, 3]);
    });
  });
});
```

#### stats.js

```

exports.max = (numbers) => Math.max(...numbers);
exports.min = (numbers) => Math.min(...numbers);
exports.avg = (numbers) =>
  numbers.reduce(
    (acc, current, index, { length }) => acc + current / length,
    0
  );
exports.sort = (numbers) => numbers.sort((a, b) => a - b);
exports.median = (numbers) => {
  const middle = Math.floor(numbers.length / 2);
  const { length } = numbers;
  return length % 2
    ? numbers[middle]
    : (numbers[middle - 1] + numbers[middle]) / 2;
  /*
  //if odd
  if (numbers.length % 2) return numbers[middle];
  //if even
  return (numbers[middle - 1] + numbers[middle]) / 2;
  */
};
exports.frequency = (numbers) => {
  const counts = new Map();
  numbers.forEach((number) => {
    const count = counts.get(number) || 0;
    counts.set(number, count + 1);
  });
  const maxCount = Math.max(...counts.values());
  const result = [...counts.keys()].filter(
    (number) => counts.get(number) === maxCount
  );
  //no frequency : all frequency is same.
  const noRepeatNumbers = Array.from(new Set(numbers));
  //1er method : Object.entries().toString()
  /*
  if (
    Object.entries(result).toString() ===
    Object.entries(noRepeatNumbers).toString()
  )
  */
  //2nd method: JSON.stringify()
  if (JSON.stringify(result) === JSON.stringify(noRepeatNumbers)) return null;

  //multiple frequency
  if (result.length > 1) return result;
  //frequency is one
  return result[0];
};
```

## Conclusion

Le fait d'utilise TDD permet...

> - Refectoring plus facile.
> - (de) Vérifier si l'exigence(demande) est satisfaite
> - (de) Avoir une carte(la direction) lorsque l'on code.

#### Référence : https://velog.io/@velopert/TDD%EC%9D%98-%EC%86%8C%EA%B0%9C
