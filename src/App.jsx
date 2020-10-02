import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./scenes/Dashboard";
import Home from "./scenes/Home";
import Login from "./scenes/Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedUserId: null,
    };
    this.getSession = this.getSession.bind(this);
    this.postSession = this.postSession.bind(this);
  }

  componentDidMount() {
    this.getSession();
  }

  getSession() {
    fetch(process.env.SERVER_URL + "sessions", {
      method: "GET",
      headers: {
        credentials: "include",
      },
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((response) => console.log(response));
      } else {
        this.setState({ loggedUserId: null });
      }
    });
  }

  postSession(email, password) {
    fetch(process.env.SERVER_URL + "sessions", {
      method: "POST",
      headers: {
        credentials: "include",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((response) => {
          this.setState({ loggedUserId: response.id });
        });
      }
    });
  }

  render() {
    return (
      <div>
        Header
        <br />
        <Switch>
          <Route path="/login">
            <Login
              userId={this.state.loggedUserId}
              postSession={this.postSession}
            />
          </Route>

          <Route path="/dashboard">
            <Dashboard userId={this.state.loggedUserId} />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <br />
        Footer
      </div>
    );
  }
}

export default App;
