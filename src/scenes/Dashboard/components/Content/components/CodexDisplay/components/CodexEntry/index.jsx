import React from "react";
import styles from "./styles.css";

class CodexEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMinimized: true,
    };
    this.handleMinimizeToggle = this.handleMinimizeToggle.bind(this);
  }

  handleMinimizeToggle() {
    this.setState((prevState) => {
      return { isMinimized: !prevState.isMinimized };
    });
  }

  render() {
    const { entry } = this.props;
    let content = null;
    if (entry.dataArr.length > 0) {
      content = entry.dataArr.map((item, index) => {
        if (item.dataType === "String") {
          return (
            <div key={index}>
              {item.name}: {item.data}
            </div>
          );
        }

        if (item.dataType === "Image") {
          console.error("Cannot deal with images yet");
        }
      });
    }

    return (
      <div className={styles.entry} onClick={this.handleMinimizeToggle}>
        <h3>{entry.name}</h3>
        {!this.state.isMinimized ? <div>{content}</div> : null}
      </div>
    );
  }
}

export default CodexEntry;
