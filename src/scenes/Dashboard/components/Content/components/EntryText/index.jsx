import React from "react";
import InteractableText from "../../../../../../components/InteractableText";
import editIcon from "../../../../../../assets/edit.svg";
import styles from "./styles.css";

class EntryText extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.handleChange(this.props.index, value);
  }

  render() {
    const {
      fontSize,
      fontFamily,
      fontWeight,
      Tag,
      visible,
      value,
      editable,
    } = this.props;
    let { display } = this.props;
    if (!visible) {
      display = "none";
    }
    const style = { fontSize, fontFamily, fontWeight, display };

    return (
      <div style={style}>
        <div className={styles.textContainer}>
          {editable ? <img src={editIcon} className={styles.editIcon} /> : null}

          <InteractableText
            Tag={Tag}
            value={value}
            editable={editable}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EntryText;

EntryText.defaultProps = {
  editable: false,
  visible: true,
  handleChange: () => {},
  name: "Entry Text",
  value: "Entry text value",
  Tag: "div",
  display: "block",
  index: -1,
};
