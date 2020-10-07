import React from "react";
import InteractableText from "../../../../../../components/InteractableText";
import editIcon from "../../../../../../assets/edit.svg";
import styles from "./styles.css";

class EntryImageUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beingEdited: false,
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEditClick() {
    this.setState({ beingEdited: true });
  }

  handleChange(value) {
    this.props.handleChange(this.props.index, value);
  }

  render() {
    const { value, name, width, visible, editable } = this.props;
    let { display } = this.props;
    if (!visible) {
      display = "none";
    }
    const style = { display };

    return (
      <div style={style}>
        {editable ? (
          <div className={styles.editContainer}>
            <img
              src={editIcon}
              className={styles.editIcon}
              onClick={this.handleEditClick}
            />
            <InteractableText
              value={value}
              editable={this.state.beingEdited}
              handleChange={this.handleChange}
            />
          </div>
        ) : null}
        <img src={value} alt={name} style={{ width: width }} />
      </div>
    );
  }
}

export default EntryImageUrl;

EntryImageUrl.defaultProps = {
  editable: false,
  visible: true,
  handleChange: () => {},
  name: "Entry Text",
  value: "Entry text value",
  width: "200px",
  display: "block",
};
