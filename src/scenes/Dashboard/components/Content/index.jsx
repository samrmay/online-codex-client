import React from "react";
import styles from "./styles.css";

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={styles.content}>Content</div>;
  }
}

export default Content;
