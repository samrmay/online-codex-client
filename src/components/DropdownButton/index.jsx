import React from "react";
import threeDots from "../../assets/three-dots-icon.svg";
import styles from "./styles.css";

class DropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {
    this.setState((prevState) => {
      return { showDropdown: !prevState.showDropdown };
    });
  }

  handleOptionClick(callback) {
    callback();
    this.setState({ showDropdown: false });
  }

  handleBlur() {
    this.setState({ showDropdown: false });
  }

  render() {
    const { size, options } = this.props;
    const style = { width: size };

    const optionComponents = options.map((item, index) => {
      return (
        <div
          className={styles.option}
          onClick={() => {
            this.handleOptionClick(item.callback);
          }}
          key={index}
          value={index}
        >
          {item.name}
        </div>
      );
    });

    return (
      <span
        tabIndex={1}
        className={styles.container}
        onBlur={this.handleBlur}
        style={style}
      >
        <img src={threeDots} style={style} onClick={this.handleClick} />

        {this.state.showDropdown ? (
          <div className={styles.dropdown}>{optionComponents}</div>
        ) : null}
      </span>
    );
  }
}

export default DropdownButton;

DropdownButton.defaultProps = {
  clickable: true,
  options: [
    {
      name: "option 1",
      callback: () => {},
    },
    { name: "option 2", callback: () => {} },
  ],
  size: "25px",
};
