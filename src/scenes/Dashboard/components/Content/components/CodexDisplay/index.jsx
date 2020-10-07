import React from "react";
import CodexHeader from "./components/CodexHeader";
import CodexEntry from "./components/CodexEntry";
import NewEntry from "./components/NewEntry";
import NewCodex from "./components/NewCodex";
import styles from "./styles.css";

class CodexDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEntriesArr: [],
      newEntryNum: 0,
    };
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.addDelNewEntry = this.addDelNewEntry.bind(this);
  }

  handleEntryChange(index, entry) {
    const { workingCodex } = this.props;
    workingCodex[index] = entry;
    this.props.editWorkingCodex(workingCodex);
  }

  addDelNewEntry(event) {
    const { name, value } = event.target;
    let { newEntriesArr, newEntryNum } = this.state;
    console.log(name, value);

    if (value === "true") {
      newEntriesArr.push(newEntryNum);
      newEntryNum += 1;
    } else if (value === "false") {
      const i = newEntriesArr.indexOf(Number(name));
      console.log(i);
      newEntriesArr.splice(i, 1);
    }

    this.setState({ newEntriesArr, newEntryNum });
  }

  render() {
    const { workingCodex, addEntry } = this.props;
    const { newEntriesArr } = this.state;

    if (!workingCodex) {
      return <div>Select a codex</div>;
    }

    if (workingCodex.newCodex) {
      return (
        <NewCodex
          codex={workingCodex}
          editWorkingCodex={this.props.editWorkingCodex}
          saveWorkingCodex={this.props.saveWorkingCodex}
        />
      );
    }

    let content = "Add an entry to get started";
    if (workingCodex.entries.length > 0) {
      content = workingCodex.entries.map((entry, index) => {
        return (
          <CodexEntry
            entry={entry}
            key={`entry${index}`}
            index={index}
            handleEntryChange={this.handleEntryChange}
          />
        );
      });
    }

    let newEntries = [];
    if (newEntriesArr.length > 0) {
      newEntries = newEntriesArr.map((item) => {
        return (
          <NewEntry
            defaultStructure={workingCodex.defaultEntryStructure}
            addEntry={addEntry}
            handleChange={this.addDelNewEntry}
            key={`newEntry#${item}`}
            index={item}
          />
        );
      });
    }

    if (Array.isArray(content)) {
      content = newEntries.concat(content);
    } else {
      content = newEntries;
    }

    return (
      <div className={styles.codexDisplay}>
        <CodexHeader
          name={workingCodex.name}
          handleChange={this.addDelNewEntry}
          deleteWorkingCodex={this.props.deleteWorkingCodex}
        />
        <div className={styles.entries}>{content}</div>
      </div>
    );
  }
}

export default CodexDisplay;
