import React from "react";
import styles from "./styles.css";

class EntryImageUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beingEdited: false,
    };
  }

  render() {
    const { value, name, width, visible } = this.props;
    let { display } = this.props;
    if (!visible) {
      display = "none";
    }
    const style = { width, display };

    return <img src={value} alt={name} style={style} />;
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
