import React from "react";
import styles from "./styles.css";

class EntryText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fontSize,
      fontFamily,
      fontWeight,
      Tag,
      visible,
      value,
    } = this.props;
    let { display } = this.props;
    if (!visible) {
      display = "none";
    }
    const style = { fontSize, fontFamily, fontWeight, display };

    return (
      <Tag className={styles.text} style={style}>
        {value}
      </Tag>
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
};
