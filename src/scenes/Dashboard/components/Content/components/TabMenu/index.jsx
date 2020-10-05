import React from "react";
import Tab from "./components/Tab";
import styles from "./styles.css";

class TabMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      activeCodices,
      handleActiveCodexChange,
      activeCodex,
      newCodex,
    } = this.props;

    let tabArr = [];
    if (activeCodices.length > 0) {
      tabArr = activeCodices.map((codex, index) => {
        return (
          <Tab
            name={codex.name}
            codex={codex}
            handleClick={handleActiveCodexChange}
            isActive={activeCodex && activeCodex.name === codex.name}
            key={index}
          />
        );
      });
    }

    return <div className={styles.tabMenu}>{tabArr}</div>;
  }
}

export default TabMenu;
