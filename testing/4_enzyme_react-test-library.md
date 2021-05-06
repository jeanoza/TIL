## Objectif de test

L'objectif de test en React, c'est de vérifier si:

> 1. tel ou tel résultat s'affiche dans le composant
> 2. la mise à jour s'applique correctement lorsque un event/function est appelé.

## Enzyme & React-testing-library

Selon le document officile de React, `react-testing-library` est conseillé et `Enzyme` comme solution alternative.

> `Enzyme`
>
> - développé depuis 2015
> - focus aux fonctions(instances) dans le composant(ex: props, state)
>
> `react-testing-library`
>
> - depuis 2018, mais son utilisation est de plus en plus augmenté
> - se concentre sur DOM : resultat du rendering
> - de quoi s'afficher : moins de focus aux chaque instances
> - => comme `snapshot test`

#### Référence : https://velog.io/@velopert/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%9D%98-%EC%86%8C%EA%B0%9C

    Cet article est des notes basées sur la traduction de cette références
