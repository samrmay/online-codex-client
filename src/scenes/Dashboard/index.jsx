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

  render() {
    if (!this.props.userId) {
      return <Redirect to="/login" />;
    }
    return (
      <div className={styles.dashboard}>
        <Header name={this.state.userInfo.name} />
        <div className={styles.sidebarContentContainer}>
          <Sidebar codices={this.state.userInfo.codices} />
          <Content activeCodices={this.state.activeCodices} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
