import React from "react";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        Header
        <br />
        <Switch>
          <Route path="/login">Login page</Route>

          <Route path="/dashboard">Dashboard page</Route>

          <Route path="/">Home Page</Route>
        </Switch>
        <br />
        Footer
      </div>
    );
  }
}

export default App;
