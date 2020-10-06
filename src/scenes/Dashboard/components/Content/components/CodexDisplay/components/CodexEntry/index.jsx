import React from "react";
import EntryImageUrl from "../../../EntryImageUrl";
import EntryText from "../../../EntryText";
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
    const { isMinimized } = this.state;
    let content = null;

    if (entry.dataArr.length > 0) {
      content = entry.dataArr.map((item, index) => {
        let visible = item.displayType === "Header" ? true : !isMinimized;

        if (item.dataType === "String") {
          return (
            <EntryText
              key={index}
              visible={visible}
              value={item.data}
              name={item.name}
            />
          );
        }

        if (item.dataType === "Image") {
          console.error("Cannot deal with images yet");
        }

        if (item.dataType === "ImageUrl") {
          let width = isMinimized ? "100px" : "200px";
          return (
            <EntryImageUrl
              key={index}
              visible={visible}
              value={item.data}
              width={width}
              name={item.name}
            />
          );
        }
      });
    }

    return (
      <div className={styles.entry} onClick={this.handleMinimizeToggle}>
        <h3 className={styles.entryName}>{entry.name}</h3>
        {content}
      </div>
    );
  }
}

export default CodexEntry;
