import React from 'react';
import styles from './styles.css';

class DropdownOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleChoose(this.props.label, this.props.value);
  }

  render() {
    return (
      <div onClick={this.handleClick} className={styles.dropdownOption}>
        <p style={{ margin: '0px' }}>{this.props.label}</p>
      </div>
    );
  }
}

export default DropdownOption;