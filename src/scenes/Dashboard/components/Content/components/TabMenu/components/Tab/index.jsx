import React from "react";
import styles from "./styles.css";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleClick, isActive, index } = this.props;
    handleClick(isActive ? null : index);
  }

  render() {
    const { name, isActive, isNewCodex } = this.props;
    const style = isActive ? styles.tabActive : styles.tab;
    return (
      <div className={style} onClick={this.handleClick}>
        {isNewCodex ? "New codex: " : null}
        {name}
      </div>
    );
  }
}

export default Tab;
