## React testing library

React testing library est déjà injecté dans `package.json` avec jest dans CRA(Create-React-App)

> @testing-library/jest-dom
>
> @testing-library/react
>
> @testing-library/user-event
>
> @types/jest

### Snapshot test : `Profile.test.js`

A la base, les functions de jest marche. Cependant, RTL utilise `render()` au lieu de mount() ou de shallow() en Enzyme.

> render(\_\_component\_\_) :`object`
>
> render function rends un `object` qui comprend les functions utiles(`query function`) comme:
>
> - .container : rend le container de `component`.
> - .getByText(\_\_text\_\_) : apport un element HTML selon le text
>
> cf/ .toMatchSnapshot() marche exactement pareil qu'en enzyme.
>
> `Parce que c'est une function de jest`

```
import Profile from "../Profile";
import { render } from "@testing-library/react";

describe("<Profile/>", () => {
  it("matches snapshot", () => {
    const utils = render(<Profile username="jeanoza" name="Kyubong" />);
    expect(utils.container).toMatchSnapshot();
  });
  it("shows the props correctly", () => {
    const utils = render(<Profile username="jeanoza" name="Kyubong" />);
    utils.getByText("jeanoza");
    utils.getByText("(Kyubong)");
    utils.getByText(/kyu/i); // passe avec regex
  });
});

```

## Query Function

Ce sont des functions que l'on peut utiliser à `@testing-library/jest-dom`

> composé par Variant + Query

### Variant

- getBy\*\* : selectionne un DOM element selon \*\*

- getAllBy\*\* : selectionne plusieur DOM element selon \*\*

- `queryBy**` et `queryAllBy**` : sont pareil que getBy\*\* mais pas d'erreur meme s'il n'y a pas DOM element
- `findBy**` et `findAllBy**` : sont pareil que getBy\*\* mais rend `Promise()` qui selectionne DOM element

  > servi pour `async`
  >
  > s'il n'y a pas de réponse après 4500ms(`default timeout`) => error

### Queries

- ByLabelText : selectionne `input`(DOM element) selon son `label`.

  ```
  <label for="username-input">identité</label>
  <input id="username-input" />

  const inputNode = getByLabelText("identité");
  ```

  - ByPlaceholderText : selectionne `input` ou `textarea` selon `placeholder`

  ```
  <input placeholder = "identité">

  const inputNode = getByPlaceholderText("identité");
  ```

- ByText:

  ```
  <div>Hello World!</div>;

  const div = getByText('Hello World!');
  ```

- ByAltText : utilisé notamment pour `img` ayant `alt` property

  ```
  <img src="/awesome.png" alt="awesome image" />;

  const imgAwesome = getByAltText('awesomse image');
  ```

- ByTitle : normalement avec `svg` ayant `title`

  ```
  <p>
  <span title="React">React</span> is awesome library.
  </p>

  <svg>
  <title>Delete</title>
  <g><path/></g>
  </svg>

  const spanReact = getByTitle('React');
  const svgDelete = getByTitle('Delete');
  ```

- ByDisplayValue : selectionne selon les `value`s que `input`, `textarea`, `select` ont.

  ```
  <input value="text" />;

  const input = getByDisplayValue('text');
  ```

- ByRole : DOM element ayant `role` spécifique

```
<span role="button">삭제</span>;
const spanRemove = getByRole('button');
```

- ByTestId : utlisé que s'il n'y a `pas de moyen` de selectionner le DOM que l'on veut.

  => on teste directement le DOM en donnat `id`

  ```
  <div data-testid="commondiv">div banal</div>;

  const commonDiv = getByTestId('commondiv');
  ```

### Priorité de queries

> 1.  getByLabelText
>
> 2.  getByPlaceholderText
>
> 3.  getByText
>
> 4.  getByDisplayValue
>
> 5.  getByAltText
>
> 6.  getByTitle
>
> 7.  getByRole
>
> 8.  getByTestId

\*\*S'abstenir d'utiliser `querySelector` de DOM.=> `getByTestId`

### Exemple test avec HookCounter.js

> `fireEvent` : génère event avec son function
>
> ex:
>
> - fireEvent.click(\_\_event\_\_) => click event

```
import HookCounter from "../HookCounter";
import { render, fireEvent } from "@testing-library/react";

describe("<HookCounter/>", () => {
  let utils;
  beforeEach(() => {
    utils = render(<HookCounter />);
  });
  it("matches snapshot", () => {
    expect(utils.container).toMatchSnapshot();
  });
  it("has a number and two button", () => {
    utils.getByText("0");
    utils.getByText("+1");
    utils.getByText("-1");
  });
  it("plus button test", () => {
    const number = utils.getByText("0");
    const plusButton = utils.getByText("+1");
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(number).toHaveTextContent("2");
  });
  it("minus button test", () => {
    const number = utils.getByText("0");
    const minusButton = utils.getByText("-1");
    fireEvent.click(minusButton);
    fireEvent.click(minusButton);
    expect(number).toHaveTextContent("-2");
  });
});

```

### @types/jest ne marche pas??

#### mettre ce code en jsconfig.json dans ROOT

```

{ "typeAcquisition": { "include": ["jest"] } }

```
