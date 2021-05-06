const { default: HookCounter } = require("./HookCounter");
const { default: Profile } = require("./Profile");

function App() {
  return (
    <div className="App">
      <Profile username="jeanoza" name="kyubong" />
      <HookCounter />
    </div>
  );
}

export default App;
