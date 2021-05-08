## Résumé du Projet

- `<TodoForm/>`
  - `<input/>` & `<button>submit<button>`
  - Lors de submit event, ajouter les données à `<TodoList/>`
- `<TodoItem/>`
  - Composant ayant chaque `todo`
  - `<span>{todo.text}</span>`
  - `<button>delete</button>`
- `<TodoList/>`
  - rends `<TodoItem/>`
- `<TodoApp>`
  - Envoyer les functions :
    - `onToggle()` => `<TodoForm/>`
    - `onInsert()` => `<TodoLIst/>`
    - `onRemove()` => `<TodoLIst/>`

## TodoForm

### input state & submit event

#### TodoForm.test.js

```
import TodoForm from "./TodoForm";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<TodoForm/>", () => {
  const setup = (props = {}) => {
    render(<TodoForm {...props} />);
    const input = screen.getByPlaceholderText("input todos");
    const button = screen.getByText("submit");
    return { input, button };
  };

  //input & button existe
  it("has input and button", () => {
    const { input, button } = setup();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  //change input
  it("change input", () => {
    const { input } = setup();
    userEvent.type(input, "learn TDD");
    expect(input).toHaveAttribute("value", "learn TDD");
  });

  //submit event
  it("calls onInsert and clears input", () => {
    const onInsert = jest.fn();
    const { input, button } = setup({ onInsert });
    userEvent.type(input, "learn TDD");
    expect(input).toHaveAttribute("value", "learn TDD");
    userEvent.click(button);
    expect(onInsert).toBeCalledWith("learn TDD");
    expect(input).toHaveAttribute("value", "");
  });
});

```

Modifier `TodoForm.js` afin qu'il passe le test `TodoForm.test.js`

#### TodoForm.js

```
import React, { useState } from "react";

function TodoForm({ onInsert }) {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = (event) => {
    onInsert(value);
    event.preventDefault();
    setValue("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="input todos" onChange={onChange} value={value} />
        <button>submit</button>
      </form>
    </div>
  );
}

export default TodoForm;

```

### userEvent

> import { userEvent } from "@testing-library/user-event";
>
> userEvent.NAME_event(`DOM_element`, `option`?:string):boolean
>
> `option`: value à changer

ex:

```
  it("change input", () => {
    const { input } = setup();
    userEvent.type(input, "learn TDD");
    expect(input).toHaveAttribute("value", "learn TDD");
  });
```

### cf/ fireEvent

> import {fireEvent } from "@testing-library/react";
>
> fireEvent.`NAME_event`(`DOM_Element`, `option?`:{} ) : `boolean`
>
> `option`: génère un event dans DOM_Element // pas obligatoire

ex.

```
  it("change input", () => {
    const { getByPlaceholderText } = render(<TodoForm />);
    const input = getByPlaceholderText("input todos");
    fireEvent.change(input, {
      target: {
        value: "learn TDD",
      },
    });

```

### Mocking Function

> `jest.fn()`

On peut voir si la function est appelée lorsqu'un event(ex: button click) a lieu.

#### TodoForm.test.js

```
  it("calls onInsert and clears input", () => {
    const onInsert = jest.fn();
    render(<TodoForm onInsert={onInsert} />);
    const input = screen.getByPlaceholderText("input todos");
    const button = screen.getByText("submit");
    fireEvent.change(input, {
      target: {
        value: "learn TDD",
      },
    });
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith("learn TDD");
    expect(input).toHaveAttribute("value", "");
  });

```

Dans ce cas-là,

- la function `onInsert()` doit être appelée dès lors onClick button(`onSubmit`) - `fireEvent.click(button)` ou `userEvent.click(button)`.
- le paramètre de cette function est `"learn TDD"`

  > expect(onInsert).toBeCalledWith("learn TDD");

## TodoItem

#### TodoItem.test.js

```
import TodoItem from "./TodoItem";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<TodoItem/>", () => {
  const sampleTodo = {
    id: 1,
    text: "Learn TDD",
    done: false,
  };
  const setup = (props = {}) => {
    const initialProps = { todo: sampleTodo };
    render(<TodoItem {...initialProps} {...props} />);
    const todo = props.todo || initialProps.todo;
    const span = screen.getByText(todo.text);
    const button = screen.getByText("delete");
    return { span, button };
  };

  //span & button
  it("has todo span & button", () => {
    const { span, button } = setup(sampleTodo);
    expect(span).toBeTruthy();
    expect(button).toBeTruthy();
  });

  //change style selon 'done' : true ou false
  it("shows line-through on span when done is true", () => {
    const { span } = setup({ todo: { ...sampleTodo, done: true } });
    expect(span).toHaveStyle("text-decoration:line-through");
  });
  it("does not show line-through on span when done is false", () => {
    const { span } = setup({ todo: { ...sampleTodo, done: false } });
    expect(span).not.toHaveStyle("text-decoration:line-through");
  });

  //click event : onToggle()
  it("calls onToggle", () => {
    const onToggle = jest.fn();
    const { span } = setup({ onToggle });
    userEvent.click(span);
    expect(onToggle).toBeCalledWith(sampleTodo.id);
  });

  //click event : onRemove
  it("calls onRemove", () => {
    const onRemove = jest.fn();
    const { button } = setup({ onRemove });
    userEvent.click(button);
    expect(onRemove).toBeCalledWith(sampleTodo.id);
  });
});

```

Afin d'assurer le test code, modifie TodoItem.js

#### TodoItem.js

```
import React from "react";

function TodoItem({ todo, onToggle, onRemove }) {
  const { id, text, done } = todo;

  return (
    <li>
      <span
        style={
          done ? { textDecoration: "line-through" } : { textDecoration: "none" }
        }
        onClick={() => onToggle(id)}
      >
        {text}
      </span>
      <button onClick={() => onRemove(id)}>delete</button>
    </li>
  );
}

export default TodoItem;

```

## TodoList

```

import TodoList from "./TodoList";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<TodoList/>", () => {
  const sampleTodos = [
    {
      id: 1,
      text: "Learn TDD",
      done: true,
    },
    {
      id: 2,
      text: "Learn Testing Library",
      done: true,
    },
  ];
  it("Renders todos", () => {
    render(<TodoList todos={sampleTodos} />);
    screen.getByText(sampleTodos[0].text);
    screen.getByText(sampleTodos[1].text);
  });
  it("calls on Toggle and onRemove", () => {
    // create mocking function
    const onToggle = jest.fn();
    const onRemove = jest.fn();
    render(
      <TodoList todos={sampleTodos} onToggle={onToggle} onRemove={onRemove} />
    );
    userEvent.click(screen.getByText(sampleTodos[0].text));
    expect(onToggle).toBeCalledWith(sampleTodos[0].id);

    userEvent.click(screen.getAllByText("delete")[0]);
    expect(onRemove).toBeCalledWith(sampleTodos[0].id);
  });
});


```

### getByAll\*\*

> si `getBy**` possède `plusieurs result` : error
>
> => à utiliser `getAllby**` comme le cas suivant:

```
  it("calls on Toggle and onRemove", () => {
    // create mocking function
    const onToggle = jest.fn();
    const onRemove = jest.fn();

    (...)

    // userEvent.click(screen.getByText("delete")); - ne marche pas parce que c'est plusieurs.
    userEvent.click(screen.getAllByText("delete")[0]);
    expect(onRemove).toBeCalledWith(sampleTodos[0].id);
```

De ce test, modifie TodoList.js

#### TodoList.js

```
import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onRemove }) {
  return (
    <ul data-testid="TodoList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

export default TodoList;

```

## TodoApp

> Il s'agit d'un test intégré puisque l'on va désormais appeler plusieurs composants dans le composant TodoApp.

```
import TodoApp from "./TodoApp";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<TodoApp/>", () => {
  beforeEach(() => {
    render(<TodoApp />);
  });

  it("renders TodoForm & TodoList", () => {
    screen.getByText("submit");
    screen.getByTestId("TodoList");
  });

  it("renders two defaults todos", () => {
    screen.getByText("Learn TDD");
    screen.getByText("Learn Testing Library");
  });

  it("creates new todo", () => {
    const input = screen.getByPlaceholderText("input todos");
    const button = screen.getByText("submit");
    userEvent.type(input, "Add new todo");
    userEvent.click(button);
    screen.getByText("Add new todo");
  });

  it("toggles todo", () => {
    const todoText = screen.getByText("Learn TDD");
    expect(todoText).toHaveStyle("text-decoration:line-through");
    userEvent.click(todoText);
    expect(todoText).not.toHaveStyle("text-decoration:line-through");
    userEvent.click(todoText);
    expect(todoText).toHaveStyle("text-decoration:line-through");
  });

  it("remove todo", () => {
    const todoText = screen.getByText("Learn TDD");
    const removeButton = todoText.nextSibling;
    userEvent.click(removeButton);
    expect(todoText).not.toBeInTheDocument();
  });
});

```

#### TodoApp.js

```
import React, { useRef, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function TodoApp() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Learn TDD",
      done: true,
    },
    {
      id: 2,
      text: "Learn Testing Library",
      done: true,
    },
  ]);

  const nextId = useRef(
    todos && todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
  );
  const onInsert = (text) => {
    setTodos([...todos, { id: nextId.current, text, done: false }]);
    nextId.current += 1;
  };

  //Créer la function onToggle
  const onToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  //Créer la function onRemove()
  const onRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <TodoForm onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </>
  );
}

export default TodoApp;

```

### useRef()

> useRef(`var`) => { current: `var`}

ex:

```
import { useRef } from "react";

const nextId = useRef(3);

console.log(nextId); // expected : { current : 3}
```

#### référence : https://velog.io/@velopert/tdd-with-react-testing-library
