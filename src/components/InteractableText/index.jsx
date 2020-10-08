import React from "react";
import { linkRegex } from "../../helpers/regex";
import styles from "./styles.css";

class InteractableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleFocus() {
    if (this.props.editable) {
      this.setState({ isFocused: true });
    }
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  handleChange(event) {
    if (Number.isInteger(this.props.index)) {
      this.props.handleChange(this.props.index, event.target.value);
    } else {
      this.props.handleChange(event.target.value);
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleBlur();
    }
  }

  render() {
    const {
      Tag,
      fontSize,
      fontWeight,
      fontFamily,
      autoDetectLinks,
      editable,
    } = this.props;
    const { isFocused } = this.state;
    const style = {
      fontSize,
      fontWeight,
      fontFamily,
      margin: "0px",
    };

    let { value } = this.props;
    if (autoDetectLinks && value.match(linkRegex) && !editable) {
      value = (
        <a href={value} target="_blank">
          {value}
        </a>
      );
    }

    return (
      <div
        className={styles.container}
        tabIndex={-1}
        onFocus={this.handleFocus}
      >
        {isFocused ? (
          <input
            className={styles.textInput}
            style={style}
            name="textValue"
            value={value}
            tabIndex={-1}
            autoFocus
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        ) : (
          <Tag style={style}>{value}</Tag>
        )}
      </div>
    );
  }
}

InteractableText.defaultProps = {
  handleChange: () => {},
  value: "Interactable Header",
  index: null,
  Tag: "span",
  fontSize: "16px",
  fontWeight: "500",
  fontFamily: "Sans-Serif",
  editable: true,
  autoDetectLinks: true,
};

export default InteractableText;
