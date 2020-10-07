import React from "react";
import styles from "./styles.css";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    const { handleClick, isActive, index } = this.props;
    handleClick(index);
  }

  handleClose() {
    const { toggleActiveCodex, codexId } = this.props;
    toggleActiveCodex(codexId);
  }

  render() {
    const { name, isActive, isNewCodex } = this.props;
    const className = isActive ? styles.tabActive : styles.tab;
    return (
      <div className={className} onClick={this.handleClick}>
        {isNewCodex ? "New codex: " : null}
        {name}
        <div
          className={styles.closeButton}
          onClick={(event) => {
            event.stopPropagation();
            this.handleClose();
          }}
        >
          x
        </div>
      </div>
    );
  }
}

export default Tab;
