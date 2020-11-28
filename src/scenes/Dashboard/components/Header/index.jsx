import React from "react";
import styles from "./styles.css";

function Header(props) {
  return (
    <div className={styles.header}>
      <h3>{props.name}</h3>
      <div><button onClick={props.deleteSession}>log out</button></div>
    </div>
  );
}

export default Header;
