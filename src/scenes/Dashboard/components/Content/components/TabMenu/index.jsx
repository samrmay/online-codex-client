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
      changeWorkingCodex,
      workingCodex,
      newCodex,
      toggleActiveCodex,
    } = this.props;

    let tabArr = [];
    if (activeCodices.length > 0) {
      tabArr = activeCodices.map((codex, index) => {
        return (
          <Tab
            key={index}
            index={index}
            name={codex.name}
            codexId={codex._id}
            toggleActiveCodex={toggleActiveCodex}
            handleClick={changeWorkingCodex}
            isActive={workingCodex && workingCodex.name === codex.name}
            isNewCodex={codex.newCodex}
          />
        );
      });
    }

    return <div className={styles.tabMenu}>{tabArr}</div>;
  }
}

export default TabMenu;
