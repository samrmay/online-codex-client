import React from "react";
import { Redirect } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { stringPropertySort } from "../../helpers/sort";
import styles from "./styles.css";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        email: "",
        name: "",
        codices: [],
      },
      activeCodices: [],
      workingCodexIndex: -1,
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.toggleActiveCodex = this.toggleActiveCodex.bind(this);
    this.initNewCodex = this.initNewCodex.bind(this);
    this.changeWorkingCodex = this.changeWorkingCodex.bind(this);
    this.addEntryToWorkingCodex = this.addEntryToWorkingCodex.bind(this);
    this.editWorkingCodex = this.editWorkingCodex.bind(this);
    this.saveWorkingCodex = this.saveWorkingCodex.bind(this);
    this.deleteWorkingCodex = this.deleteWorkingCodex.bind(this);
  }

  componentDidMount() {
    if (this.props.userId) {
      this.getUserInfo();
    }
  }

  getUserInfo() {
    fetch(process.env.SERVER_URL + `users/${this.props.userId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const { name, email, codices } = data;
          codices.sort(stringPropertySort("name"));
          this.setState({ userInfo: { name, email, codices } });
        });
      }
    });
  }

  initNewCodex() {
    const { userId } = this.props;
    const currentActive = this.state.activeCodices;
    if (!currentActive.length > 0 || !currentActive[0].newCodex) {
      currentActive.unshift({
        newCodex: true,
        name: "New Codex",
        owner: userId,
        isPrivate: true,
        defaultEntryStructure: [],
        entries: [],
      });

      this.setState({
        activeCodices: currentActive,
      });
    }
  }

  toggleActiveCodex(codexId) {
    const currentActive = this.state.activeCodices;
    let includesCodex = false;
    let codexIndex = currentActive.length;
    for (let i = 0; i < currentActive.length; i++) {
      if (currentActive[i]._id === codexId) {
        includesCodex = true;
        codexIndex = i;
        break;
      }
    }

    if (!includesCodex) {
      fetch(process.env.SERVER_URL + `codices/${codexId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            currentActive.push(data);
            this.setState({
              activeCodices: currentActive,
              workingCodexIndex: codexIndex,
            });
          });
        }
      });
    } else {
      let { workingCodexIndex } = this.state;
      if (workingCodexIndex === currentActive.length - 1) {
        workingCodexIndex -= 1;
      }
      currentActive.splice(codexIndex, 1);
      this.setState({ activeCodices: currentActive, workingCodexIndex });
    }
  }

  changeWorkingCodex(index) {
    this.setState({ workingCodexIndex: index });
  }

  addEntryToWorkingCodex(entry) {
    const { activeCodices, workingCodexIndex } = this.state;
    const workingCodex = activeCodices[workingCodexIndex];
    fetch(process.env.SERVER_URL + `codices/addEntries/${workingCodex._id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entryArr: [entry] }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const newActiveCodices = activeCodices;
          newActiveCodices[workingCodexIndex] = data;

          this.setState({ activeCodices: newActiveCodices });
        });
      }
    });
  }

  editWorkingCodex(codex) {
    const { activeCodices, workingCodexIndex } = this.state;
    activeCodices[workingCodexIndex] = codex;
    this.setState({ activeCodices });
  }

  saveWorkingCodex() {
    const { activeCodices, workingCodexIndex, userInfo } = this.state;
    const codex = activeCodices[workingCodexIndex];

    if (codex.newCodex) {
      fetch(process.env.SERVER_URL + "codices", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(codex),
      }).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            activeCodices.splice(workingCodexIndex, 1, data);
            userInfo.codices.push({ _id: data._id, name: data.name });
            this.setState({ activeCodices, userInfo });
          });
        }
      });
    } else {
      fetch(process.env.SERVER_URL + `codices/${codex._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(codex),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            activeCodices.splice(workingCodexIndex, 1, data);
            this.setState({ activeCodices });
          });
        }
      });
    }
  }

  deleteWorkingCodex() {
    let { activeCodices, workingCodexIndex, userInfo } = this.state;
    const codex = activeCodices[workingCodexIndex];
    fetch(process.env.SERVER_URL + `codices/${codex._id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        activeCodices.splice(workingCodexIndex, 1);
        workingCodexIndex = 0;
        userInfo.codices = userInfo.codices.filter((item) => {
          return item._id !== codex._id;
        });

        this.setState({ activeCodices, workingCodexIndex, userInfo });
      }
    });
  }

  render() {
    if (!this.props.userId) {
      return <Redirect to="/login" />;
    }

    const { name, codices } = this.state.userInfo;
    const { activeCodices, workingCodexIndex } = this.state;

    return (
      <div className={styles.dashboard}>
        <Header name={name} deleteSession={this.props.deleteSession}/>

        <div className={styles.sidebarContentContainer}>
          <Sidebar
            activeCodices={activeCodices}
            codices={codices}
            toggleActiveCodex={this.toggleActiveCodex}
            initNewCodex={this.initNewCodex}
          />
          <Content
            activeCodices={activeCodices}
            workingCodex={activeCodices[workingCodexIndex]}
            changeWorkingCodex={this.changeWorkingCodex}
            addEntry={this.addEntryToWorkingCodex}
            editWorkingCodex={this.editWorkingCodex}
            saveWorkingCodex={this.saveWorkingCodex}
            deleteWorkingCodex={this.deleteWorkingCodex}
            toggleActiveCodex={this.toggleActiveCodex}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
