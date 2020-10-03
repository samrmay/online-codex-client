import React from "react";
import { Redirect } from "react-router-dom";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        email: "",
        name: "",
        codices: [],
      },
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
    return <div>Dashboard</div>;
  }
}

export default Dashboard;
