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
    this.initNewCodex = this.initNewCodex.bind(this);
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

  postNewCodex() {}

  initNewCodex() {
    const { userId } = this.props;
    const currentActive = this.state.activeCodices;
    currentActive.unshift({
      newCodex: true,
      name: "New Codex",
      owner: userId,
      isPrivate: true,
      defaultEntryStructure: [],
      entries: [],
    });

    this.setState({
      activeCodices: currentActive,
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
            initNewCodex={this.initNewCodex}
          />
          <Content activeCodices={activeCodices} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
