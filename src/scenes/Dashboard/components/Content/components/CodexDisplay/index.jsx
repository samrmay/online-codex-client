import React from "react";
import CodexHeader from "./components/CodexHeader";
import CodexEntry from "./components/CodexEntry";
import NewEntry from "./components/NewEntry";

class CodexDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeCodex, newEntry } = this.props;
    if (!activeCodex) {
      return <div>Select a codex</div>;
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
          key={-1}
        />
      );
    }

    return (
      <div>
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
