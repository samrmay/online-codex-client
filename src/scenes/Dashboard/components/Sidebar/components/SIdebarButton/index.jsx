import React from "react";
import styles from "./styles.css";

class SidebarButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.active) {
      this.props.handleClick(this.props.codex._id);
    }
  }

  render() {
    const { codex, active } = this.props;
    const style = active ? { borderLeft: "2px solid red" } : null;

    return (
      <div
        className={styles.sidebarButton}
        style={style}
        onClick={this.handleClick}
      >
        {codex.name}
      </div>
    );
  }
}

export default SidebarButton;
