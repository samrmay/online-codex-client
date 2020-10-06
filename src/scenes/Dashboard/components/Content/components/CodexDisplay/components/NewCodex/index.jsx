import React from "react";
import InteractableText from "../../../../../../../../components/InteractableText";
import styles from "./styles.css";

class NewCodex extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStructureChange = this.handleStructureChange.bind(this);
  }

  handleNameChange(value) {
    const newCodex = this.props.codex;
    newCodex.name = value;
    this.props.handleCodexEdit(newCodex);
  }

  handleStructureChange(event) {
    const { name } = event.target;
    const newCodex = this.props.codex;
    const newElement = {
      dataType: name,
      name: name,
    };
    newCodex.defaultEntryStructure.push(newElement);

    this.props.handleCodexEdit(newCodex);
  }

  render() {
    const { codex } = this.props;
    let content = null;

    if (codex.defaultEntryStructure.length > 0) {
      content = codex.defaultEntryStructure.map((item, index) => {});
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
              location="Header"
            >
              Add image header
            </button>

            <button
              onClick={this.handleStructureChange}
              name="String"
              location="Header"
            >
              Add text header
            </button>

            <button
              onClick={this.handleStructureChange}
              name="String"
              location="Body"
            >
              Add body text
            </button>
          </div>
        </div>

        <div className={styles.entry}>
          <div className={styles.entryHeader}>
            <div className={styles.entryName}>Entry Name</div>
          </div>

          <hr />
          <div className={styles.entryBody}>{content}</div>
        </div>
      </div>
    );
  }
}

export default NewCodex;
