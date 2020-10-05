import React from "react";
import CodexHeader from "./components/CodexHeader";
import CodexEntry from "./components/CodexEntry";
import NewEntry from "./components/NewEntry";
import NewCodex from "./components/NewCodex";
import styles from "./styles.css";

class CodexDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeCodex, newEntry, addEntry, handleCodexEdit } = this.props;
    if (!activeCodex) {
      return <div>Select a codex</div>;
    }

    if (activeCodex.newCodex) {
      return <NewCodex codex={activeCodex} handleCodexEdit={handleCodexEdit} />;
    }

    let content = "Add an entry to get started";
    if (activeCodex.entries.length > 0) {
      content = activeCodex.entries.map((entry, index) => {
        return <CodexEntry entry={entry} key={index} />;
      });
    }
    if (newEntry && Array.isArray(content)) {
      content.unshift(
        <NewEntry
          defaultStructure={activeCodex.defaultEntryStructure}
          addEntry={addEntry}
          key={-1}
        />
      );
    } else if (newEntry) {
      content = (
        <NewEntry
          defaultStructure={activeCodex.defaultEntryStructure}
          addEntry={addEntry}
          key={-1}
        />
      );
    }

    return (
      <div className={styles.codexDisplay}>
        <CodexHeader
          name={activeCodex.name}
          handleChange={this.props.handleChange}
        />
        <div>{content}</div>
      </div>
    );
  }
}

export default CodexDisplay;
