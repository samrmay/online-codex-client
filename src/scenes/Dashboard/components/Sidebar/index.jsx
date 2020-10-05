import React from "react";
import SidebarToggle from "./components/SidebarToggle";
import styles from "./styles.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { initNewCodex } = this.props;

    const sidebarTabs = this.props.codices.map((codex, index) => {
      return (
        <SidebarToggle
          key={index}
          codex={codex}
          handleClick={this.props.toggleActiveCodex}
          active={this.props.activeCodices.includes(codex)}
        />
      );
    });

    return (
      <div className={styles.sidebar}>
        <div className={styles.newCodexButton} onClick={initNewCodex}>
          New codex
        </div>
        <div>{sidebarTabs}</div>
      </div>
    );
  }
}

export default Sidebar;
