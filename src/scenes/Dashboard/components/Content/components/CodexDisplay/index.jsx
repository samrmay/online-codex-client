import React from "react";
import CodexHeader from "./components/CodexHeader";
import CodexEntry from "./components/CodexEntry";

class CodexDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeCodex } = this.props;
    if (!activeCodex) {
      return <div>Select a codex</div>;
    }

    let content = "Add an entry to get started";
    if (activeCodex.entries.length > 0) {
      content = activeCodex.entries.map((entry, index) => {
        return <CodexEntry entry={entry} key={index} />;
      });
    }

    return (
      <div>
        <CodexHeader name={activeCodex.name} />
        <div>{content}</div>
      </div>
    );
  }
}

export default CodexDisplay;
