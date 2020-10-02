import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Home page</h2>
        <hr />
        <Link to="/login">Login</Link>
        <br />
        <br />
        <Link to="/dashboard">Dashboard</Link>
      </div>
    );
  }
}

export default Home;
