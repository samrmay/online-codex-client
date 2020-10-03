import React from "react";
import styles from "./styles.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const codexComponents = this.props.codices.map((codex, index) => {
      return <div key={index}>{codex.name}</div>;
    });
    return (
      <div className={styles.sidebar}>
        <div>{codexComponents}</div>
      </div>
    );
  }
}

export default Sidebar;
