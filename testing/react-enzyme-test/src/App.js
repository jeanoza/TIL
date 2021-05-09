const { default: UserProfile } = require("./testAsync/UserProfile");

function App() {
  return (
    <div className="App">
      <UserProfile id="1" />
    </div>
  );
}

export default App;
