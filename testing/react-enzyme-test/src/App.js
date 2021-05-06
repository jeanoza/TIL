import Counter from "./Counter";
import HookCounter from "./HookCounter";
import Profile from "./Profile";
function App() {
  return (
    <div className="App">
      <Profile username="jeanoza" name="kyubong" />
      <HookCounter />
      <Counter />
    </div>
  );
}

export default App;
