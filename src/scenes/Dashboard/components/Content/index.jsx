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
    this.addEntry = this.addEntry.bind(this);
  }

  componentDidUpdate() {
    const { activeCodex } = this.state;
    const { activeCodices } = this.props;
    if (activeCodex !== null && !activeCodices.includes(activeCodex)) {
      this.setState({ activeCodex: null });
    }
  }

  addEntry(entry) {
    const { activeCodex } = this.state;
    fetch(process.env.SERVER_URL + `codices/addEntries/${activeCodex._id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entryArr: [entry] }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          this.setState({ activeCodex: data, newEntry: false });
        });
      }
    });
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
          addEntry={this.addEntry}
          handleCodexEdit={this.props.handleCodexEdit}
        />
      </div>
    );
  }
}

export default Content;
