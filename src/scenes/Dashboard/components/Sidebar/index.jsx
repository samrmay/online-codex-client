import React from "react";
import SidebarButton from "./components/SIdebarButton";
import styles from "./styles.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { initNewCodex, activeCodices } = this.props;

    const sidebarTabs = this.props.codices.map((codex, index) => {
      let active = false;
      for (let i = 0; i < activeCodices.length; i++) {
        if (codex._id === activeCodices[i]._id) {
          active = true;
        }
      }

      return (
        <SidebarButton
          key={index}
          codex={codex}
          handleClick={this.props.toggleActiveCodex}
          active={active}
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
