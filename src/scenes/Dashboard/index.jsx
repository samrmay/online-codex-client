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
    if (this.props.userId) {
      this.getUserInfo();
    }
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

  toggleActiveCodex(codexId) {
    const currentActive = this.state.activeCodices;
    let includesCodex = false;
    let codexIndex = -1;
    for (let i = 0; i < currentActive.length; i++) {
      if (currentActive[i]._id === codexId) {
        includesCodex = true;
        codexIndex = i;
        break;
      }
    }

    if (!includesCodex) {
      fetch(process.env.SERVER_URL + `codices/${codexId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            currentActive.push(data);
            this.setState({ activeCodices: currentActive });
          });
        }
      });
    } else {
      currentActive.splice(codexIndex, 1);
      this.setState({ activeCodices: currentActive });
    }
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
