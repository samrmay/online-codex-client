import React from "react";

class CodexDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeCodex } = this.props;
    if (!activeCodex) {
      return <div>Select a codex</div>;
    }
    return <div>{activeCodex.name}</div>;
  }
}

export default CodexDisplay;
