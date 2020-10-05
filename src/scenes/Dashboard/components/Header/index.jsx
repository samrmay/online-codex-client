import React from "react";
import styles from "./styles.css";

function Header(props) {
  return (
    <div className={styles.header}>
      <h3>{props.name}</h3>
    </div>
  );
}

export default Header;
