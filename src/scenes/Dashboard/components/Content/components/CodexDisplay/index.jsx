import React from "react";
import CodexHeader from "./components/CodexHeader";
import CodexEntry from "./components/CodexEntry";
import NewEntry from "./components/NewEntry";
import NewCodex from "./components/NewCodex";
import DropdownButton from '../../../../../../components/DropdownButton'
import { stringPropertySort } from "../../../../../../helpers/sort";
import styles from "./styles.css";

class CodexDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEntriesArr: [],
      newEntryNum: 0,
      sortBy: 'name'
    };
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.addDelNewEntry = this.addDelNewEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.addEntry = this.addEntry.bind(this);
  }

  handleEntryChange(index, entry) {
    const { workingCodex } = this.props;
    workingCodex.entries[index] = entry;
    this.props.editWorkingCodex(workingCodex);
  }

  deleteEntry(index) {
    const { workingCodex } = this.props;
    workingCodex.entries.splice(index, 1);
    this.props.editWorkingCodex(workingCodex);
    this.props.saveWorkingCodex();
  }

  addDelNewEntry(event) {
    const { name, value } = event.target;
    let { newEntriesArr, newEntryNum } = this.state;

    if (value === "true") {
      newEntriesArr.push(newEntryNum);
      newEntryNum += 1;
    } else if (value === "false") {
      const i = newEntriesArr.indexOf(Number(name));
      newEntriesArr.splice(i, 1);
    }

    this.setState({ newEntriesArr, newEntryNum });
  }

  addEntry(entry, index) {
    this.setState((prevState) => {
      const { newEntriesArr } = prevState;
      newEntriesArr.splice(index, 1);
      return { newEntriesArr };
    });
    this.props.addEntry(entry);
  }

  render() {
    const { workingCodex } = this.props;
    const { newEntriesArr, sortBy } = this.state;

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
    const workingCodexEntries = workingCodex.entries;
    if (workingCodexEntries.length > 0) {
      console.log(sortBy)
      workingCodexEntries.sort(stringPropertySort(sortBy));
      content = workingCodex.entries.map((entry, index) => {
        return (
          <CodexEntry
            entry={entry}
            key={`entry${index}`}
            index={index}
            handleEntryChange={this.handleEntryChange}
            deleteEntry={this.deleteEntry}
            saveWorkingCodex={this.props.saveWorkingCodex}
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
            addEntry={this.addEntry}
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
