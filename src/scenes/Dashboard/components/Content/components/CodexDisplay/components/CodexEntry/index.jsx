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
    const { isMinimized } = this.state;
    const headerStyle = { display: isMinimized ? "inline" : "block" };
    const bodyStyle = { display: isMinimized ? "none" : "block" };
    let content = null;

    if (entry.dataArr.length > 0) {
      content = entry.dataArr.map((item, index) => {
        let style = item.location === "Header" ? headerStyle : bodyStyle;

        if (item.dataType === "String") {
          return (
            <div key={index} style={style}>
              {item.name}: {item.data}
            </div>
          );
        }

        if (item.dataType === "Image") {
          console.error("Cannot deal with images yet");
        }

        if (item.dataType === "ImageUrl") {
          style.width = isMinimized ? "100px" : "200px";
          return (
            <img key={index} src={item.data} alt={item.data} style={style} />
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
