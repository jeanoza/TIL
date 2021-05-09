## Async Utilities

> wait, waitForDomChange, and waitForElement have been combined into the waitFor method.
>
> lien : https://testing-library.com/docs/dom-testing-library/api-async/
>
> Donc, il faut utiliser
>
> - soit `waitFor`
> - soit `findBy`\*\*,
> - ou bien, `waitForElementToBeRemoved`

### `findBy`\*\* Queries

similaire avec `getBy`\*\* mais de manière `asynchronique`

### `waitFor`

```
function waitFor<T>(
  callback: () => T | Promise<T>,
  options?: {
    container?: HTMLElement
    timeout?: number
    interval?: number
    onTimeout?: (error: Error) => Error
    mutationObserverOptions?: MutationObserverInit
  }
): Promise<T>
```

### `waitForElementToBeRemoved`

```
function waitForElementToBeRemoved<T>(
  callback: (() => T) | T,
  options?: {
    container?: HTMLElement
    timeout?: number
    interval?: number
    onTimeout?: (error: Error) => Error
    mutationObserverOptions?: MutationObserverInit
  }
): Promise<void>
```

#### DelayedToggle.js

```
import React, { useState } from "react";

function DelayedToggle() {
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setTimeout(() => {
      setToggle((toggle) => !toggle);
    }, 1000);
  };
  return (
    <div>
      <button onClick={onToggle}>Toggle</button>
      <div>
        state : <span>{toggle ? "ON" : "OFF"}</span>
      </div>
      {toggle && <div>Boom!!</div>}
    </div>
  );
}

export default DelayedToggle;


```

#### DelayedToggle.test.js

```
import DelayedToggle from "./DelayedToggle";

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<DelayedToggle/>", () => {
  let container;
  let toggleButton;
  beforeEach(() => {
    container = render(<DelayedToggle />).container;
    toggleButton = screen.getByText("Toggle");
  });

  it("reveals text when toggle is On", async () => {
    userEvent.click(toggleButton);
    await screen.findByText("Boom!!");
    // await waitFor(() => screen.getByText("Boom!!"));
  });
  it("toggles text On/Off", async () => {
    userEvent.click(toggleButton);

    //utilise find
    const text1 = await screen.findByText("ON");
    expect(text1).toHaveTextContent("ON");
    //utilise waitFor avec son option {timeout:}
    const text2 = await waitFor(() => screen.getByText("ON"), {
      timeout: 3000,
    });
    expect(text2).toHaveTextContent("ON");
  });
  it("changes something when button is clicked", async () => {
    userEvent.click(toggleButton);

    //   const mutations = await waitFor(() => screen.getByText("ON"));
    const mutations = await screen.findByText("ON");
    //console.log(mutations);
  });
  it("remove text when toggle is OFF", async () => {
    userEvent.click(toggleButton);
    await screen.findByText("ON"); // toggle "ON"
    userEvent.click(toggleButton);
    await waitForElementToBeRemoved(() => screen.getByText("Boom!!"));
  });
});

```

## Rest API test

### `axios-mock-adapter`

En général, on ne fait pas la requête directement au serveur.

- Puisque, le serveur marche bien ou pas,ce n'est `pas l'objectif/intérêt` du test en frontend.

- `L'enjeu` de ce test, c'est de vérifier si `les datas reçus s'affichent bien` dans l'écran.

> C'est la raison pour laquelle il faudrait `axios-mock-adapter`
>
> Comme `Mocking function`, il limite comme si on reçoit des datas du serveur.

    $yarn add axios-mock-adapter

### Créer MockAdapter & Requête faux

- Créer instance `mock`

  > `const` mock = `new` MockAdapter(axios, {delayResponse?:\_\_MS\_\_ : `number`});

- `onGet` : répond à `axios.get()`
  > prototype: mock.onGet(\_\_ADDRESS\_\_:`string`).reply(\_\_STATUS\_\_ , \_\_DATA\_\_:`object`)

```

import UserProfile from "./UserProfile";
import axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

describe("<UserProfile/>", () => {
  const mock = new MockAdapter(axios, { delayResponse: 200 }); //200ms faux delai
  mock.onGet("https://jsonplaceholder.typicode.com/users/1").reply(200, {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  });
  it("calls getUser API loads & userData correctly", async () => {
    render(<UserProfile id={1} />);
    await waitFor(() => screen.getByText("Loading...")); // pass si "Loading..." s'affiche
    await waitFor(() => screen.getByText("Bret")); // pass si Bret(username) s'affiche
  });
});

```

### D'autre méthodes en `axios-mock-adapter`

- ref: https://www.npmjs.com/package/axios-mock-adapter

- `.replyOnce()` : utilise mocking une seule fois puis requête de manière `ordinaire`(directement au serveur).

  > mock.`onGet`('/users').replyOnce(200, users);

- utilise plusieurs fois `.replyOnce()` :

  > mock.onGet('/users').replyOnce(200,users).`onGet('/users').replyOnce(500)`

- `.onAny()` : mocking soit `.onGet()` soit `.onPost()`

- `reset` & `restore`

  > mock.`reset()` : supprimer handlers inscrites à mock `Instance`
  >
  > - à utiliser si on veut configurer différemment mock par cas.
  >
  > - \*\* Peut-être, utile avec `BeforeEach() ou AfterEach()`?
  >
  > mock.`restore()`: supprimer complètement moking dans axios.

#### Référence : https://velog.io/@velopert/react-testing-library-%EC%9D%98-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%9E%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8#%EB%B9%84%EB%8F%99%EA%B8%B0%EC%A0%81%EC%9C%BC%EB%A1%9C-%EB%B0%94%EB%80%8C%EB%8A%94-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-ui-%ED%85%8C%EC%8A%A4%ED%8A%B8
