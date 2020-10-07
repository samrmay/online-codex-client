import React from "react";
import InteractableText from "../../../../../../../../components/InteractableText";
import EntryImageUrl from "../../../EntryImageUrl";
import EntryText from "../../../EntryText";
import styles from "./styles.css";

class NewCodex extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStructureChange = this.handleStructureChange.bind(this);
    this.handleElementChange = this.handleElementChange.bind(this);
  }

  handleNameChange(value) {
    const newCodex = this.props.codex;
    newCodex.name = value;
    this.props.editWorkingCodex(newCodex);
  }

  handleStructureChange(event) {
    const { name, value } = event.target;
    const newCodex = this.props.codex;
    const newElement = {
      dataType: name,
      displayType: value,
      name: `${value} ${name}`,
    };
    newCodex.defaultEntryStructure.push(newElement);

    this.props.editWorkingCodex(newCodex);
  }

  handleElementChange(index, value) {
    const newCodex = this.props.codex;
    newCodex.defaultEntryStructure[index].name = value;

    this.props.editWorkingCodex(newCodex);
  }

  render() {
    const { codex } = this.props;
    let content = null;

    if (codex.defaultEntryStructure.length > 0) {
      content = codex.defaultEntryStructure.map((item, index) => {
        if (item.dataType === "String") {
          return (
            <EntryText
              key={index}
              index={index}
              visible={true}
              value={item.name}
              name={item.name}
              editable={true}
              handleChange={this.handleElementChange}
            />
          );
        }

        if (item.dataType === "Image") {
          console.error("Cannot deal with images yet");
        }

        if (item.dataType === "ImageUrl") {
          return (
            <EntryImageUrl
              key={index}
              index={index}
              visible={true}
              value={item.name}
              width={"200px"}
              name={item.name}
              editable={true}
              handleChange={this.handleElementChange}
            />
          );
        }
      });
    }

    return (
      <div>
        <div className={styles.header}>
          <InteractableText
            Tag="p"
            value={codex.name}
            handleChange={this.handleNameChange}
          />

          <div className={styles.elementsMenu}>
            <button
              onClick={this.handleStructureChange}
              name="ImageUrl"
              value="Header"
            >
              Add image header
            </button>

            <button
              onClick={this.handleStructureChange}
              name="ImageUrl"
              value="Body"
            >
              Add body image
            </button>

            <button
              onClick={this.handleStructureChange}
              name="String"
              value="Header"
            >
              Add text header
            </button>

            <button
              onClick={this.handleStructureChange}
              name="String"
              value="Body"
            >
              Add body text
            </button>

            <button onClick={this.props.saveWorkingCodex}>
              Save new codex
            </button>
          </div>
        </div>

        <div className={styles.entry}>
          <div className={styles.entryHeader}>
            <div className={styles.entryName}>Default Entry </div>
          </div>

          <hr />
          <div className={styles.entryBody}>{content}</div>
        </div>
      </div>
    );
  }
}

export default NewCodex;
