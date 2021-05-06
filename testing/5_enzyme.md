## Créer un React Project

    $npx create-react-app react-enzyme-test

### ajouter libraries

#### enzyme

    $yarn add enzyme

#### enzyme-adapter-react-17`(non-officiel)` : il n'y a pas encore version officielle.

    $yarn add @wojtekmaj/enzyme-adapter-react-17

#### setupTests.js : pour adapter enzyme à react 17

```
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

configure({ adapter: new Adapter() });
```

### Snapshot test

#### enzyme-to-json :

    $yarn add enzyme-to-json

#### package.json : ajouter cela pour que enzyme imprime le snapshot avec les tags HTML

```
  "jest": {
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ]
  },
```

#### profile.js : component à tester

```
import React from "react";

function Profile({ username, name }) {
  return (
    <div>
      <b>{username}</b>&nbsp;
      <span>({name})</span>
    </div>
  );
}

export default Profile;

```

#### Profile.test.js

> - .props(): acces au props
> - .find() : comme querySelector("") en DOM
> - .toMatchSnapshot() : prendre la snapshot & vérifier si cette snapshot est pareil que celle précédante

```
describe("<Profile/>", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<Profile username="jeanoza" name="kyubong" />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders username and name", () => {
    const wrapper = mount(<Profile username="jeanoza" name="kyubong" />);
    expect(wrapper.props().username).toBe("jeanoza");
    expect(wrapper.props().name).toBe("kyubong");
    const boldElement = wrapper.find("b");
    expect(boldElement.contains("jeanoza")).toBe(true);
  });
});
```

#### test

    $yarn test

#### Profile.test.js.snap

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<Profile/> matches snapshot 1`] = `
<Profile
  name="kyubong"
  username="jeanoza"
>
  <div>
    <b>
      jeanoza
    </b>
     
    <span>
      (
      kyubong
      )
    </span>
  </div>
</Profile>
`;
```

### shallow et mount

> - .shallow(): rendre seulementle composant
> - .mount() : rendre le composant et son sous-composant

### Simulation de DOM event

> - .find(text) : cherche nodes qui correspond au text-là
> - .findWhere(boolean) : cherche nodes qui correspond au boolean-là
> - .simulate(event) : simule event-là

```
  it("call handlePlus", () => {

    //cherche node qui correspond à la condition

    const wrapper = shallow(<Counter />);
    const plusButton = wrapper.findWhere(
      (node) => node.type() === "button" && node.text() === "+1"
    );

    //simulation d'un event (click dans ce cas)

    plusButton.simulate("click");
    expect(wrapper.state().number).toBe(1);
  });

```

### Test en React Hook

> on ne peut utiliser ni `.instance()` ni `.state()` avec HOOK(dans le composant fonctionnel)
>
> => il faut utiliser `.find()` pour acceder `number`
>
> => donc, ce que l'on teste ici, ce n'est pas `state.number` mais au `HTML element.text()`.

#### HookCounter.js

```
import React, { useState } from "react";

function HookCounter() {
  const [number, setNumber] = useState(0);
  const handlePlus = () => {
    setNumber((prev) => prev + 1);
  };
  const handleMinus = () => {
    setNumber((prev) => prev - 1);
  };

  return (
    <div>
      <h2>{number}</h2>
      <button onClick={handlePlus}>+1</button>
      <button onClick={handleMinus}>-1</button>
    </div>
  );
}

export default HookCounter;


```

#### HookCounter.test.js

```
import { mount } from "enzyme";
import HookCounter from "./HookCounter";

describe("<Counter/>", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<HookCounter />);
    expect(wrapper).toMatchSnapshot();
  });
  it("call handlePlus", () => {
    const wrapper = mount(<HookCounter />);
    const plusButton = wrapper.findWhere(
      (node) => node.type() === "button" && node.text() === "+1"
    );
    plusButton.simulate("click");
    plusButton.simulate("click");
    //en Hook, incapable d'utiliser .state(), => trouver element HTML avec .find()
    const number = wrapper.find("h2");
    //.text() rend string
    expect(number.text()).toBe("2");

    expect(number.text()).toBe("2");
  });
  it("call handleMinus", () => {
    const wrapper = mount(<HookCounter />);
    const minusButton = wrapper.findWhere(
      (node) => node.type() === "button" && node.text() === "-1"
    );
    minusButton.simulate("click");
    minusButton.simulate("click");
    const number = wrapper.find("h2");
    expect(number.text()).toBe("-2");
  });
});

```
