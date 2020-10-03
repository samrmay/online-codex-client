import React from "react";
import { Redirect } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import styles from "./styles.css";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        email: "",
        name: "",
        codices: [],
      },
      activeCodices: [],
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.toggleActiveCodex = this.toggleActiveCodex.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch(process.env.SERVER_URL + `users/${this.props.userId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const { name, email, codices } = data;
          this.setState({ userInfo: { name, email, codices } });
        });
      }
    });
  }

  toggleActiveCodex(codex) {
    this.setState((prevState) => {
      const currentActive = prevState.activeCodices;
      if (currentActive.includes(codex)) {
        currentActive.splice(currentActive.indexOf(codex), 1);
        return { activeCodices: currentActive };
      }
      currentActive.push(codex);
      return { activeCodices: currentActive };
    });
  }

  render() {
    if (!this.props.userId) {
      return <Redirect to="/login" />;
    }

    const { name, codices } = this.state.userInfo;
    const { activeCodices } = this.state;

    return (
      <div className={styles.dashboard}>
        <Header name={name} />

        <div className={styles.sidebarContentContainer}>
          <Sidebar
            activeCodices={activeCodices}
            codices={codices}
            toggleActiveCodex={this.toggleActiveCodex}
          />
          <Content activeCodices={activeCodices} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
