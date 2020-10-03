import React from "react";
import styles from "./styles.css";

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const activeArr = this.props.activeCodices.map((codex, index) => {
      return <div key={index}>{codex.name}</div>;
    });

    return <div className={styles.content}>{activeArr}</div>;
  }
}

export default Content;
