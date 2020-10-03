import React from "react";
import TabMenu from "./components/TabMenu";
import CodexDisplay from "./components/CodexDisplay";
import styles from "./styles.css";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCodex: null,
    };
    this.handleActiveCodexChange = this.handleActiveCodexChange.bind(this);
  }

  handleActiveCodexChange(codex) {
    this.setState({ activeCodex: codex });
  }

  render() {
    return (
      <div className={styles.content}>
        <TabMenu
          activeCodices={this.props.activeCodices}
          handleActiveCodexChange={this.handleActiveCodexChange}
          activeCodex={this.state.activeCodex}
        />
        <CodexDisplay activeCodex={this.state.activeCodex} />
      </div>
    );
  }
}

export default Content;
