import React from "react";
import styles from "./styles.css";

class SidebarToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.codex._id);
  }

  render() {
    const { codex, active } = this.props;
    const style = active ? styles.sidebarToggleOn : styles.sidebarToggleOff;

    return (
      <div className={style} onClick={this.handleClick}>
        {codex.name}
      </div>
    );
  }
}

export default SidebarToggle;
