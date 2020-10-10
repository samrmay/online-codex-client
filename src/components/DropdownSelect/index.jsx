import React from 'react';
import DropdownOption from './components/DropdownOption';
import styles from './styles.css';

class DropdownSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      displayValue: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChoose = this.handleChoose.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.setState({ displayValue: this.props.displayValue });
  }

  handleClick() {
    this.setState((prevState) => {
      return { isExpanded: !prevState.isExpanded };
    });
  }

  handleBlur() {
    this.setState({ isExpanded: false });
  }

  handleChoose(label, value) {
    this.setState({ displayValue: label, isExpanded: false });
    this.props.handleChoose(value);
  }

  render() {
    const optionsArray = this.props.dropdownOptions.map((option, index) => {
      return (
        <DropdownOption
          label={option.label}
          value={option.value}
          handleChoose={this.handleChoose}
          key={index}
        />
      );
    });
    return (
      <div className={styles.dropdown} tabIndex={1} onBlur={this.handleBlur}>
        <div className={styles.headerValue} onClick={this.handleClick}>
          {this.state.displayValue}
        </div>

        {this.state.isExpanded ? (
          <div className={styles.optionsContainer}>{optionsArray}</div>
        ) : null}
      </div>
    );
  }
}

DropdownSelect.defaultProps = {
    dropdownOptions: [
      {label: 'option 1', value: 'option1'},
      {label: 'option 2', value: 'option2'}
    ],
    displayValue: 'dropdown',
    handleChoose: (value) => {console.log(value)}
}

export default DropdownSelect;