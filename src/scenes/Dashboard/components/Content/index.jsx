import React from "react";
import TabMenu from "./components/TabMenu";
import CodexDisplay from "./components/CodexDisplay";
import styles from "./styles.css";

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workingCodex } = this.props;
    return (
      <div className={styles.content}>
        <TabMenu
          activeCodices={this.props.activeCodices}
          changeWorkingCodex={this.props.changeWorkingCodex}
          workingCodex={workingCodex}
          toggleActiveCodex={this.props.toggleActiveCodex}
        />

        <CodexDisplay
          workingCodex={workingCodex}
          addEntry={this.props.addEntry}
          editWorkingCodex={this.props.editWorkingCodex}
          saveWorkingCodex={this.props.saveWorkingCodex}
          deleteWorkingCodex={this.props.deleteWorkingCodex}
        />
      </div>
    );
  }
}

export default Content;
