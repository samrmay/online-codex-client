import React from "react";
import styles from "./styles.css";

function CodexHeader(props) {
  return (
    <div className={styles.header}>
      <span>search bar</span>
      <div>
        <button value={true} onClick={props.handleChange}>
          add entry
        </button>
        <button
          style={{ margin: "5px" }}
          onClick={() => {
            console.error("Cannot yet change schema");
          }}
        >
          Change schema
        </button>
        <button style={{ margin: "5px" }} onClick={props.deleteWorkingCodex}>
          Delete codex
        </button>
      </div>
    </div>
  );
}

export default CodexHeader;
