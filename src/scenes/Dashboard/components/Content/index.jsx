import React from "react";
import TabMenu from "./components/TabMenu";
import CodexDisplay from "./components/CodexDisplay";
import styles from "./styles.css";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCodex: null,
      newEntry: false,
    };
    this.handleActiveCodexChange = this.handleActiveCodexChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleActiveCodexChange(codex) {
    this.setState({ activeCodex: codex });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { activeCodex, newEntry } = this.state;
    return (
      <div className={styles.content}>
        <TabMenu
          activeCodices={this.props.activeCodices}
          handleActiveCodexChange={this.handleActiveCodexChange}
          activeCodex={activeCodex}
        />
        <CodexDisplay
          activeCodex={activeCodex}
          handleChange={this.handleChange}
          newEntry={newEntry}
        />
      </div>
    );
  }
}

export default Content;
