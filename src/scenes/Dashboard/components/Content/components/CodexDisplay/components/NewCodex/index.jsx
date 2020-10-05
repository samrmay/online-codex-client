import React from "react";
import InteractableText from "../../../../../../../../components/InteractableText";
import styles from "./styles.css";

class NewCodex extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(value) {
    const newCodex = this.props.codex;
    newCodex.name = value;
    this.props.handleCodexEdit(newCodex);
  }

  render() {
    const { codex } = this.props;
    console.log(codex);
    return (
      <div>
        <div className={styles.header}>
          <InteractableText
            Tag="p"
            value={codex.name}
            handleChange={this.handleNameChange}
          />
        </div>

        <div>
          What should a normal entry look like?
          <div className={styles.defaultEntry}>
            <div className={styles.entryName}>Entry Name</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCodex;
