import React from "react";
import styles from "./styles.css";

function CodexHeader(props) {
  return (
    <div className={styles.header}>
      <span>{props.name}</span>
      <button>add entry</button>
    </div>
  );
}

export default CodexHeader;
