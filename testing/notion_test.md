# Notion de Test

## Test?

- Test est pour vérifier ce que l'on a fait.
- Cependant, tester manuellement prend d'autant plus de temps que la dimension de projet est grande.
- C'est la raison pour laquelle on code le test code - Automatisation de teste.

## Bénéfice de Test

### On peut détecter d'où vient le bug(error).

- Projet collectif : on ne connait pas par coeur le code que le collègue a fait
- Refectoring : on peut voir vite si le code réformé marche tout comme le code avant.
- Si test code ne détecte pas le bug, on peut ajouter le test code afin de détecter ce cas
  => Comme cela, on peut empêcher le même bug.

## Unit Test & Integrated Test

### Unit Test

Il s'agit d'un test avec l'unité miniscule. Ex:

- Component(composant) se rend bien(rendering ou mounting)
- Lors de l'exécution d'une function, le state change comme je voulais dans le composant.
- Action creator crée bien l'object de l'action dans Redux
- Reducer produit bien la nouvelle state.

Cependant, même si chaque function marche bien, l'application ne pourrait marche bien.

=> C'est le temps que l'on fait "Intergrated Test".

### Integrated Test

Il s'agit d'un test envers l'app entière.

- Interaction entre les composants (envoyer props => recevoir props)
- Changement de UI(user interface) lors de DOM event
- Action dispatch dans Redux

Enfin,

- l'unit test se concentre sur un seul élément :normalement, une seule fiche
- alors que l'integrated test considère les éléments variées : on peut tester plusieurs fiches dnas un test.

  => D'ailleurs, tester plusieurs functions dans une fiche se considère comme un test intégré.

### Référence : https://velog.io/@velopert/react-testing
