import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./scenes/Dashboard";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import styles from "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedUserId: null,
    };
    this.getSession = this.getSession.bind(this);
    this.postSession = this.postSession.bind(this);
    this.deleteSession = this.deleteSession.bind(this)
  }

  componentDidMount() {
    this.getSession();
  }

  getSession() {
    fetch(process.env.SERVER_URL + "sessions", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status == 200) {
        response
          .json()
          .then((data) => this.setState({ loggedUserId: data.id }));
      } else {
        this.setState({ loggedUserId: null });
      }
    });
  }

  postSession(email, password) {
    fetch(process.env.SERVER_URL + "sessions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          this.setState({ loggedUserId: data.id });
        });
      }
    });
  }

  deleteSession() {
    fetch(process.env.SERVER_URL + 'sessions', {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => {
      if (response.status === 200) {
        this.setState({loggedUserId: null})
      } else {
        console.error('could not log out', response)
      }
    })
  }

  render() {
    return (
      <div className={styles.rootContainer}>
        <Switch>
          <Route path="/login">
            <Login
              userId={this.state.loggedUserId}
              postSession={this.postSession}
            />
          </Route>

          <Route path="/dashboard">
            <Dashboard userId={this.state.loggedUserId} deleteSession={this.deleteSession}/>
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
