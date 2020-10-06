import React from "react";
import EntryImageUrl from "../../../EntryImageUrl";
import EntryText from "../../../EntryText";
import DropdownButton from "../../../../../../../../components/DropdownButton";
import styles from "./styles.css";

class CodexEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMinimized: true,
      editable: false,
    };
    this.handleMinimizeToggle = this.handleMinimizeToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEntryElementEdit = this.handleEntryElementEdit.bind(this);
  }

  handleMinimizeToggle() {
    this.setState((prevState) => {
      const wasMinimized = prevState.isMinimized;
      if (!wasMinimized) {
        return { isMinimized: !wasMinimized, editable: false };
      }
      return { isMinimized: !wasMinimized };
    });
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  handleEntryElementEdit(index, value) {
    const newEntry = (this.props.entry.dataArr[index].data = value);
    this.props.handleEntryChange(newEntry);
  }

  render() {
    const { entry } = this.props;
    const { isMinimized, editable } = this.state;
    let content = null;

    if (entry.dataArr.length > 0) {
      content = entry.dataArr.map((item, index) => {
        let visible = item.displayType === "Header" ? true : !isMinimized;

        if (item.dataType === "String") {
          return (
            <EntryText
              key={index}
              index={index}
              visible={visible}
              value={item.data}
              name={item.name}
              editable={editable}
              handleChange={this.handleEntryElementEdit}
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
              index={index}
              visible={visible}
              value={item.data}
              width={width}
              name={item.name}
              editable={editable}
              handleChange={this.handleEntryElementEdit}
            />
          );
        }
      });
    }

    const dropdownOptions = [
      {
        name: "edit",
        callback: () => {
          this.handleChange("editable", true);
        },
      },
      {
        name: "delete",
        callback: () => {
          console.log("pretend deleted");
        },
      },
    ];

    return (
      <div>
        {!isMinimized ? (
          <div className={styles.dropdownContainer}>
            <DropdownButton options={dropdownOptions} />
          </div>
        ) : null}

        <div className={styles.entry}>
          <h3 className={styles.entryName} onClick={this.handleMinimizeToggle}>
            {entry.name}
          </h3>

          {content}
        </div>
      </div>
    );
  }
}

export default CodexEntry;
