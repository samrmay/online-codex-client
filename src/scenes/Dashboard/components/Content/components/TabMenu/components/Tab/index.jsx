import React from "react";
import styles from "./styles.css";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleClick, codex, isActive } = this.props;
    handleClick(isActive ? null : codex);
  }

  render() {
    const { name, isActive } = this.props;
    const style = isActive ? styles.tabActive : styles.tab;
    return (
      <div className={style} onClick={this.handleClick}>
        {name}
      </div>
    );
  }
}

export default Tab;
