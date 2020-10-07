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
        />

        <CodexDisplay
          workingCodex={workingCodex}
          addEntry={this.props.addEntry}
          handleCodexEdit={this.props.handleCodexEdit}
          editWorkingCodex={this.props.editWorkingCodex}
        />
      </div>
    );
  }
}

export default Content;
