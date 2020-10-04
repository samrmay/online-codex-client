import React from "react";
import styles from "./styles.css";

class InteractableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      textValue: "",
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const { defaultText } = this.props;
    this.setState({ textValue: defaultText });
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleBlur();
    }
  }

  render() {
    const { Tag, onChange, fontSize, fontWeight, fontFamily } = this.props;
    const { isFocused, textValue } = this.state;
    const style = { fontSize, fontWeight, fontFamily };

    return (
      <div
        className={styles.headerContainer}
        tabIndex={-1}
        onFocus={this.handleFocus}
      >
        {isFocused ? (
          <input
            className={styles.textInput}
            style={style}
            name="textValue"
            value={textValue}
            tabIndex={-1}
            autoFocus
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        ) : (
          <Tag style={style}>{textValue}</Tag>
        )}
      </div>
    );
  }
}

InteractableText.defaultProps = {
  defaultText: "Interactable Header",
  onChange: (text) => {
    console.log(text);
  },
  Tag: "span",
  fontSize: "16px",
  fontWeight: "500",
  fontFamily: "Sans-Serif",
};

export default InteractableText;
